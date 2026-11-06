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
import org.fao.geonet.ApplicationContextHolder;
import org.fao.geonet.api.exception.InputStreamLimitExceededException;
import org.fao.geonet.api.exception.NotAllowedException;
import org.fao.geonet.api.exception.ResourceAlreadyExistException;
import org.fao.geonet.domain.Metadata;
import org.fao.geonet.domain.MetadataResource;
import org.fao.geonet.domain.MetadataResourceVisibility;
import org.fao.geonet.kernel.GeonetworkDataDirectory;
import org.fao.geonet.kernel.datamanager.IMetadataUtils;
import org.fao.geonet.kernel.setting.SettingManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;
import org.springframework.context.support.StaticApplicationContext;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FilesystemStoreChunkTest {
    private static final String UUID = "uuid-1";
    private static final MetadataResourceVisibility PUBLIC = MetadataResourceVisibility.PUBLIC;

    @Rule
    public TemporaryFolder tmp = new TemporaryFolder();

    private FilesystemStore store;
    private ServiceContext context;
    private Path dataDir;
    private Path metadataDir;
    private Path tempDir;

    @Before
    public void setUp() throws Exception {
        dataDir = tmp.newFolder("metadata_data").toPath();
        metadataDir = dataDir.resolve("00000-00099").resolve("42");
        tempDir = dataDir.resolve(".chunked-uploads");

        GeonetworkDataDirectory dataDirectory = mock(GeonetworkDataDirectory.class);
        when(dataDirectory.getMetadataDataDir()).thenReturn(dataDir);
        // getResourceDescription resolves the metadata id and the legacy folder through the
        // application context, not the service context.
        IMetadataUtils metadataUtils = mock(IMetadataUtils.class);
        when(metadataUtils.findOneByUuid(UUID)).thenReturn((Metadata) new Metadata().setId(42));
        StaticApplicationContext appContext = new StaticApplicationContext();
        appContext.getBeanFactory().registerSingleton("dataDirectory", dataDirectory);
        appContext.getBeanFactory().registerSingleton("metadataUtils", metadataUtils);
        ApplicationContextHolder.set(appContext);

        store = new FilesystemStore() {
            @Override
            protected int canEdit(ServiceContext context, String metadataUuid, Boolean approved) {
                return 42;
            }
        };
        SettingManager settingManager = mock(SettingManager.class);
        when(settingManager.getNodeURL()).thenReturn("http://localhost/geonetwork/");
        ReflectionTestUtils.setField(store, "settingManager", settingManager);
        ReflectionTestUtils.setField(store, "maxUploadSize", 100L);

        context = mock(ServiceContext.class);
        when(context.getBean(GeonetworkDataDirectory.class)).thenReturn(dataDirectory);
        UserSession userSession = mock(UserSession.class);
        when(userSession.getUserIdAsInt()).thenReturn(7);
        when(context.getUserSession()).thenReturn(userSession);
    }

    @After
    public void tearDown() {
        ApplicationContextHolder.clear();
    }

    private MetadataResource chunk(String folder, String name, String range, String data) throws Exception {
        MockMultipartFile file = new MockMultipartFile("file", name, "application/octet-stream",
            data.getBytes(StandardCharsets.UTF_8));
        return store.putResourceChunk(context, UUID, file, folder, PUBLIC, false, ContentRange.parse(range));
    }

    private String read(String filename) throws Exception {
        return new String(Files.readAllBytes(metadataDir.resolve(filename)), StandardCharsets.UTF_8);
    }

    private void write(String filename, String data) throws Exception {
        Path path = metadataDir.resolve(filename);
        Files.createDirectories(path.getParent());
        Files.write(path, data.getBytes(StandardCharsets.UTF_8));
    }

    private static List<Path> files(Path dir) throws Exception {
        if (!Files.exists(dir)) {
            return List.of();
        }
        try (Stream<Path> paths = Files.walk(dir)) {
            return paths.filter(Files::isRegularFile).collect(Collectors.toList());
        }
    }

    @Test
    public void chunkedUploadWritesFileOnLastChunk() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        assertNull(chunk(null, "f.bin", "bytes 4-7/10", "efgh"));
        MetadataResource resource = chunk(null, "f.bin", "bytes 8-9/10", "ij");
        assertNotNull(resource);
        assertEquals(10, resource.getSize());
        assertEquals("f.bin", resource.getFilename());
        assertEquals("abcdefghij", read("f.bin"));
        assertEquals(List.of(), files(tempDir));
    }

    @Test
    public void chunkedUploadIntoNestedFolder() throws Exception {
        assertNull(chunk("a/b", "données 1.zip", "bytes 0-1/3", "ab"));
        assertNotNull(chunk("a/b", "données 1.zip", "bytes 2-2/3", "c"));
        assertEquals("abc", read("a/b/données 1.zip"));
    }

    @Test
    public void partFileIsNotListedDuringUpload() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        assertEquals(List.of(), files(metadataDir));
        assertEquals(1, files(tempDir).size());
    }

    @Test
    public void firstChunkRefusesExistingFile() throws Exception {
        write("f.bin", "old");
        try {
            chunk(null, "f.bin", "bytes 0-3/10", "abcd");
            fail("expected ResourceAlreadyExistException");
        } catch (ResourceAlreadyExistException expected) {
            // ok
        }
        assertEquals("old", read("f.bin"));
        assertEquals(List.of(), files(tempDir));
    }

    @Test
    public void lastChunkDoesNotOverwriteFileThatAppeared() throws Exception {
        assertNull(chunk(null, "f.bin", "bytes 0-3/6", "abcd"));
        write("f.bin", "direct");
        try {
            chunk(null, "f.bin", "bytes 4-5/6", "ef");
            fail("expected ResourceAlreadyExistException");
        } catch (ResourceAlreadyExistException expected) {
            // ok
        }
        assertEquals("direct", read("f.bin"));
        assertEquals(List.of(), files(tempDir));
    }

    @Test
    public void idleAbortDeletesPartFile() throws Exception {
        long[] now = {0};
        store.sessions = new ChunkedUploadSessions(1000, () -> now[0], store::abortUpload);
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        assertEquals(1, files(tempDir).size());
        now[0] = 5000;
        try {
            chunk(null, "f.bin", "bytes 4-7/10", "efgh");
            fail("expected ChunkOffsetMismatchException");
        } catch (ChunkOffsetMismatchException e) {
            assertEquals(0, e.getBytesWritten());
        }
        assertEquals(List.of(), files(tempDir));
        assertFalse(Files.exists(metadataDir.resolve("f.bin")));
    }

    @Test
    public void staleLeftoverPartFilesAreCleaned() throws Exception {
        Files.createDirectories(tempDir);
        Path stale = Files.write(tempDir.resolve("stale.part"), new byte[]{1});
        Files.setLastModifiedTime(stale, FileTime.fromMillis(System.currentTimeMillis() - 31 * 60 * 1000L));
        Path fresh = Files.write(tempDir.resolve("fresh.part"), new byte[]{1});
        assertNull(chunk(null, "f.bin", "bytes 0-3/10", "abcd"));
        assertFalse(Files.exists(stale));
        assertTrue(Files.exists(fresh));
    }

    @Test(expected = InputStreamLimitExceededException.class)
    public void totalAboveMaxUploadSizeIsRejected() throws Exception {
        chunk(null, "f.bin", "bytes 0-9/101", "abcdefghij");
    }

    @Test(expected = NotAllowedException.class)
    public void semicolonInNameIsRejected() throws Exception {
        chunk(null, "a;b.bin", "bytes 0-3/10", "abcd");
    }
}
