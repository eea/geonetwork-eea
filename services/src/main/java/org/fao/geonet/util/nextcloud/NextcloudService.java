/*
 * Copyright (C) 2001-2025 Food and Agriculture Organization of the
 * United Nations (FAO-UN), United Nations World Food Programme (WFP)
 * and United Nations Environment Programme (UNEP)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or (at
 * your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
 *
 * Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
 * Rome - Italy. email: geonetwork@osgeo.org
 */
package org.fao.geonet.util.nextcloud;

import java.util.function.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.fao.geonet.api.API;
import org.fao.geonet.api.exception.ResourceNotFoundException;
import org.fao.geonet.api.records.formatters.FormatterParams;
import org.fao.geonet.api.records.formatters.XsltFormatter;
import org.fao.geonet.domain.AbstractMetadata;
import org.fao.geonet.kernel.DataManager;
import org.fao.geonet.kernel.datamanager.IMetadataSchemaUtils;
import org.fao.geonet.kernel.schema.MetadataSchema;
import org.fao.geonet.utils.Log;
import org.fao.geonet.utils.Xml;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

@Service
public class NextcloudService {
    private static final String FILE_SUFFIX_PATTERN = "_metadata_%s.xml";
    private static final int EEA_RESOURCE_IDENTIFIER_PARTS = 10;
    private static final int EEA_RESOURCE_IDENTIFIER_ACCESS_INDEX = 6;

    private final NextcloudClient nextcloudClient;
    private final IMetadataSchemaUtils metadataSchemaUtils;

    public NextcloudService(final NextcloudClient nextcloudClient, IMetadataSchemaUtils metadataSchemaUtils) {
        this.nextcloudClient = nextcloudClient;
        this.metadataSchemaUtils = metadataSchemaUtils;
    }

    /**
     * Check if a share exists in Nextcloud for the specified resource identifier.
     *
     * @param folderType         the type of the folder.
     * @param resourceIdentifier the identifier of the resource.
     * @return a list of share URLs or an empty list if no shares exist.
     * @throws JDOMException if an error occurs while parsing the XML response.
     */
    public List<String> checkIfNextcloudShareExists(NextcloudClient.FOLDER_TYPE folderType, String resourceIdentifier) throws JDOMException {
        Element sharesResponse = nextcloudClient.getSharesResponse(resourceIdentifier, folderType);
        int responseCode = nextcloudClient.getResponseCode(sharesResponse);
        if (responseCode == HttpStatus.NOT_FOUND.value()) {
            return new ArrayList<>();
        }
        return nextcloudClient.listShares(sharesResponse, folderType);

    }

    public List<String> setupDatastore(AbstractMetadata metadata, String oldResourceIdentifier) throws ResourceNotFoundException, JDOMException, IOException {
        List<String> existingShares = new ArrayList<>(1);
        String uuid = metadata.getUuid();

        // Get direct download links
        Element metadataXml = metadata.getXmlData(false);

        final MetadataSchema schema = metadataSchemaUtils
            .getSchema(metadata.getDataInfo().getSchemaId());
        String linkUrl = schema.queryString("eea-datastorelink-get", metadataXml);

        if (StringUtils.isBlank(linkUrl)) {
            throw new IllegalArgumentException(String.format(
                "Record is missing the EEA datastore link https://sdi.eea.europa.eu/data/%s. Add it in order to initialize the corresponding Nextcloud directory.",
                metadata.getUuid()));
        }


        String resourceIdentifier = schema.queryString("eea-resourceid-get", metadataXml);

        // Create the folder only if the resource identifier match the pattern
        if (!isValidResourceIdentifier(resourceIdentifier)) {
            throw new IllegalArgumentException(
                "Record is missing a valid EEA resource identifier. Add it in order to initialize the corresponding Nextcloud directory. Check the convention https://taskman.eionet.europa.eu/projects/public-docs/wiki/Naming_conventions"
            );
        }

        NextcloudClient.FOLDER_TYPE folderType = getFolderType(resourceIdentifier);
        try {
            boolean directoryExists = nextcloudClient.checkIfDirectoryExists(resourceIdentifier, folderType);
            if (!directoryExists) {
                // Create the folder and add the metadata file XML
                Log.debug(API.LOG_MODULE_NAME, "Datastore: Folder does not exist for this resource identifier in Netcloud. Creating it.");
                nextcloudClient.createSymlink(metadata.getId() + "", resourceIdentifier, folderType);
            }

            if (StringUtils.isNotBlank(oldResourceIdentifier) && !oldResourceIdentifier.equals(resourceIdentifier)) {
                // Remove the old symbolic link
                Log.debug(API.LOG_MODULE_NAME, "Datastore: removing old symbolic link in Netcloud: " + oldResourceIdentifier);
                nextcloudClient.deleteFile(oldResourceIdentifier, getFolderType(oldResourceIdentifier));
            }


            // Remove and update the current metadata file
            nextcloudClient.deleteXmlDocument(resourceIdentifier, getFolderType(resourceIdentifier), uuid);
            String title = schema.queryString("eea-title-default-get", metadataXml);
            nextcloudClient.createFile(metadata.getData(), sanitizeAndTrimTitle(title, uuid),
                resourceIdentifier, folderType);

            // Add README.md file using formatter
            try {
                Element readme = Xml.transform(metadataXml, metadataSchemaUtils.getSchemaDir(metadata.getDataInfo().getSchemaId()).resolve("formatter").resolve("readme").resolve("view.xsl"));
                nextcloudClient.createFile(readme.getText(), "README.md",
                    resourceIdentifier, folderType);
            } catch (Exception e) {
                Log.error(API.LOG_MODULE_NAME, "Failed to transform metadata XML to README.md", e);
            }


            if (!directoryExists) {
                // Directory was just created. Don't check for existing shares, just create a new one
                Log.debug(API.LOG_MODULE_NAME, "Datastore: adding new share to the new folder.");
                existingShares.add(nextcloudClient.createShare(resourceIdentifier, folderType));
            } else {
                Log.debug(API.LOG_MODULE_NAME, "Datastore: Checking for existing shares.");
                // Directory already exists. Check if a share exists and create a new one if it doesn't
                existingShares = checkIfNextcloudShareExists(folderType, resourceIdentifier);
                Log.debug(API.LOG_MODULE_NAME, "Share exists: " + String.join(", ", existingShares));
                if (existingShares.isEmpty()) {
                    // Create a share
                    Log.debug(API.LOG_MODULE_NAME, "Datastore: No shares exist. Creating a new one.");
                    existingShares.add(nextcloudClient.createShare(resourceIdentifier, folderType));
                }
            }
        } catch (Exception e) {
            throw new NextcloudException("Failed communicate with Nextcloud", e);
        }
        // Proxy the request to the Nextcloud share
        return existingShares;
    }


    public ResponseEntity<String> checkAndProxyDatastore(AbstractMetadata metadata) throws ResourceNotFoundException, JDOMException, IOException {
        var existingShares = setupDatastore(metadata, null);
        // Proxy the request to the Nextcloud share
        return nextcloudClient.proxyRequest(existingShares.get(0));
    }

    /**
     * Check if the resource identifier is valid. <a href="https://taskman.eionet.europa.eu/projects/public-docs/wiki/Naming_conventions">Naming conventions</a>
     * And check file separator characters.
     */
    private boolean isValidResourceIdentifier(String resourceIdentifier) {
        if(StringUtils.isBlank(resourceIdentifier) || resourceIdentifier.contains("/") || resourceIdentifier.contains("..")) {
            return false;
        }

        // Provider_DataType_EpsgCode_ScaleResolution_ScaleResUnit_DatasetShortName_PublicOrInternal_TimeCoverage_VersionNumber_RevisionNumber
        // Provider_DataType_DatasetShortName_PublicOrInternal_TimeCoverage_VersionNumber_RevisionNumber
        String[] tokens = resourceIdentifier.split("_");
        String dataType = tokens[1];
        boolean isVectorOrRaster = "v".equals(dataType) || "r".equals(dataType);
        int length = isVectorOrRaster ? EEA_RESOURCE_IDENTIFIER_PARTS : EEA_RESOURCE_IDENTIFIER_PARTS - 3;
        int accessIndex = isVectorOrRaster ? EEA_RESOURCE_IDENTIFIER_ACCESS_INDEX : EEA_RESOURCE_IDENTIFIER_ACCESS_INDEX - 3;
        if (tokens.length != length) {
            return false;
        }
        return tokens[accessIndex].equals("p") || tokens[accessIndex].equals("i");
    }


    /**
     * Get the folder type based on the resource identifier.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @return the folder type.
     */
    private NextcloudClient.FOLDER_TYPE getFolderType(String resourceIdentifier) {
        NextcloudClient.FOLDER_TYPE folderType = NextcloudClient.FOLDER_TYPE.PUBLIC;

        if (StringUtils.contains(resourceIdentifier, "_i_")) {
            folderType = NextcloudClient.FOLDER_TYPE.INTERNAL;
        }
        return folderType;
    }

    private String sanitizeAndTrimTitle(String title, String uuid) {
        // Replace accented characters with non-accented characters
        String normalizedTitle = Normalizer.normalize(title, Normalizer.Form.NFD);
        String titleWithoutAccents = normalizedTitle.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");

        // Replace non-regular characters with underscore
        String sanitizedTitle = titleWithoutAccents
            .replaceAll("[^a-zA-Z0-9\\-]", "_")
            .replaceAll("_+", "_")
            .replace("..", "_");

        // Define the suffix
        String suffix = String.format(FILE_SUFFIX_PATTERN, uuid);

        // Ensure the total length does not exceed 120 characters
        int maxTitleLength = 120 - suffix.length();
        if (sanitizedTitle.length() > maxTitleLength) {
            sanitizedTitle = sanitizedTitle.substring(0, maxTitleLength);
        }

        // Combine the sanitized title with the suffix
        return sanitizedTitle + suffix;
    }
}
