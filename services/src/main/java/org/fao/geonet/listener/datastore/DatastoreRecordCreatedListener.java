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
package org.fao.geonet.listener.datastore;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.fao.geonet.constants.Geonet;
import org.fao.geonet.domain.AbstractMetadata;
import org.fao.geonet.events.history.RecordCreateEvent;
import org.fao.geonet.events.history.RecordUpdatedEvent;
import org.fao.geonet.kernel.GeonetworkDataDirectory;
import org.fao.geonet.kernel.datamanager.IMetadataSchemaUtils;
import org.fao.geonet.kernel.datamanager.base.BaseMetadataUtils;
import org.fao.geonet.kernel.schema.MetadataSchema;
import org.fao.geonet.lib.Lib;
import org.fao.geonet.util.nextcloud.NextcloudService;
import org.fao.geonet.utils.Log;
import org.fao.geonet.utils.Xml;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;


@Component
public class DatastoreRecordCreatedListener implements ApplicationListener<RecordCreateEvent> {
    private final BaseMetadataUtils metadataUtils;
    private final GeonetworkDataDirectory dataDirectory;

    public DatastoreRecordCreatedListener(BaseMetadataUtils metadataUtils, GeonetworkDataDirectory dataDirectory) {
        this.metadataUtils = metadataUtils;
        this.dataDirectory = dataDirectory;
    }

    @Override
    public void onApplicationEvent(RecordCreateEvent event) {
        AbstractMetadata metadata = metadataUtils.findOne(event.getMdId().intValue());

        try {
            final Path metadataDir = Lib.resource.getMetadataDir(dataDirectory, metadata.getId());

            if (!Files.exists(metadataDir)) {
                try {
                    Files.createDirectories(metadataDir);
                } catch (Exception e) {
                    throw new IOException(
                        String.format("Can't create metadata folder for newly created record '%s'.", metadata.getUuid()));
                }
            }
        } catch (Exception ex) {
            Log.error(Geonet.DATA_MANAGER, "Metadata created: couldn't initialize metadata folder " + event.getSource(), ex);
        }

    }
}
