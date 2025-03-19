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

import com.github.sardine.Sardine;
import com.github.sardine.SardineFactory;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class NextcloudClient {

    private final RestTemplate restTemplate;
    private final NextcloudConfig config;

    public NextcloudClient(NextcloudConfig config, RestTemplate restTemplate) {
        this.config = config;
        this.restTemplate = restTemplate;

    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String auth = Base64.getEncoder().encodeToString((config.getUsername() + ":" + config.getPassword()).getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + auth);
        headers.set("OCS-APIRequest", "true");
        headers.setAccept(MediaType.parseMediaTypes("application/xml"));
        return headers;
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

    /**
     * Get the share URL from the share response.
     *
     * @param shareResponse the share response.
     * @return the share URL.
     */
    public String getShareUrl(Element shareResponse) {
        try {
            return Xml.selectString(shareResponse, "./data/url");
        } catch (JDOMException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Create a folder in Nextcloud using the WebDAV API, the folder will be created in the specified folder type.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @throws IOException if an error occurs while creating the folder.
     */
    public void createFolder(String resourceIdentifier, FOLDER_TYPE folderType) throws IOException {
        String path = config.getDatastorePath() + folderType + "/" + resourceIdentifier;
        String url = config.getUrl() + "/remote.php/dav/files/" + config.getUsername() + "/" + path;
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        sardine.createDirectory(url);
    }

    /**
     * Create a file in Nextcloud using the WebDAV API, the file will be created in the specified folder type.
     *
     * @param data               the content of the file.
     * @param fileName           the name of the file.
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @throws IOException if an error occurs while creating the file.
     */
    public void createFile(String data, String fileName, String resourceIdentifier, FOLDER_TYPE folderType) throws IOException {
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        String path = config.getDatastorePath() + folderType + "/" + resourceIdentifier;
        String url = config.getUrl() + "/remote.php/dav/files/" + config.getUsername() + "/" + path + "/" + fileName;
        sardine.put(url, data.getBytes(StandardCharsets.UTF_8), "application/xml");
    }

    public boolean checkIfDirectoryExists(String resourceIdentifier, FOLDER_TYPE folderType) throws IOException {
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        String path = config.getDatastorePath() + folderType + "/" + resourceIdentifier;
        String url = config.getUrl() + "/remote.php/dav/files/" + config.getUsername() + "/" + path;
        return sardine.exists(url);
    }

    /**
     * Create a share in Nextcloud for the specified resource identifier.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @return the share URL.
     */
    public String createShare(String resourceIdentifier, FOLDER_TYPE folderType) {
        String url = config.getUrl() + "/ocs/v2.php/apps/files_sharing/api/v1/shares";
        String path = config.getDatastorePath() + folderType + "/" + resourceIdentifier;
        // Build request body using MultiValueMap
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("path", path);
        // 3 is the share type for Public Link, O is for user share, 1 is for group share
        body.add("shareType", "3");
        // 1 is the permission for read only
        body.add("permissions", "1");

        // Create request entity
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, createHeaders());

        // Execute POST request
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);
        System.out.println("Create Share response code: " + response.getStatusCode());
        if (response.getStatusCode().is1xxInformational() || response.getStatusCode().is2xxSuccessful()) {
            System.out.println("Share created successfully");
        } else {
            System.out.println("Failed to create share");
            throw new RuntimeException("Failed to create share");
        }
        try {
            Element createShareResponse = Xml.loadString(response.getBody(), false);
            return getShareUrl(createShareResponse);
        } catch (IOException | JDOMException e) {
            throw new RuntimeException(e);
        }
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
