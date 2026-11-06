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
import org.fao.geonet.constants.Geonet;
import org.fao.geonet.utils.Log;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.BiConsumer;
import java.util.function.LongSupplier;

/**
 * Keeps one open {@link OutputStream} per object key across HTTP requests, so a large
 * upload can be sent as many short chunk requests. Thread-safe, no Spring or OpenDAL dependency.
 *
 * <p>Locking: each {@link Session} is its own monitor and guards its fields and stream. Only
 * {@link #open} holds two monitors at once, always the new session first and then the older
 * session it replaces, so no cycle is possible. Map operations run inside a monitor, never the
 * other way round: the {@code compute} in {@link #open} takes no monitor. The opener and aborter
 * callbacks must not call back into this class.</p>
 */
public class ChunkedUploadSessions {
    /** Opaque handle of one upload, returned by {@link #write} once all its bytes are written. */
    public static final class Session {
        final int userId;
        final long total;
        long written;
        // volatile: abortIdle reads it without the monitor to skip sessions that are busy or recent.
        volatile long lastUsed;
        OutputStream out;

        Session(int userId, long total, long lastUsed) {
            this.userId = userId;
            this.total = total;
            this.lastUsed = lastUsed;
        }
    }

    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private final long idleTimeoutMillis;
    private final LongSupplier clock;
    private final BiConsumer<String, OutputStream> aborter;

    public ChunkedUploadSessions(long idleTimeoutMillis, LongSupplier clock,
                                 BiConsumer<String, OutputStream> aborter) {
        this.idleTimeoutMillis = idleTimeoutMillis;
        this.clock = clock;
        this.aborter = aborter;
    }

    public void abortIdle() {
        long now = clock.getAsLong();
        for (Iterator<Map.Entry<String, Session>> it = sessions.entrySet().iterator(); it.hasNext(); ) {
            Map.Entry<String, Session> e = it.next();
            Session s = e.getValue();
            // Check before locking: a session being written holds its monitor for the whole chunk,
            // and write sets lastUsed before copying, so it is never idle here. Without this every
            // chunk request would wait for every other upload's chunk in progress.
            if (now - s.lastUsed <= idleTimeoutMillis) {
                continue;
            }
            synchronized (s) {
                if (now - s.lastUsed > idleTimeoutMillis && sessions.remove(e.getKey(), s)) {
                    safeAbort(e.getKey(), s);
                }
            }
        }
    }

    /**
     * Aborts every open session, eg. when the store shuts down. Each session is aborted at most once.
     */
    public void abortAll() {
        for (Map.Entry<String, Session> e : sessions.entrySet()) {
            Session s = e.getValue();
            synchronized (s) {
                if (sessions.remove(e.getKey(), s)) {
                    safeAbort(e.getKey(), s);
                }
            }
        }
    }

    public void open(String key, int userId, long total, Callable<OutputStream> opener) throws Exception {
        Session session = new Session(userId, total, clock.getAsLong());
        Session[] stale = new Session[1];
        boolean[] rejected = new boolean[1];
        sessions.compute(key, (k, old) -> {
            if (old != null && old.userId != userId) {
                rejected[0] = true;
                return old;
            }
            stale[0] = old;
            return session;
        });
        if (rejected[0]) {
            throw new ResourceAlreadyExistException("Another upload is in progress for " + key);
        }
        synchronized (session) {
            try {
                if (stale[0] != null) {
                    synchronized (stale[0]) {
                        safeAbort(key, stale[0]);
                    }
                }
                session.out = opener.call();
            } catch (Exception e) {
                sessions.remove(key, session);
                throw e;
            }
            if (sessions.get(key) != session) {
                // replaced by a concurrent open while the opener was running
                safeAbort(key, session);
                throw new ResourceAlreadyExistException("Upload replaced by a newer one for " + key);
            }
        }
    }

    /**
     * Writes one chunk. Returns the session handle once the last byte is written, to pass to
     * {@link #complete}, {@link #drop} or {@link #abort}; returns null while more chunks are expected.
     */
    public Session write(String key, int userId, ContentRange range, long partSize, InputStream in)
        throws IOException {
        Session s = sessions.get(key);
        if (s == null) {
            throw new ChunkOffsetMismatchException(0);
        }
        synchronized (s) {
            if (sessions.get(key) != s || s.out == null) {
                throw new ChunkOffsetMismatchException(0);
            }
            if (s.userId != userId) {
                throw new IllegalArgumentException("Chunk does not belong to the upload in progress");
            }
            s.lastUsed = clock.getAsLong();
            if (s.total != range.getTotal()) {
                abort(key, s);
                throw new IllegalArgumentException("Chunk does not belong to the upload in progress");
            }
            if (range.getStart() != s.written) {
                throw new ChunkOffsetMismatchException(s.written);
            }
            if (partSize != range.length()) {
                abort(key, s);
                throw new IllegalArgumentException("Chunk size does not match the Content-Range header");
            }
            try {
                s.written += in.transferTo(s.out);
            } catch (IOException | RuntimeException e) {
                // OpenDAL streams throw the unchecked OpenDALException. The writer may hold part of the
                // chunk while written is unchanged, so a retry at the same offset would duplicate bytes.
                abort(key, s);
                throw e;
            }
            s.lastUsed = clock.getAsLong();
            return s.written == s.total ? s : null;
        }
    }

    /** Removes the session and aborts its stream, unless it was already replaced or removed. */
    public void abort(String key, Session s) {
        synchronized (s) {
            if (sessions.remove(key, s)) {
                safeAbort(key, s);
            }
        }
    }

    /** Aborts the session stream once; a failing aborter is logged, never propagated. */
    private void safeAbort(String key, Session s) {
        OutputStream out = s.out;
        s.out = null;
        if (out == null) {
            return;
        }
        try {
            aborter.accept(key, out);
        } catch (RuntimeException e) {
            Log.warning(Geonet.RESOURCES, "Could not abort chunked upload " + key + ": " + e);
        }
    }

    /**
     * Removes the session and hands its stream to the caller to close. Fails with an offset of 0 if
     * the session was aborted or replaced by a new upload since {@link #write} returned it.
     */
    public OutputStream complete(String key, Session s) {
        synchronized (s) {
            OutputStream out = s.out;
            if (out == null || !sessions.remove(key, s)) {
                throw new ChunkOffsetMismatchException(0);
            }
            s.out = null;
            return out;
        }
    }

    /** Removes the session without closing or aborting its stream. */
    public void drop(String key, Session s) {
        synchronized (s) {
            if (sessions.remove(key, s)) {
                s.out = null;
            }
        }
    }

    public boolean isReserved(String key) {
        return sessions.containsKey(key);
    }
}
