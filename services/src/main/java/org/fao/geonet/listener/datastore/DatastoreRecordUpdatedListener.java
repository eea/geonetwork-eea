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

import org.fao.geonet.constants.Geonet;
import org.fao.geonet.domain.AbstractMetadata;
import org.fao.geonet.events.history.RecordUpdatedEvent;
import org.fao.geonet.kernel.datamanager.IMetadataSchemaUtils;
import org.fao.geonet.kernel.datamanager.base.BaseMetadataUtils;
import org.fao.geonet.kernel.schema.MetadataSchema;
import org.fao.geonet.util.nextcloud.NextcloudService;
import org.fao.geonet.utils.Log;
import org.fao.geonet.utils.Xml;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;


@Component
public class DatastoreRecordUpdatedListener implements ApplicationListener<RecordUpdatedEvent> {
    private final BaseMetadataUtils metadataUtils;
    private final NextcloudService nextcloudService;
    private final IMetadataSchemaUtils metadataSchemaUtils;

    public DatastoreRecordUpdatedListener(BaseMetadataUtils metadataUtils, NextcloudService nextcloudService,
                                          IMetadataSchemaUtils metadataSchemaUtils) {
        this.metadataUtils = metadataUtils;
        this.metadataSchemaUtils = metadataSchemaUtils;
        this.nextcloudService = nextcloudService;
    }

    @Override
    public void onApplicationEvent(RecordUpdatedEvent event) {
        AbstractMetadata metadata = metadataUtils.findOne(event.getMdId().intValue());

        try {
            final MetadataSchema schema = metadataSchemaUtils
                .getSchema(metadata.getDataInfo().getSchemaId());
            String oldResourceIdentifier = schema.queryString("eea-resourceid-get", Xml.loadString(event.getPreviousState(), false));

            nextcloudService.setupDatastore(metadata, oldResourceIdentifier);
        } catch (Exception ex) {
            Log.error(Geonet.DATA_MANAGER, "Metadata update: couldn't proxy the request to the Nextcloud share " + event.getSource(), ex);
        }

    }
}
