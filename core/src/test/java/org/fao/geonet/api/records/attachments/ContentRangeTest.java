/*
 * =============================================================================
 * ===	Copyright (C) 2001-2016 Food and Agriculture Organization of the
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

import org.fao.geonet.domain.MetadataResourceVisibility;
import org.junit.Test;
import org.mockito.Mockito;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class ContentRangeTest {
    @Test public void parsesValidRange() {
        ContentRange r = ContentRange.parse("bytes 16777216-33554431/53687091200");
        assertEquals(16777216L, r.getStart());
        assertEquals(33554431L, r.getEnd());
        assertEquals(53687091200L, r.getTotal());
        assertEquals(16777216L, r.length());
        assertFalse(r.isFirst());
        assertTrue(ContentRange.parse("bytes 0-9/10").isFirst());
    }
    @Test(expected = IllegalArgumentException.class) public void rejectsEndBeyondTotal() { ContentRange.parse("bytes 0-10/10"); }
    @Test(expected = IllegalArgumentException.class) public void rejectsStartAfterEnd() { ContentRange.parse("bytes 5-4/10"); }
    @Test(expected = IllegalArgumentException.class) public void rejectsEmptyTotal() { ContentRange.parse("bytes 0--1/0"); }
    @Test(expected = IllegalArgumentException.class) public void rejectsUnknownTotal() { ContentRange.parse("bytes 0-9/*"); }
    @Test(expected = IllegalArgumentException.class) public void rejectsGarbage() { ContentRange.parse("items 0-9/10"); }
    @Test public void rangeHeaderForResume() {
        assertEquals("bytes=0-16777215", new ChunkOffsetMismatchException(16777216L).toRangeHeader());
        assertNull(new ChunkOffsetMismatchException(0L).toRangeHeader());
    }
    @Test public void defaultStoreRejectsChunks() throws Exception {
        Store store = Mockito.mock(Store.class, Mockito.CALLS_REAL_METHODS);
        try {
            store.putResourceChunk(null, "uuid", null, null, MetadataResourceVisibility.PUBLIC, false, ContentRange.parse("bytes 0-9/10"));
            fail();
        } catch (IllegalArgumentException e) {
            assertEquals("Chunked uploads are not supported by this store", e.getMessage());
        }
    }
}
