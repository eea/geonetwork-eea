/*
 * =============================================================================
 * ===	Copyright (C) 2001-2026 Food and Agriculture Organization of the
 * ===	United Nations (FAO-UN), United Nations World Food Programme (WFP)
 * ===	and United Nations Environment Programme (UNEP)
 * ===
 * ===	This program is free software; you can redistribute it and/or modify
 * ===	it under the terms of the GNU General Public License as published by
 * ===	the Free Software Foundation; either version 2 of the License, or (at
 * ===	your option) any later version.
 * ===
 * ===	This program is distributed in the hope that it will be useful, but
 * ===	WITHOUT ANY WARRANTY; without even the implied warranty of
 * ===	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * ===	General Public License for more details.
 * ===
 * ===	You should have received a copy of the GNU General Public License
 * ===	along with this program; if not, write to the Free Software
 * ===	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 * ===
 * ===	Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
 * ===	Rome - Italy. email: geonetwork@osgeo.org
 * ==============================================================================
 */
package org.fao.geonet.api.records.attachments;

import jeeves.server.context.ServiceContext;
import org.apache.opendal.Entry;
import org.apache.opendal.ListOptions;
import org.apache.opendal.Metadata;
import org.apache.opendal.OpenDALException;
import org.apache.opendal.Operator;
import org.fao.geonet.api.exception.NotAllowedException;
import org.fao.geonet.api.exception.ResourceNotFoundException;
import org.fao.geonet.domain.MetadataResource;
import org.fao.geonet.domain.MetadataResourceContainer;
import org.fao.geonet.domain.MetadataResourceVisibility;
import org.fao.geonet.kernel.setting.SettingManager;
import org.fao.geonet.resources.OpenDALConfiguration;
import org.fao.geonet.constants.Geonet;
import org.fao.geonet.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.PathMatcher;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Visibility (public/private) is tracked in the database ({@code MetadataFileUploads.resourceaccess},
 * populated by {@link ResourceLoggerStore}), not by which OpenDAL key prefix a resource is stored
 * under - the {@code <visibility>/} prefix below is the legacy layout, kept only as a read/write
 * fallback for resources that predate this and haven't been touched since (every put or visibility
 * change migrates a resource to the flat key).
 */
public class OpenDALStore extends AbstractStore {

    @Autowired
    private OpenDALConfiguration openDALConfiguration;

    @Autowired
    private SettingManager settingManager;

    @Override
    public List<MetadataResource> getResources(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String filter, Boolean approved, boolean includeAdditionalIndexedProperties) throws Exception {
        final int metadataId = canEdit(context, metadataUuid, approved);
        final String metadataDirPrefix = getMetadataDir(metadataId) + "/";

        List<MetadataResource> resourceList = new ArrayList<>();
        if (filter == null) {
            filter = FilesystemStore.DEFAULT_FILTER;
        }
        PathMatcher matcher = FileSystems.getDefault().getPathMatcher("glob:" + filter);

        Operator op = openDALConfiguration.getOperator();
        try {
            // A single recursive listing under the whole metadata folder returns both legacy
            // (<visibility>/...) and flat entries together, at any subfolder depth; classify each
            // by which layout it's in rather than issuing a separate request per layout.
            List<Entry> entries = op.list(metadataDirPrefix, ListOptions.builder().recursive(true).build());
            Map<String, MetadataResourceVisibility> trackedAccess = loadTrackedAccessByFilename(metadataId);
            for (Entry entry : entries) {
                String entryPath = entry.getPath();
                if (entryPath.endsWith("/")) {
                    continue;
                }
                // Keep the whole path relative to the metadata folder (not just the last
                // segment), so a subfolder resource's "filename" preserves its nested path.
                String relativeKey = entryPath.startsWith(metadataDirPrefix)
                    ? entryPath.substring(metadataDirPrefix.length()) : getFilenameFromPath(entryPath);

                final MetadataResourceVisibility legacyVisibility = legacyVisibilityOf(relativeKey);
                final String filename;
                final MetadataResourceVisibility resourceVisibility;
                if (legacyVisibility != null) {
                    // Legacy layout: membership under the old <visibility>/ prefix is the visibility.
                    filename = relativeKey.substring(legacyVisibility.toString().length() + 1);
                    resourceVisibility = legacyVisibility;
                } else {
                    // Flat layout: only a tracked-access match counts, since the key alone no
                    // longer implies visibility.
                    filename = relativeKey;
                    resourceVisibility = trackedAccess.get(filename);
                }
                if (resourceVisibility != visibility) {
                    continue;
                }

                Path fileNamePath = Paths.get(filename).getFileName();
                if (matcher.matches(fileNamePath)) {
                    Metadata metadata = op.stat(entryPath);
                    resourceList.add(createResourceDescription(metadataUuid, visibility, filename, metadata.getContentLength(),
                            new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved));
                }
            }
        } catch (OpenDALException e) {
            // The metadata folder doesn't exist yet on this backend - nothing to list. (Whether
            // listing a missing prefix throws or returns empty varies by OpenDAL service.)
        }

        resourceList.sort(MetadataResourceVisibility.sortByFileName);
        return resourceList;
    }

    /**
     * Whether a metadata-folder-relative key falls under one of the legacy {@code public}/
     * {@code private} prefixes, and if so which. A nested-path resource whose own first segment
     * happens to be literally "public" or "private" is indistinguishable from this - a narrow,
     * pre-existing ambiguity of keeping both layouts side by side.
     */
    private static MetadataResourceVisibility legacyVisibilityOf(String relativeKey) {
        for (MetadataResourceVisibility v : MetadataResourceVisibility.values()) {
            if (relativeKey.startsWith(v.toString() + "/")) {
                return v;
            }
        }
        return null;
    }

    private String getFilenameFromPath(String path) {
        if (path.endsWith("/")) {
            path = path.substring(0, path.length() - 1);
        }
        int lastSlash = path.lastIndexOf('/');
        if (lastSlash != -1) {
            return path.substring(lastSlash + 1);
        }
        return path;
    }

    private MetadataResource createResourceDescription(final String metadataUuid,
                                                       final MetadataResourceVisibility visibility, final String resourceId, long size, Date lastModification, int metadataId, boolean approved) {
        return new FilesystemStoreResource(metadataUuid, metadataId, getFilename(metadataUuid, resourceId),
                settingManager.getNodeURL() + "api/records/", visibility, size, lastModification, approved);
    }

    @Override
    public ResourceHolder getResource(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String resourceId, Boolean approved) throws Exception {
        int metadataId = canDownload(context, metadataUuid, visibility, approved);
        String key = resolveExistingKey(metadataUuid, metadataId, visibility, getFilename(metadataUuid, resourceId), approved);
        if (key == null) {
            throw resourceNotFound(metadataUuid, resourceId);
        }
        Operator op = openDALConfiguration.getOperator();
        try {
            Metadata metadata = op.stat(key);
            byte[] data = op.read(key);
            return new OpenDALResourceHolder(data, createResourceDescription(metadataUuid, visibility, resourceId,
                    metadata.getContentLength(), new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved));
        } catch (OpenDALException e) {
            throw notFoundOr(e, metadataUuid, resourceId);
        }
    }

    @Override
    public MetadataResource getResourceMetadata(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String resourceId, Boolean approved) throws Exception {
        int metadataId = canDownload(context, metadataUuid, visibility, approved);
        String key = resolveExistingKey(metadataUuid, metadataId, visibility, getFilename(metadataUuid, resourceId), approved);
        if (key == null) {
            throw resourceNotFound(metadataUuid, resourceId);
        }
        Operator op = openDALConfiguration.getOperator();
        try {
            Metadata metadata = op.stat(key);
            return createResourceDescription(metadataUuid, visibility, resourceId,
                    metadata.getContentLength(), new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved);
        } catch (OpenDALException e) {
            throw notFoundOr(e, metadataUuid, resourceId);
        }
    }

    @Override
    public ResourceHolder getResourceWithRange(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String resourceId, Boolean approved, long start, long end) throws Exception {
        int metadataId = canDownload(context, metadataUuid, visibility, approved);
        String key = resolveExistingKey(metadataUuid, metadataId, visibility, getFilename(metadataUuid, resourceId), approved);
        if (key == null) {
            throw resourceNotFound(metadataUuid, resourceId);
        }
        Operator op = openDALConfiguration.getOperator();
        try {
            Metadata metadata = op.stat(key);
            // OpenDAL's Java binding takes (offset, length), not (start, end) - end here is
            // inclusive (matching this method's own contract), so the length is end - start + 1.
            byte[] rangeData = op.read(key, start, end - start + 1);
            return new OpenDALResourceHolder(rangeData, createResourceDescription(metadataUuid, visibility, resourceId,
                    metadata.getContentLength(), new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved));
        } catch (OpenDALException e) {
            throw notFoundOr(e, metadataUuid, resourceId);
        }
    }

    @Override
    public MetadataResource putResource(ServiceContext context, String metadataUuid, String filename, InputStream is, Date changeDate, MetadataResourceVisibility visibility, Boolean approved) throws Exception {
        int metadataId = canEdit(context, metadataUuid, visibility, approved);
        String key = getFlatKey(metadataUuid, metadataId, filename);

        Operator op = openDALConfiguration.getOperator();
        byte[] data = org.apache.commons.io.IOUtils.toByteArray(is);
        op.write(key, data);

        Metadata metadata = op.stat(key);
        return createResourceDescription(metadataUuid, visibility, filename,
                metadata.getContentLength(), new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved);
    }

    @Override
    public MetadataResource patchResourceStatus(ServiceContext context, String metadataUuid, String resourceId, MetadataResourceVisibility visibility, Boolean approved) throws Exception {
        int metadataId = canEdit(context, metadataUuid, approved);
        String filename = getFilename(metadataUuid, resourceId);
        String flatKey = getFlatKey(metadataUuid, metadataId, filename);

        Operator op = openDALConfiguration.getOperator();
        try {
            Metadata metadata = op.stat(flatKey);
            // Already flat: visibility is purely a database attribute there, updated by
            // ResourceLoggerStore regardless of what happens here - no OpenDAL move needed.
            return createResourceDescription(metadataUuid, visibility, resourceId, metadata.getContentLength(),
                    new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved);
        } catch (OpenDALException e) {
            if (e.getCode() != OpenDALException.Code.NotFound) {
                throw e;
            }
            // Not flat yet - look for it under a legacy visibility folder instead.
        }

        for (MetadataResourceVisibility sourceVisibility : visibilityCandidates(metadataUuid, approved, resourceId)) {
            String legacyKey = getLegacyKey(metadataUuid, metadataId, sourceVisibility, resourceId);
            Metadata metadata;
            try {
                metadata = op.stat(legacyKey);
            } catch (OpenDALException e) {
                if (e.getCode() == OpenDALException.Code.NotFound) {
                    continue;
                }
                throw e;
            }

            // Migrate to the flat layout as a side effect of this move, same as put.
            try {
                op.rename(legacyKey, flatKey);
            } catch (OpenDALException e) {
                if (e.getCode() == OpenDALException.Code.PermissionDenied) {
                    Log.warning(Geonet.RESOURCES, String.format(
                        "No permissions to modify metadata resource '%s' for metadata '%s'.", resourceId, metadataUuid));
                    throw new NotAllowedException(String.format(
                        "No permissions to modify metadata resource '%s' for metadata '%s'.", resourceId, metadataUuid));
                }
                throw e;
            }

            return createResourceDescription(metadataUuid, visibility, resourceId, metadata.getContentLength(),
                    new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved);
        }

        Log.warning(Geonet.RESOURCES,
                String.format("Could not update permissions. Metadata resource '%s' not found for metadata '%s'", resourceId, metadataUuid));
        throw resourceNotFound(metadataUuid, resourceId);
    }

    @Override
    public void migrateResourceToFlatLayout(ServiceContext context, MetadataResource resource) throws Exception {
        int metadataId = resource.getMetadataId();
        String metadataUuid = resource.getMetadataUuid();
        String filename = resource.getFilename();

        Operator op = openDALConfiguration.getOperator();
        String flatKey = getFlatKey(metadataUuid, metadataId, filename);
        if (statExists(op, flatKey)) {
            // A flat resource already occupies this name (eg. re-uploaded after the legacy copy
            // was orphaned, or the same filename also exists under the other legacy visibility
            // folder). Leave the legacy copy in place rather than overwrite or lose data.
            return;
        }

        String legacyKey = getLegacyKey(metadataUuid, metadataId, resource.getVisibility(), filename);
        if (!statExists(op, legacyKey)) {
            // Already flat, or this particular resource isn't a legacy one.
            return;
        }

        try {
            op.rename(legacyKey, flatKey);
        } catch (OpenDALException e) {
            Log.warning(Geonet.RESOURCES, String.format(
                "Unable to migrate legacy resource '%s' for metadata %d (%s) to the flat layout: %s",
                filename, metadataId, metadataUuid, e.getMessage()));
        }
    }

    @Override
    public void deleteLegacyVisibilityFolderIfEmpty(ServiceContext context, int metadataId, MetadataResourceVisibility visibility) throws Exception {
        String legacyFolderKey = getMetadataDir(metadataId) + "/" + visibility.toString() + "/";
        Operator op = openDALConfiguration.getOperator();

        List<Entry> children = op.list(legacyFolderKey);
        if (children.isEmpty()) {
            // No legacy folder for this visibility - nothing to do.
            return;
        }
        // A listing of an existing, empty directory still includes one entry for the directory
        // itself - filter that self-entry out before judging emptiness.
        boolean hasRealChildren = children.stream().anyMatch(entry -> !entry.getPath().equals(legacyFolderKey));
        if (hasRealChildren) {
            // Not empty - a resource wasn't migrated (eg. a same-named flat resource already
            // existed) or a nested subfolder is still there.
            return;
        }

        try {
            op.delete(legacyFolderKey);
        } catch (OpenDALException e) {
            Log.warning(Geonet.RESOURCES, String.format(
                "Unable to remove empty legacy folder '%s' for metadata %d: %s", legacyFolderKey, metadataId, e.getMessage()));
        }
    }

    @Override
    public String delResources(ServiceContext context, int metadataId) throws Exception {
        String path = getMetadataDir(metadataId) + "/";
        Operator op = openDALConfiguration.getOperator();
        try {
            deleteRecursive(op, path);
            Log.info(Geonet.RESOURCES, String.format("Metadata '%d' directory removed.", metadataId));
            return String.format("Metadata '%d' directory removed.", metadataId);
        } catch (OpenDALException e) {
            Log.warning(Geonet.RESOURCES,
                String.format("Unable to remove metadata '%d' directory '%s'. %s", metadataId, path, e.getMessage()));
            return String.format("Unable to remove metadata '%d' directory '%s'.", metadataId, path);
        }
    }

    private void deleteRecursive(Operator op, String path) {
        // list() always includes an entry for "path" itself alongside its real children -
        // skip it here, or recursing into it would call this method with the same path forever.
        List<Entry> entries = op.list(path);
        for (Entry entry : entries) {
            if (entry.getPath().equals(path)) {
                continue;
            }
            if (entry.getPath().endsWith("/")) {
                deleteRecursive(op, entry.getPath());
            } else {
                op.delete(entry.getPath());
            }
        }
        op.delete(path);
    }

    @Override
    public String delResource(ServiceContext context, String metadataUuid, String resourceId, Boolean approved) throws Exception {
        int metadataId = canEdit(context, metadataUuid, approved);
        for (MetadataResourceVisibility visibility : visibilityCandidates(metadataUuid, approved, resourceId)) {
            if (tryDelResource(metadataUuid, metadataId, visibility, resourceId, approved)) {
                return String.format("Metadata resource '%s' removed.", resourceId);
            }
        }
        return String.format("Unable to remove resource '%s'.", resourceId);
    }

    @Override
    public String delResource(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String resourceId, Boolean approved) throws Exception {
        int metadataId = canEdit(context, metadataUuid, approved);
        if (tryDelResource(metadataUuid, metadataId, visibility, resourceId, approved)) {
            return String.format("Metadata resource '%s' removed.", resourceId);
        }
        return String.format("Unable to remove resource '%s'.", resourceId);
    }

    private boolean tryDelResource(String metadataUuid, int metadataId, MetadataResourceVisibility visibility, String resourceId, Boolean approved) {
        String key = resolveExistingKey(metadataUuid, metadataId, visibility, getFilename(metadataUuid, resourceId), approved);
        if (key == null) {
            Log.info(Geonet.RESOURCES,
                String.format("Unable to remove resource '%s' for metadata %d (%s).", resourceId, metadataId, metadataUuid));
            return false;
        }
        try {
            openDALConfiguration.getOperator().delete(key);
            Log.info(Geonet.RESOURCES,
                String.format("Resource '%s' removed for metadata %d (%s).", resourceId, metadataId, metadataUuid));
            return true;
        } catch (OpenDALException e) {
            Log.info(Geonet.RESOURCES,
                String.format("Unable to remove resource '%s' for metadata %d (%s). %s", resourceId, metadataId, metadataUuid, e.getMessage()));
            return false;
        }
    }

    @Override
    public ResourceHolder getResourceInternal(String metadataUuid, MetadataResourceVisibility visibility, String resourceId, Boolean approved) throws Exception {
        return getResource(null, metadataUuid, visibility, resourceId, approved);
    }

    @Override
    public MetadataResource getResourceDescription(ServiceContext context, String metadataUuid, MetadataResourceVisibility visibility, String filename, Boolean approved) throws Exception {
        int metadataId = getAndCheckMetadataId(metadataUuid, approved);
        String key = resolveExistingKey(metadataUuid, metadataId, visibility, filename, approved);
        if (key == null) {
            return null;
        }
        Operator op = openDALConfiguration.getOperator();
        try {
            Metadata metadata = op.stat(key);
            return createResourceDescription(metadataUuid, visibility, filename,
                    metadata.getContentLength(), new Date(metadata.getLastModified().toEpochMilli()), metadataId, approved);
        } catch (OpenDALException e) {
            if (e.getCode() == OpenDALException.Code.NotFound) {
                return null;
            }
            throw e;
        }
    }

    @Override
    public MetadataResourceContainer getResourceContainerDescription(ServiceContext context, String metadataUuid, Boolean approved) throws Exception {
        return new FilesystemStoreResourceContainer(metadataUuid, getAndCheckMetadataId(metadataUuid, approved),
                "attachments", settingManager.getNodeURL() + "api/records/", approved);
    }

    /** The legacy, pre-flattening key: {@code <metadataDir>/<visibility>/<filename>}. */
    protected String getLegacyKey(String metadataUuid, int metadataId, MetadataResourceVisibility visibility, String resourceId) {
        checkResourceId(resourceId);
        return getMetadataDir(metadataId) + "/" + visibility.toString() + "/" + getFilename(metadataUuid, resourceId);
    }

    /** The flat, visibility-less key: {@code <metadataDir>/<filename>}. */
    protected String getFlatKey(String metadataUuid, int metadataId, String resourceId) {
        checkResourceId(resourceId);
        return getMetadataDir(metadataId) + "/" + getFilename(metadataUuid, resourceId);
    }

    /**
     * Resolve the key of an existing resource. Prefers the flat, visibility-less key and falls
     * back to the legacy {@code <visibility>/} folder for resources that predate it and haven't
     * been touched since.
     * <p>
     * Once flat, a resource's key no longer enforces which visibility it may be fetched as - that
     * was the folder split's job. So a flat match is only honoured if its <em>tracked</em> access
     * agrees with {@code visibility}; a mismatch (or an untracked flat resource, which shouldn't
     * happen since every write path logs a tracking row) is treated as not found at this
     * visibility, exactly as an actually-private resource can't be read today by asking for the
     * public one.
     *
     * @return the resolved key, or {@code null} if not found at all, or not at this visibility.
     */
    private String resolveExistingKey(String metadataUuid, int metadataId, MetadataResourceVisibility visibility, String filename, Boolean approved) {
        Operator op = openDALConfiguration.getOperator();
        String flatKey = getFlatKey(metadataUuid, metadataId, filename);
        if (statExists(op, flatKey)) {
            return visibility == resolveVisibility(metadataUuid, approved, filename) ? flatKey : null;
        }
        String legacyKey = getLegacyKey(metadataUuid, metadataId, visibility, filename);
        return statExists(op, legacyKey) ? legacyKey : null;
    }

    /** Whether a resource exists at the given key, distinguishing "not found" from a real error. */
    private boolean statExists(Operator op, String key) {
        try {
            op.stat(key);
            return true;
        } catch (OpenDALException e) {
            if (e.getCode() == OpenDALException.Code.NotFound) {
                return false;
            }
            throw e;
        }
    }

    private ResourceNotFoundException resourceNotFound(String metadataUuid, String resourceId) {
        return new ResourceNotFoundException(
            String.format("Metadata resource '%s' not found for metadata '%s'", resourceId, metadataUuid))
            .withMessageKey("exception.resourceNotFound.resource", new String[]{resourceId})
            .withDescriptionKey("exception.resourceNotFound.resource.description", new String[]{resourceId, metadataUuid});
    }

    /** Translates a NotFound OpenDALException into ResourceNotFoundException; rethrows anything else. */
    private Exception notFoundOr(OpenDALException e, String metadataUuid, String resourceId) {
        if (e.getCode() == OpenDALException.Code.NotFound) {
            return resourceNotFound(metadataUuid, resourceId);
        }
        return e;
    }

    protected String getMetadataDir(int metadataId) {
        return "metadata/" + metadataId;
    }

    public static class OpenDALResourceHolder implements ResourceHolder {
        private final byte[] data;
        private final MetadataResource metadata;

        public OpenDALResourceHolder(byte[] data, MetadataResource metadata) {
            this.data = data;
            this.metadata = metadata;
        }

        @Override
        public Resource getResource() {
            return new InputStreamResource(new ByteArrayInputStream(data));
        }

        @Override
        public MetadataResource getMetadata() {
            return metadata;
        }

        @Override
        public void close() throws IOException {
            // Nothing to do
        }
    }
}
