/*
 * Copyright (C) 2001-2025 Food and Agriculture Organization of the
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
package org.fao.geonet.util.nextcloud;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import org.fao.geonet.utils.Xml;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class NextcloudClient {

    private final RestTemplate restTemplate;

    private final NextcloudConfig config;

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String auth = Base64.getEncoder().encodeToString((config.getUsername() + ":" + config.getPassword()).getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + auth);
        headers.set("OCS-APIRequest", "true");
        headers.setAccept(MediaType.parseMediaTypes("application/xml"));
        return headers;
    }

    public NextcloudClient(NextcloudConfig config, RestTemplate restTemplate) {
        this.config = config;
        this.restTemplate = restTemplate;
    }

    public Element getSharesResponse(String resourceIdentifier, FOLDER_TYPE folderType) {
        String path = config.getDatastorePath() + folderType + "/" + resourceIdentifier;
        Map<String, ?> params = Map.of("path", path);

        String url = config.getUrl() + "/ocs/v2.php/apps/files_sharing/api/v1/shares?path={path}&reshares=true";
        HttpEntity<String> request = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class, params);
        String responseBody = response.getBody();
        try {
            return Xml.loadString(responseBody, false);
        } catch (IOException | JDOMException e) {
            throw new RuntimeException(e);
        }
    }

    public int getResponseCode(Element response) throws JDOMException {
        return Xml.selectNumber(response, "./meta/statuscode").intValue();
    }

    public List<String> listShares(Element response) {
        List<String> sharesList = new ArrayList<>();
        try {

            List<?> shares = Xml.selectNodes(response, "./data/element");
            for (Object share : shares) {
                if (share instanceof Element) {
                    Element shareElement = (Element) share;
                    String shareUrl = shareElement.getChildText("url");
                    sharesList.add(shareUrl);
                }
            }

        } catch (JDOMException e) {
            throw new RuntimeException(e);
        }
        return sharesList;
    }


    public enum FOLDER_TYPE {
        INTERNAL,
        PUBLIC,
        RESTRICTED;

        @Override
        public String toString() {
            return name().toLowerCase();
        }
    }
}
