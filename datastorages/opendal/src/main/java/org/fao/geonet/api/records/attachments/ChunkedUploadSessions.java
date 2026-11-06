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
 */
public class ChunkedUploadSessions {
    private static class Session {
        final int userId;
        final long total;
        long written;
        long lastUsed;
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
            synchronized (s) {
                if (now - s.lastUsed > idleTimeoutMillis && sessions.remove(e.getKey(), s)) {
                    aborter.accept(e.getKey(), s.out);
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
        try {
            if (stale[0] != null) {
                aborter.accept(key, stale[0].out);
            }
            synchronized (session) {
                session.out = opener.call();
            }
        } catch (Exception e) {
            sessions.remove(key, session);
            throw e;
        }
    }

    public boolean write(String key, int userId, ContentRange range, long partSize, InputStream in)
        throws IOException {
        Session s = sessions.get(key);
        if (s == null) {
            throw new ChunkOffsetMismatchException(0);
        }
        synchronized (s) {
            if (sessions.get(key) != s) {
                throw new ChunkOffsetMismatchException(0);
            }
            s.lastUsed = clock.getAsLong();
            if (s.userId != userId || s.total != range.getTotal()) {
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
            } catch (IOException e) {
                abort(key, s);
                throw e;
            }
            s.lastUsed = clock.getAsLong();
            return s.written == s.total;
        }
    }

    private void abort(String key, Session s) {
        if (sessions.remove(key, s)) {
            aborter.accept(key, s.out);
        }
    }

    public OutputStream complete(String key) {
        Session s = sessions.remove(key);
        return s == null ? null : s.out;
    }

    public void drop(String key) {
        sessions.remove(key);
    }

    public boolean isReserved(String key) {
        return sessions.containsKey(key);
    }
}
