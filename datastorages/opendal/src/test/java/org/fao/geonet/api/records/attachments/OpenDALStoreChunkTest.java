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

import jeeves.server.UserSession;
import jeeves.server.context.ServiceContext;
import org.apache.opendal.Operator;
import org.fao.geonet.api.exception.InputStreamLimitExceededException;
import org.fao.geonet.api.exception.NotAllowedException;
import org.fao.geonet.api.exception.ResourceAlreadyExistException;
import org.fao.geonet.domain.MetadataResource;
import org.fao.geonet.domain.MetadataResourceVisibility;
import org.fao.geonet.kernel.setting.SettingManager;
import org.fao.geonet.resources.OpenDALConfiguration;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

/**
 * Runs on the OpenDAL {@code fs} service. Without {@code atomic_write_dir}, {@code fs} exposes the
 * target file as soon as more than one write chunk (8 MiB) has been flushed, before close. With
 * {@code atomic_write_dir} it writes to a temporary file and renames it on close, so the object is
 * invisible until close, like an S3 multipart upload. These tests set it to get S3-like semantics.
 * They cannot prove the S3-specific parts: that closing the stream completes a multipart upload,
 * and that an unclosed (dropped) stream leaves an incomplete multipart upload behind.
 */
public class OpenDALStoreChunkTest {
    private static final String UUID = "uuid-1";
    private static final MetadataResourceVisibility PUBLIC = MetadataResourceVisibility.PUBLIC;

    @Rule
    public TemporaryFolder tmp = new TemporaryFolder();

    private OpenDALConfiguration config;
    private OpenDALStore store;
    private ServiceContext context;
    private Path root;

    @Before
    public void setUp() throws Exception {
        root = tmp.newFolder("root").toPath();
        Map<String, String> options = new HashMap<>();
        options.put("root", root.toString());
        options.put("atomic_write_dir", tmp.newFolder("atomic").getAbsolutePath());
        config = new OpenDALConfiguration();
        config.setScheme("fs");
        config.setOptions(options);
        config.init();

        store = new OpenDALStore() {
            @Override
            protected int canEdit(ServiceContext context, String metadataUuid, Boolean approved) {
                return 42;
            }

            @Override
            protected String getMetadataDir(int metadataId) {
                return "metadata/" + metadataId;
            }
        };
        SettingManager settingManager = mock(SettingManager.class);
        when(settingManager.getNodeURL()).thenReturn("http://localhost/geonetwork/");
        ReflectionTestUtils.setField(store, "openDALConfiguration", config);
        ReflectionTestUtils.setField(store, "settingManager", settingManager);
        ReflectionTestUtils.setField(store, "maxUploadSize", 100L);

        context = mock(ServiceContext.class);
        UserSession userSession = mock(UserSession.class);
        when(userSession.getUserIdAsInt()).thenReturn(7);
        when(context.getUserSession()).thenReturn(userSession);
    }

    @After
    public void tearDown() {
        config.destroy();
    }

    private Operator op() {
        return config.getOperator();
    }

    private MetadataResource chunk(String folder, String name, String range, String data) throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", name, "application/octet-stream",
            data.getBytes(StandardCharsets.UTF_8));
        return store.putResourceChunk(context, UUID, file, folder, PUBLIC, false, ContentRange.parse(range));
    }

    private String read(String key) {
        return new String(op().read(key), StandardCharsets.UTF_8);
    }

    private boolean exists(String key) {
        return Files.exists(root.resolve(key));
    }

    @Test
    public void chunkedUploadWritesObjectOnLastChunk() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        assertNull(chunk(null, "f.bin", "bytes 4-7/10", "efgh"));
        MetadataResource resource = chunk(null, "f.bin", "bytes 8-9/10", "ij");
        assertNotNull(resource);
        assertEquals(10, resource.getSize());
        assertEquals("abcdefghij", read("metadata/42/f.bin"));
    }

    @Test
    public void chunkedUploadIntoNestedFolder() throws Exception {
        assertNull(chunk("a/b", "données 1.zip", "bytes 0-1/3", "ab"));
        assertNotNull(chunk("a/b", "données 1.zip", "bytes 2-2/3", "c"));
        assertEquals("abc", read("metadata/42/a/b/données 1.zip"));
    }

    @Test
    public void firstChunkRefusesExistingObject() throws Exception {
        op().write("metadata/42/f.bin", "old".getBytes(StandardCharsets.UTF_8));
        try {
            chunk(null, "f.bin", "bytes 0-3/10", "abcd");
            fail("expected ResourceAlreadyExistException");
        } catch (ResourceAlreadyExistException expected) {
            // ok
        }
        assertEquals("old", read("metadata/42/f.bin"));
    }

    @Test(expected = InputStreamLimitExceededException.class)
    public void totalAboveMaxUploadSizeIsRejected() throws Exception {
        chunk(null, "f.bin", "bytes 0-9/101", "abcdefghij");
    }

    @Test(expected = NotAllowedException.class)
    public void semicolonInNameIsRejected() throws Exception {
        chunk(null, "a;b.bin", "bytes 0-3/10", "abcd");
    }

    @Test
    public void idleAbortDeletesPartialUpload() throws Exception {
        long[] now = {0};
        store.sessions = new ChunkedUploadSessions(1000, () -> now[0], store::abortUpload);
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        now[0] = 5000;
        assertNull(chunk(null, "g.bin", "bytes 0-3/10", "abcd"));
        assertFalse(exists("metadata/42/f.bin"));
        assertFalse(store.sessions.isReserved("metadata/42/f.bin"));
    }

    @Test
    public void lastChunkDoesNotOverwriteObjectThatAppeared() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/6", "abcd"));
        op().write("metadata/42/f.bin", "direct".getBytes(StandardCharsets.UTF_8));
        try {
            chunk(null, "f.bin", "bytes 4-5/6", "ef");
            fail("expected ResourceAlreadyExistException");
        } catch (ResourceAlreadyExistException expected) {
            // ok
        }
        assertEquals("direct", read("metadata/42/f.bin"));
        assertFalse(store.sessions.isReserved("metadata/42/f.bin"));
    }

    @Test(expected = ResourceAlreadyExistException.class)
    public void plainPutRefusesKeyWithOpenSession() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        store.putResource(context, UUID, "f.bin", new ByteArrayInputStream(new byte[]{1}), null, PUBLIC, false);
    }

    @Test
    public void plainPutRefusesExistingUnlessApproved() throws Exception {
        op().write("metadata/42/f.bin", "old".getBytes(StandardCharsets.UTF_8));
        try {
            store.putResource(context, UUID, "f.bin", new ByteArrayInputStream("new".getBytes(StandardCharsets.UTF_8)),
                null, PUBLIC, false);
            fail("expected ResourceAlreadyExistException");
        } catch (ResourceAlreadyExistException expected) {
            // ok
        }
        assertEquals("old", read("metadata/42/f.bin"));
        store.putResource(context, UUID, "f.bin", new ByteArrayInputStream("new".getBytes(StandardCharsets.UTF_8)),
            null, PUBLIC, true);
        assertEquals("new", read("metadata/42/f.bin"));
    }
}
