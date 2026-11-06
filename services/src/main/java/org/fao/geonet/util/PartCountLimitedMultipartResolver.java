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

import org.apache.commons.fileupload.FileCountLimitExceededException;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUpload;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;

/**
 * {@link CommonsMultipartResolver} that limits the number of parts (files and form fields) in a
 * multipart request. Commons FileUpload does not limit it by default and Spring 5 has no setting
 * for it, so without this a request is only bounded by its total size.
 */
public class PartCountLimitedMultipartResolver extends CommonsMultipartResolver {

    private long maxPartCount = 300;

    /**
     * @param maxPartCount the maximum number of parts in one request, {@code -1} for no limit.
     */
    public void setMaxPartCount(long maxPartCount) {
        this.maxPartCount = maxPartCount;
    }

    @Override
    protected FileUpload newFileUpload(FileItemFactory fileItemFactory) {
        FileUpload fileUpload = super.newFileUpload(fileItemFactory);
        fileUpload.setFileCountMax(maxPartCount);
        return fileUpload;
    }

    @Override
    protected MultipartParsingResult parseRequest(HttpServletRequest request) throws MultipartException {
        try {
            return super.parseRequest(request);
        } catch (MultipartException e) {
            if (e.getCause() instanceof FileCountLimitExceededException) {
                throw new MultipartException(String.format(
                    "The multipart request has more than %d parts.", maxPartCount), e);
            }
            throw e;
        }
    }
}
