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

import org.fao.geonet.api.exception.ResourceAlreadyExistException;
import org.junit.Before;
import org.junit.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class ChunkedUploadSessionsTest {
    private final long[] now = {0};
    private final List<String> aborted = new ArrayList<>();
    private ChunkedUploadSessions sessions;

    @Before
    public void setUp() {
        sessions = new ChunkedUploadSessions(1000, () -> now[0], (k, o) -> aborted.add(k));
    }

    private static InputStream in(String s) {
        return new ByteArrayInputStream(s.getBytes(StandardCharsets.UTF_8));
    }

    private ChunkedUploadSessions.Session write(String key, int user, String range, String data)
        throws IOException {
        ContentRange r = ContentRange.parse(range);
        return sessions.write(key, user, r, data.length(), in(data));
    }

    private void open(String key, int user, long total) throws Exception {
        sessions.open(key, user, total, ByteArrayOutputStream::new);
    }

    @Test
    public void writesChunksInOrderAndCompletes() throws Exception {
        open("k", 1, 10);
        assertNull(write("k", 1, "bytes 0-4/10", "01234"));
        ChunkedUploadSessions.Session done = write("k", 1, "bytes 5-9/10", "56789");
        OutputStream out = sessions.complete("k", done);
        assertEquals("0123456789", out.toString());
        assertFalse(sessions.isReserved("k"));
    }

    @Test
    public void sessionReplacedAfterLastWriteCannotBeCompleted() throws Exception {
        open("k", 1, 10);
        ChunkedUploadSessions.Session old = write("k", 1, "bytes 0-9/10", "0123456789");
        open("k", 1, 10);
        assertNull(write("k", 1, "bytes 0-1/10", "ab"));
        try {
            sessions.complete("k", old);
            fail();
        } catch (ChunkOffsetMismatchException e) {
            assertEquals(0, e.getBytesWritten());
        }
        sessions.drop("k", old);
        sessions.abort("k", old);
        assertEquals(List.of("k"), aborted);
        assertTrue(sessions.isReserved("k"));
        ChunkedUploadSessions.Session current = write("k", 1, "bytes 2-9/10", "cdefghij");
        assertEquals("abcdefghij", sessions.complete("k", current).toString());
    }

    @Test
    public void otherUserCannotOpenReservedKey() throws Exception {
        open("k", 1, 10);
        try {
            open("k", 2, 10);
            fail();
        } catch (ResourceAlreadyExistException expected) {
            // expected
        }
        assertTrue(aborted.isEmpty());
    }

    @Test
    public void firstChunkBySameUserReplacesStaleSession() throws Exception {
        open("k", 1, 10);
        write("k", 1, "bytes 0-4/10", "01234");
        open("k", 1, 10);
        assertEquals(List.of("k"), aborted);
        assertNotNull(write("k", 1, "bytes 0-9/10", "0123456789"));
    }

    @Test
    public void chunkWithoutSessionIsOffsetMismatchAtZero() throws Exception {
        try {
            write("k", 1, "bytes 0-4/10", "01234");
            fail();
        } catch (ChunkOffsetMismatchException e) {
            assertEquals(0, e.getBytesWritten());
        }
    }

    @Test
    public void wrongStartKeepsSessionAndReportsOffset() throws Exception {
        open("k", 1, 10);
        write("k", 1, "bytes 0-4/10", "01234");
        try {
            write("k", 1, "bytes 6-9/10", "6789");
            fail();
        } catch (ChunkOffsetMismatchException e) {
            assertEquals(5, e.getBytesWritten());
        }
        assertTrue(aborted.isEmpty());
        assertNotNull(write("k", 1, "bytes 5-9/10", "56789"));
    }

    @Test
    public void changedTotalAbortsSession() throws Exception {
        open("k", 1, 10);
        try {
            write("k", 1, "bytes 0-4/20", "01234");
            fail();
        } catch (IllegalArgumentException expected) {
            // expected
        }
        assertEquals(List.of("k"), aborted);
        assertFalse(sessions.isReserved("k"));
    }

    @Test
    public void uncheckedWriteErrorAbortsSession() throws Exception {
        OutputStream failing = new OutputStream() {
            @Override
            public void write(int b) {
                throw new IllegalStateException("native write failed");
            }
        };
        sessions.open("k", 1, 10, () -> failing);
        try {
            write("k", 1, "bytes 0-4/10", "01234");
            fail();
        } catch (IllegalStateException expected) {
            // expected
        }
        assertEquals(List.of("k"), aborted);
        assertFalse(sessions.isReserved("k"));
        try {
            write("k", 1, "bytes 0-4/10", "01234");
            fail();
        } catch (ChunkOffsetMismatchException e) {
            assertEquals(0, e.getBytesWritten());
        }
    }

    @Test
    public void partSizeMismatchAbortsSession() throws Exception {
        open("k", 1, 10);
        try {
            sessions.write("k", 1, ContentRange.parse("bytes 0-4/10"), 6, in("012345"));
            fail();
        } catch (IllegalArgumentException expected) {
            // expected
        }
        assertEquals(List.of("k"), aborted);
    }

    @Test
    public void otherUserCannotWrite() throws Exception {
        open("k", 1, 10);
        try {
            write("k", 2, "bytes 0-4/10", "01234");
            fail();
        } catch (IllegalArgumentException expected) {
            // expected
        }
        assertTrue(aborted.isEmpty());
        assertNull(write("k", 1, "bytes 0-4/10", "01234"));
        assertNotNull(write("k", 1, "bytes 5-9/10", "56789"));
    }

    @Test
    public void concurrentOpenReplacingPendingOpenerDoesNotLeakStream() throws Exception {
        java.util.concurrent.CountDownLatch started = new java.util.concurrent.CountDownLatch(1);
        java.util.concurrent.CountDownLatch release = new java.util.concurrent.CountDownLatch(1);
        List<OutputStream> abortedStreams = new java.util.concurrent.CopyOnWriteArrayList<>();
        ChunkedUploadSessions s = new ChunkedUploadSessions(1000, () -> now[0],
            (k, o) -> abortedStreams.add(o));
        ByteArrayOutputStream first = new ByteArrayOutputStream();
        java.util.concurrent.ExecutorService ex = java.util.concurrent.Executors.newSingleThreadExecutor();
        try {
            java.util.concurrent.Future<?> f = ex.submit(() -> {
                s.open("k", 1, 10, () -> {
                    started.countDown();
                    release.await();
                    return first;
                });
                return null;
            });
            started.await();
            java.util.concurrent.Future<?> second = java.util.concurrent.CompletableFuture.runAsync(() -> {
                    try {
                        s.open("k", 1, 10, ByteArrayOutputStream::new);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
            Thread.sleep(100);
            release.countDown();
            try {
                f.get();
                fail();
            } catch (java.util.concurrent.ExecutionException e) {
                assertTrue(e.getCause() instanceof ResourceAlreadyExistException);
            }
            second.get();
            assertEquals(1, abortedStreams.size());
            assertSame(first, abortedStreams.get(0));
            assertTrue(s.isReserved("k"));
        } finally {
            ex.shutdownNow();
        }
    }

    @Test
    public void failingAborterDoesNotStopCleanupOrChangeWriteError() throws Exception {
        List<String> seen = new ArrayList<>();
        ChunkedUploadSessions s = new ChunkedUploadSessions(1000, () -> now[0], (k, o) -> {
            seen.add(k);
            throw new IllegalStateException("boom");
        });
        s.open("a", 1, 10, ByteArrayOutputStream::new);
        s.open("b", 1, 10, ByteArrayOutputStream::new);
        now[0] = 1001;
        s.abortIdle();
        assertEquals(2, seen.size());
        assertFalse(s.isReserved("a"));
        assertFalse(s.isReserved("b"));
        s.open("c", 1, 10, ByteArrayOutputStream::new);
        try {
            s.write("c", 1, ContentRange.parse("bytes 0-4/10"), 6, in("012345"));
            fail();
        } catch (IllegalArgumentException expected) {
            // expected
        }
    }

    @Test
    public void idleSessionsAreAborted() throws Exception {
        open("k", 1, 10);
        now[0] = 500;
        open("j", 1, 10);
        now[0] = 1001;
        sessions.abortIdle();
        assertEquals(List.of("k"), aborted);
        assertFalse(sessions.isReserved("k"));
        assertTrue(sessions.isReserved("j"));
    }

    @Test
    public void openerFailureReleasesReservation() {
        try {
            sessions.open("k", 1, 10, () -> {
                throw new IOException("boom");
            });
            fail();
        } catch (Exception e) {
            assertTrue(e instanceof IOException);
        }
        assertFalse(sessions.isReserved("k"));
    }

    @Test
    public void parallelSessionsOnDifferentKeysAreIndependent() throws Exception {
        open("a", 1, 4);
        open("b", 1, 4);
        write("a", 1, "bytes 0-1/4", "aa");
        write("b", 1, "bytes 0-1/4", "bb");
        ChunkedUploadSessions.Session a = write("a", 1, "bytes 2-3/4", "AA");
        ChunkedUploadSessions.Session b = write("b", 1, "bytes 2-3/4", "BB");
        assertEquals("aaAA", sessions.complete("a", a).toString());
        assertEquals("bbBB", sessions.complete("b", b).toString());
    }
}
