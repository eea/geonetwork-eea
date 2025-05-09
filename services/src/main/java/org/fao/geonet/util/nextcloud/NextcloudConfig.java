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


import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Nextcloud configuration
 */
@Component("nextcloudConfig")
public class NextcloudConfig {
    @Value("${nextcloud.url}")
    private String url;

    @Value("${nextcloud.username}")
    private String username;

    @Value("${nextcloud.password}")
    private String password;

    @Value("${nextcloud.base.folder}")
    private String baseFolder;

    @Value("${nextcloud.datastore.path}")
    private String datastorePath;

    @Value("${nextcloud.cataloguestore.path}")
    private String catalogueStorePath;

    @Value("${nextcloud.shareUrl.prefix}")
    private String shareUrlPrefix;

    @Value("#{'${nextcloud.internalShare.groups}'.split(',')}")
    private List<String> internalShareGroups;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDatastorePath() {
        return datastorePath;
    }

    public void setDatastorePath(String datastorePath) {
        this.datastorePath = datastorePath;
    }

    public String getShareUrlPrefix() {
        return shareUrlPrefix;
    }

    public void setShareUrlPrefix(String shareUrlPrefix) {
        this.shareUrlPrefix = shareUrlPrefix;
    }

    public String getCatalogueStorePath() {
        return catalogueStorePath;
    }

    public void setCatalogueStorePath(String catalogueStorePath) {
        this.catalogueStorePath = catalogueStorePath;
    }

    public String getBaseFolder() {
        return baseFolder;
    }

    public void setBaseFolder(String baseFolder) {
        this.baseFolder = baseFolder;
    }

    public List<String> getInternalShareGroups() {
        return internalShareGroups;
    }

    public void setInternalShareGroups(List<String> internalShareGroups) {
        this.internalShareGroups = internalShareGroups;
    }
}
