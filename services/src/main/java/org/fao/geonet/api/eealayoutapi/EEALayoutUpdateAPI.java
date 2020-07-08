/*
 * Copyright (C) 2001-2016 Food and Agriculture Organization of the
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

package org.fao.geonet.api.eealayoutapi;

import javax.servlet.http.HttpServletResponse;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.fao.geonet.api.API;
import org.fao.geonet.utils.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RequestMapping(value = {"/{portal}/api",})
@Tag(
    name = "eealayoutupdate",
    description = "EEA Layout Update API")
@Controller("eealayoutupdate")
public class EEALayoutUpdateAPI {

    @io.swagger.v3.oas.annotations.Operation(
        summary = "Refresh EEA Template from API",
        description = "refreshtemplate")
    @RequestMapping(value = "/eealayoutupdate/refreshtemplate", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public void refreshTemplate(
        @Parameter(hidden = true) final HttpServletResponse response) {
        try {
            EEALayoutManager.forceContentReload();
        } catch (Exception e) {
            Log.error(API.LOG_MODULE_NAME, "Error in updating EEA layout from remote API", e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @io.swagger.v3.oas.annotations.Operation(
        summary = "Get EEA <head> content"
    )
    @RequestMapping(value = "/eealayoutupdate/head", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getHead(
        @Parameter(hidden = true) final HttpServletResponse response) {
        return EEALayoutManager.getHEAD();
    }

    @io.swagger.v3.oas.annotations.Operation(
        summary = "Get EEA embedded scripts"
    )
    @RequestMapping(value = "/eealayoutupdate/script", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public String getScript(
        @Parameter(hidden = true) final HttpServletResponse response) {

        return EEALayoutManager.getSCRIPTS();
    }

    @io.swagger.v3.oas.annotations.Operation(
        summary = "Get EEA footer html"
    )
    @RequestMapping(value = "/eealayoutupdate/footer", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getFooter(
        @Parameter(hidden = true) final HttpServletResponse response) {
        return EEALayoutManager.getFOOTER();
    }

    @io.swagger.v3.oas.annotations.Operation(
        summary = "Get EEA header html content"
    )
    @RequestMapping(value = "/eealayoutupdate/header", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getHeader(
        @Parameter(hidden = true) final HttpServletResponse response) {
        return EEALayoutManager.getHEADER();
    }
}
