//==============================================================================
//===	Copyright (C) 2001-2024 Food and Agriculture Organization of the
//===	United Nations (FAO-UN), United Nations World Food Programme (WFP)
//===	and United Nations Environment Programme (UNEP)
//===
//===	This program is free software; you can redistribute it and/or modify
//===	it under the terms of the GNU General Public License as published by
//===	the Free Software Foundation; either version 2 of the License, or (at
//===	your option) any later version.
//===
//===	This program is distributed in the hope that it will be useful, but
//===	WITHOUT ANY WARRANTY; without even the implied warranty of
//===	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
//===	General Public License for more details.
//===
//===	You should have received a copy of the GNU General Public License
//===	along with this program; if not, write to the Free Software
//===	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
//===
//===	Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
//===	Rome - Italy. email: geonetwork@osgeo.org
//==============================================================================

package org.fao.geonet.api.records.formatters;

import java.util.Arrays;
import java.util.stream.Collectors;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import net.lightbody.bmp.BrowserMobProxy;
import net.lightbody.bmp.BrowserMobProxyServer;
import static net.lightbody.bmp.proxy.CaptureType.getRequestCaptureTypes;
import org.fao.geonet.kernel.setting.SettingManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SeleniumHeaderModifier {

    @Autowired
    SettingManager settingManager;

    public BrowserMobProxy getProxyForUserSession(HttpServletRequest servletRequest) {
        BrowserMobProxyServer sessionProxyServer = new BrowserMobProxyServer();
        sessionProxyServer.start();
        sessionProxyServer.enableHarCaptureTypes(getRequestCaptureTypes());

        Cookie[] cookies = servletRequest.getCookies();
        if (cookies == null) {
            return sessionProxyServer;
        }

        String xsrftoken = Arrays.stream(cookies).filter(c -> c.getName().equals("XSRF-TOKEN")).map(c -> c.getValue()).collect(Collectors.toList()).get(0);
        String sessionId = Arrays.stream(cookies).filter(c -> c.getName().equals("JSESSIONID")).map(c -> c.getValue()).collect(Collectors.toList()).get(0);
        sessionProxyServer.addRequestFilter((request, contents, messageInfo) -> {
            if (request.getUri().startsWith(settingManager.getBaseURL())) {
                request.headers().remove("X-XSRF-TOKEN");
                request.headers().remove("Cookie");
                request.headers().add("X-XSRF-TOKEN", xsrftoken);
                request.headers().add("Cookie", String.format("XSRF-TOKEN=%s; JSESSIONID=%s", xsrftoken, sessionId));
            }
            return null;
        });

        return sessionProxyServer;
    }
}
