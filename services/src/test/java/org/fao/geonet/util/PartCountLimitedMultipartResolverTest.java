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

package org.fao.geonet.util;

import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.nio.charset.StandardCharsets;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class PartCountLimitedMultipartResolverTest {

    private static final String BOUNDARY = "gnTestBoundary";

    private static MockHttpServletRequest multipartRequest(int parts) {
        StringBuilder body = new StringBuilder();
        for (int i = 0; i < parts; i++) {
            body.append("--").append(BOUNDARY).append("\r\n")
                .append("Content-Disposition: form-data; name=\"field").append(i).append("\"\r\n\r\n")
                .append("v").append("\r\n");
        }
        body.append("--").append(BOUNDARY).append("--\r\n");
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/records");
        request.setContentType("multipart/form-data; boundary=" + BOUNDARY);
        request.setContent(body.toString().getBytes(StandardCharsets.UTF_8));
        return request;
    }

    private static PartCountLimitedMultipartResolver resolver(long maxPartCount) {
        PartCountLimitedMultipartResolver resolver = new PartCountLimitedMultipartResolver();
        resolver.setMaxPartCount(maxPartCount);
        return resolver;
    }

    @Test
    public void acceptsRequestsUpToTheLimit() {
        MultipartHttpServletRequest parsed = resolver(300).resolveMultipart(multipartRequest(300));
        assertEquals(300, parsed.getParameterMap().size());
    }

    @Test
    public void refusesRequestsAboveTheLimit() {
        try {
            resolver(300).resolveMultipart(multipartRequest(301));
            fail("Expected the request to be refused");
        } catch (MultipartException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("more than 300 parts"));
        }
    }

    @Test
    public void defaultLimitIs300() {
        try {
            new PartCountLimitedMultipartResolver().resolveMultipart(multipartRequest(301));
            fail("Expected the request to be refused");
        } catch (MultipartException e) {
            assertTrue(e.getMessage(), e.getMessage().contains("more than 300 parts"));
        }
    }
}
