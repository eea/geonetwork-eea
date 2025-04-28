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
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.entity.ContentType;
import org.fao.geonet.api.API;
import org.fao.geonet.kernel.GeonetworkDataDirectory;
import org.fao.geonet.lib.Lib;
import org.fao.geonet.utils.Log;
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

/**
 * Nextcloud client used for interacting with the Nextcloud API.
 */
@Component
public class NextcloudClient {

    public static final String REMOTE_PHP_DAV_FILES = "/remote.php/dav/files/";
    public static final String META_STATUSCODE_XPATH = "./meta/statuscode";
    private final RestTemplate restTemplate;
    private final NextcloudConfig config;
    private final GeonetworkDataDirectory geonetworkDataDirectory;

    public NextcloudClient(NextcloudConfig config, RestTemplate restTemplate, GeonetworkDataDirectory geonetworkDataDirectory) {
        this.config = config;
        this.restTemplate = restTemplate;
        this.geonetworkDataDirectory = geonetworkDataDirectory;

        if (StringUtils.isBlank(config.getUrl())
            || StringUtils.isBlank(config.getUsername())
            || StringUtils.isBlank(config.getPassword())
            || StringUtils.isBlank(config.getDatastorePath())) {
            Log.warning(API.LOG_MODULE_NAME, "Datastore: The configuration of Nextcloud is not set. The Nextcloud API "
                + "will not work. Please set the Nextcloud URL in config.properties or use System properties.");
        }

    }

    /**
     * Create the headers for the Nextcloud API requests. It manages authentication and other required headers.
     *
     * @return the headers.
     */
    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        String auth = Base64.getEncoder().encodeToString((config.getUsername() + ":" + config.getPassword()).getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + auth);
        headers.set("OCS-APIRequest", "true");
        headers.setAccept(MediaType.parseMediaTypes("application/xml"));
        return headers;
    }

    /**
     * Get the shares response for the specified resource identifier.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @return the shares request response.
     * @throws NextcloudException if an error occurs while parsing the shares response.
     */
    public Element getSharesResponse(String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        String path = getPath(resourceIdentifier, folderType);
        Map<String, ?> params = Map.of("path", path);

        String url = config.getUrl() + "/ocs/v2.php/apps/files_sharing/api/v1/shares?path={path}&reshares=true";
        HttpEntity<String> request = new HttpEntity<>(createHeaders());

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, request, String.class, params);
        String responseBody = response.getBody();
        try {
            return Xml.loadString(responseBody, false);
        } catch (IOException | JDOMException e) {
            throw new NextcloudException("Error getting the existing shares for " + resourceIdentifier, e);
        }
    }

    /**
     * Get the response code from the response.
     *
     * @param response the response.
     * @return the response code.
     * @throws JDOMException if an error occurs while parsing the XML response.
     */
    public int getResponseCode(Element response) throws JDOMException {
        return Xml.selectNumber(response, META_STATUSCODE_XPATH).intValue();
    }

    /**
     * List the shares from the response.
     *
     * @param response the response.
     * @return a list of share URLs.
     * @throws NextcloudException if an error occurs while extracting the shares.
     */
    public List<String> listShares(Element response) throws NextcloudException {
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
            throw new NextcloudException("Error extracting the shares from the Nextcloud response", e);
        }
        return sharesList;
    }


    /**
     * Get the share URL from the response.
     *
     * @param shareResponse the response.
     * @throws NextcloudException if an error occurs while extracting the share URL.
     * @return the share URL.
     */
    public String getShareUrl(Element shareResponse) throws NextcloudException {
        try {
            return Xml.selectString(shareResponse, "./data/url");
        } catch (JDOMException e) {
            throw new NextcloudException("Error parsing the Nextcloud response and getting the share URL", e);
        }
    }

    /**
     * Create a folder in Nextcloud using the WebDAV API, the folder will be created in the specified folder type.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @throws NextcloudException if an error occurs while creating the folder.
     */
    public void createFolder(String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        String path = getPath(resourceIdentifier, folderType);
        String url = config.getUrl() + REMOTE_PHP_DAV_FILES + config.getUsername() + "/" + path;
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        try {
            sardine.createDirectory(url);
        } catch (IOException e) {
            throw new NextcloudException("Datashare: Error creating the folder '" + path + "' in Nextcloud", e);
        }
    }

    /**
     * Create a symlink based on the resource identifier eg. eea_t_national-emissions-reported_p_2025_v01_r00
     * which will be /{public|internal}/eea_t_national-emissions-reported_p_2025_v01_r00
     * pointing to the metadata directory in the catalogue datastore.
     *
     */
    public void createSymlink(String metadataId, String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        try {
            Path metadataDir = Lib.resource.getMetadataDir(geonetworkDataDirectory, metadataId);
            String path = getPath(resourceIdentifier, folderType);
            Path symLinkPath = Path.of(config.getBaseFolder(), path);
            Files.createSymbolicLink(
                symLinkPath,
                symLinkPath.getParent().relativize(metadataDir)
            );
        } catch (IOException e) {
            throw new NextcloudException("Datashare: Error creating the symlink for record with id '" + metadataId + "' in Nextcloud", e);
        }
    }


    public void deleteFile(String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        String path = getPath(resourceIdentifier, folderType);
        Path filePath = Path.of(config.getBaseFolder(), path);
        try {
            if (Files.isSymbolicLink(filePath)) {
                Files.deleteIfExists(filePath);
            } else {
                Log.debug(API.LOG_MODULE_NAME, String.format(
                    "Datastore: %s is not a symbolic link. Keeping it.", filePath));
            }
        } catch (IOException e) {
            throw new NextcloudException(String.format("Datashare: Error deleting folder %s in Nextcloud", filePath), e);
        }
    }

    public void deleteXmlDocument(String resourceIdentifier, FOLDER_TYPE folderType, String uuid) {
       String path = getPath(resourceIdentifier, folderType);
        Path folderPath = Path.of(config.getBaseFolder(), path);
        String suffix = "_metadata_" + uuid + ".xml";

        try {
            Files.list(folderPath)
                 .filter(file -> file.toString().endsWith(suffix))
                 .forEach(file -> {
                     try {
                         Files.deleteIfExists(file);
                     } catch (IOException e) {
                         throw new NextcloudException("Datashare: Error deleting file: " + file, e);
                     }
                 });
        } catch (IOException e) {
            throw new NextcloudException("Datashare: Error deleting files in folder: " + folderPath, e);
        }
    }


    /**
     * Create a file in Nextcloud using the WebDAV API, the file will be created in the specified folder type.
     *
     * @param data               the content of the file.
     * @param fileName           the name of the file.
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @throws NextcloudException if an error occurs while creating the file.
     */
    public void createFile(String data, String fileName, String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        String path = getPath(resourceIdentifier, folderType);
        String url = config.getUrl() + REMOTE_PHP_DAV_FILES + config.getUsername() + "/" + path + "/" + fileName;
        try {
            // TODO: Remove existing file if it exists? based on *uuid.xml ?
            //  eg. if title change, the file needs to be updated
            sardine.put(url, data.getBytes(StandardCharsets.UTF_8), ContentType.APPLICATION_XML.getMimeType());
        } catch (IOException e) {
            throw new NextcloudException("Error creating the XML metadata file '" + path + "' in Nextcloud", e);
        }
    }


    /**
     * Check if a directory exists in Nextcloud.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @return true if the directory exists, false otherwise.
     * @throws NextcloudException if an error occurs while checking if the directory exists.
     */
    public boolean checkIfDirectoryExists(String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        Sardine sardine = SardineFactory.begin(config.getUsername(), config.getPassword());
        String path = getPath(resourceIdentifier, folderType);
        String url = config.getUrl() + REMOTE_PHP_DAV_FILES + config.getUsername() + "/" + path;
        try {
            return sardine.exists(url);
        } catch (IOException e) {
            throw new NextcloudException("Error checking in directory '" + path + "' exists in Nextcloud", e);
        }
    }

    /**
     * Create a share in Nextcloud for the specified resource identifier.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @throws NextcloudException if an error occurs while creating the share.
     * @return the share URL.
     */
    public String createShare(String resourceIdentifier, FOLDER_TYPE folderType) throws NextcloudException {
        String url = config.getUrl() + "/ocs/v2.php/apps/files_sharing/api/v1/shares";
        String path = getPath(resourceIdentifier, folderType);
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
        if (response.getStatusCode().is1xxInformational() || response.getStatusCode().is2xxSuccessful()) {
            Log.debug(API.LOG_MODULE_NAME, "Datastore: Share created successfully.");
        } else {
            throw new NextcloudException("Failed to create share for " + path + ". Response code: " + response.getStatusCode());
        }
        try {
            Element createShareResponse = Xml.loadString(response.getBody(), false);
            return getShareUrl(createShareResponse);
        } catch (IOException | JDOMException e) {
            throw new NextcloudException("Error reading the response for creating the share for " + path, e);
        }
    }

    /**
     * Proxy the request to the Nextcloud share.
     *
     * @param shareUrl the share URL.
     * @return the response.
     */
    public ResponseEntity<String> proxyRequest(String shareUrl) {
        // Proxy the request to the Nextcloud share
        String targetUrl = shareUrl;
        if (StringUtils.isNotBlank(config.getShareUrlPrefix())) {
            targetUrl = StringUtils.removeStart(shareUrl, config.getShareUrlPrefix());
            targetUrl = config.getUrl() + "/" + targetUrl;
        }

        ResponseEntity<String> response = restTemplate.exchange(targetUrl, HttpMethod.GET, new HttpEntity<>(Map.of()), String.class);
        return ResponseEntity
            .status(response.getStatusCode())
            .headers(response.getHeaders())
            .body(response.getBody());
    }

    /**
     * Get the path for the specified resource identifier and folder type.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @param folderType         the type of the folder.
     * @return the path.
     */
    private String getPath(String resourceIdentifier, FOLDER_TYPE folderType) {
        return config.getDatastorePath() + folderType + "/" + resourceIdentifier;
    }


    /**
     * Folder types in EEA's Nextcloud.
     */
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
