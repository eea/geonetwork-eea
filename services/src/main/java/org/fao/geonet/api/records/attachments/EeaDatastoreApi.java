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
package org.fao.geonet.api.records.attachments;

import javax.servlet.http.HttpServletRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.fao.geonet.api.ApiUtils;
import org.fao.geonet.domain.AbstractMetadata;
import org.fao.geonet.kernel.datamanager.base.BaseMetadataUtils;
import org.fao.geonet.util.nextcloud.NextcloudClient;
import org.fao.geonet.utils.Xml;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.Namespace;
import org.jdom.Text;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import static org.fao.geonet.api.ApiParams.API_CLASS_RECORD_OPS;
import static org.fao.geonet.api.ApiParams.API_CLASS_RECORD_TAG;

@Controller
@RequestMapping(value = {"/{portal}/api/records/{uuid}"})
@Tag(name = API_CLASS_RECORD_TAG,
    description = API_CLASS_RECORD_OPS)
public class EeaDatastoreApi {
    private static final String EEA_ONLINE_RESOURCES_XPATH = ".//gmd:onLine/*/gmd:linkage[starts-with(lower-case(gmd:URL), 'https://sdi.eea.europa.eu/data/%s')]/gmd:URL/text()";
    private final NextcloudClient nextcloudClient;

    private BaseMetadataUtils baseMetadataUtils;

    public EeaDatastoreApi(BaseMetadataUtils baseMetadataUtils, NextcloudClient nextcloudClient) {
        this.baseMetadataUtils = baseMetadataUtils;
        this.nextcloudClient = nextcloudClient;
    }


    @GetMapping(value = "/datastore")
    @ResponseBody
    public String test(@PathVariable String uuid, HttpServletRequest request) throws Exception {

        System.out.println("UUID: " + uuid);
        AbstractMetadata metadata = ApiUtils.canViewRecord(uuid, request);
        // Get direct download links
        Element metadataXml = metadata.getXmlData(false);
        List<Namespace> allNamespaces = new ArrayList<>(metadataXml.getAdditionalNamespaces());
        allNamespaces.add(metadataXml.getNamespace());


        List<Text> links = (List<Text>) Xml.selectNodes(metadataXml, String.format(EEA_ONLINE_RESOURCES_XPATH, uuid),
            allNamespaces);

        System.out.println("Links:");
        if (links.isEmpty()) {
            System.out.println("No links found");
        } else {
            for (Text link : links) {
                System.out.println(link);
            }
        }

        String resourceIdentifier = baseMetadataUtils.getResourceIdentifier(uuid);
        System.out.println("Resource Identifier: " + resourceIdentifier);
        NextcloudClient.FOLDER_TYPE folderType = getFolderType(resourceIdentifier);

        boolean directoryExists = nextcloudClient.checkIfDirectoryExists(resourceIdentifier, folderType);
        if (!directoryExists) {
            // Create the folder and add the metadata file XML
            nextcloudClient.createFolder(resourceIdentifier, folderType);
            nextcloudClient.createFile(metadata.getData(), metadata.getUuid() + ".xml", resourceIdentifier, folderType);
        }
        List<String> existingShares = checkIfNextcloudShareExists(folderType, resourceIdentifier);
        System.out.println("Share exists: " + existingShares.stream().collect(Collectors.joining(", ")));
        if (existingShares.isEmpty()) {
            // Create a share
            existingShares.add(nextcloudClient.createShare(resourceIdentifier, folderType));
        }


        return metadata.getUuid() + " - Shares: " + existingShares.stream().collect(Collectors.joining(", "));
    }

    /**
     * Check if a share exists in Nextcloud for the specified resource identifier.
     *
     * @param folderType         the type of the folder.
     * @param resourceIdentifier the identifier of the resource.
     * @return a list of share URLs or an empty list if no shares exist.
     * @throws JDOMException if an error occurs while parsing the XML response.
     */
    private List<String> checkIfNextcloudShareExists(NextcloudClient.FOLDER_TYPE folderType, String resourceIdentifier) throws JDOMException {
        Element sharesResponse = nextcloudClient.getSharesResponse(resourceIdentifier, folderType);
        int responseCode = nextcloudClient.getResponseCode(sharesResponse);
        if (responseCode == HttpStatus.NOT_FOUND.value()) {
            return new ArrayList<>();
        }
        return nextcloudClient.listShares(sharesResponse);

    }

    /**
     * Get the folder type based on the resource identifier.
     *
     * @param resourceIdentifier the identifier of the resource.
     * @return the folder type.
     */
    private NextcloudClient.FOLDER_TYPE getFolderType(String resourceIdentifier) {
        NextcloudClient.FOLDER_TYPE folderType = NextcloudClient.FOLDER_TYPE.PUBLIC;
        if (StringUtils.contains(resourceIdentifier, "_p_")) {
            folderType = NextcloudClient.FOLDER_TYPE.PUBLIC;
        } else if (StringUtils.contains(resourceIdentifier, "_r_")) {
            folderType = NextcloudClient.FOLDER_TYPE.RESTRICTED;
        } else if (StringUtils.contains(resourceIdentifier, "_i_")) {
            folderType = NextcloudClient.FOLDER_TYPE.INTERNAL;
        }
        return folderType;

    }
}
