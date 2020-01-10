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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

@RequestMapping(value = { "/{portal}/api", "/{portal}/api/" + API.VERSION_0_1 })
@Api(value = "eealayoutupdate", tags = "eealayoutupdate", description = "EEA Layout Update API")
@Controller("eealayoutupdate")
public class EEALayoutUpdateAPI {

    @ApiOperation(value = "Refresh EEA Template from API", nickname = "refreshtemplate")
    @RequestMapping(value = "/eealayoutupdate/refreshtemplate", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public void refreshTemplate(@ApiIgnore
    final HttpServletResponse response) {
        try {
            EEALayoutManager.forceContentReload();
        } catch (Exception e) {
            Log.error(API.LOG_MODULE_NAME, "Error in updating EEA layout from remote API", e);
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        }
    }

    @ApiOperation(value = "Get EEA <head> content", nickname = "getHead")
    @RequestMapping(value = "/eealayoutupdate/head", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getHead(@ApiIgnore
    final HttpServletResponse response) {
        return EEALayoutManager.getHEAD();
    }

    @ApiOperation(value = "Get EEA embedded scripts", nickname = "getScript")
    @RequestMapping(value = "/eealayoutupdate/script", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @ResponseBody
    public String getScript(@ApiIgnore
    final HttpServletResponse response) {

        return EEALayoutManager.getSCRIPTS();
    }

    @ApiOperation(value = "Get EEA footer html", nickname = "getFooter")
    @RequestMapping(value = "/eealayoutupdate/footer", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getFooter(@ApiIgnore
    final HttpServletResponse response) {
        return EEALayoutManager.getFOOTER();
    }

    @ApiOperation(value = "Get EEA header html content", nickname = "getHeader")
    @RequestMapping(value = "/eealayoutupdate/header", produces = MediaType.APPLICATION_XHTML_XML_VALUE, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    @PreAuthorize("hasRole('Administrator')")
    @ResponseBody
    public String getHeader(@ApiIgnore
    final HttpServletResponse response) {
        return EEALayoutManager.getHEADER();
    }
}
