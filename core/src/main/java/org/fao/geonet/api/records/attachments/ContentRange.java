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

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * A parsed {@code Content-Range: bytes start-end/total} request header.
 */
public final class ContentRange {
    private static final Pattern PATTERN = Pattern.compile("^bytes (\\d+)-(\\d+)/(\\d+)$");

    private final long start;
    private final long end;
    private final long total;

    private ContentRange(long start, long end, long total) {
        this.start = start;
        this.end = end;
        this.total = total;
    }

    public static ContentRange parse(String header) {
        Matcher m = header == null ? null : PATTERN.matcher(header);
        if (m == null || !m.matches()) {
            throw new IllegalArgumentException("Invalid Content-Range header: " + header);
        }
        try {
            long start = Long.parseLong(m.group(1));
            long end = Long.parseLong(m.group(2));
            long total = Long.parseLong(m.group(3));
            if (start > end || end >= total) {
                throw new IllegalArgumentException("Invalid Content-Range header: " + header);
            }
            return new ContentRange(start, end, total);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid Content-Range header: " + header, e);
        }
    }

    public long getStart() {
        return start;
    }

    public long getEnd() {
        return end;
    }

    public long getTotal() {
        return total;
    }

    public long length() {
        return end - start + 1;
    }

    public boolean isFirst() {
        return start == 0;
    }
}
