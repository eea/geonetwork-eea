/*
 * Copyright (C) 2001-2024 Food and Agriculture Organization of the
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

package org.fao.geonet.listener.metadata.publication;

import jeeves.server.context.ServiceContext;
import org.fao.geonet.constants.Geonet;
import org.fao.geonet.domain.Group;
import org.fao.geonet.events.md.MetadataUnpublished;
import org.fao.geonet.repository.GroupRepository;
import org.fao.geonet.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class ChangeOwnershipUnpublishedRecord implements ApplicationListener<MetadataUnpublished> {
    ChangeOwnershipService metadataPrivilegesService;

    GroupRepository groupRepository;

    @Value("${groupowner.unpublished}")
    private String groupOwnerNameUnpublished;

    @Value("${groupowner.published}")
    private String groupOwnerNamePublished;

    @Autowired
    public ChangeOwnershipUnpublishedRecord(ChangeOwnershipService metadataPrivilegesService, GroupRepository groupRepository) {
        this.metadataPrivilegesService = metadataPrivilegesService;
        this.groupRepository = groupRepository;
    }

    @Override
    public void onApplicationEvent(MetadataUnpublished event) {
        // Implementation in doBeforeCommit before the transaction is committed
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void doBeforeCommit(MetadataUnpublished event) {
        try {
            ServiceContext serviceContext = ServiceContext.get();

            Group groupOwnerUnpublished = groupRepository.findByName(groupOwnerNameUnpublished);
            if (groupOwnerUnpublished == null) {
                Log.warning(Geonet.DATA_MANAGER,
                    String.format("Couldn't update the ownership of the metadata %s. Group %s doesn't exist", event.getMd().getUuid(), groupOwnerNameUnpublished));
                return;
            }

            Group groupOwnerPublished = groupRepository.findByName(groupOwnerNamePublished);
            if (groupOwnerPublished == null) {
                Log.warning(Geonet.DATA_MANAGER,
                    String.format("Couldn't update the ownership of the metadata %s. Group %s doesn't exist", event.getMd().getUuid(), groupOwnerNamePublished));
                return;
            }

            Integer groupOwnerUnpublishedId = groupOwnerUnpublished.getId();
            Integer originGroupOwner = groupOwnerPublished.getId();

            // Change the ownership from groupOwnerNamePublished to groupOwnerNameUnpublished
            metadataPrivilegesService.changeMetadataGroupOwnership(serviceContext, event.getMd(), originGroupOwner, groupOwnerUnpublishedId);
        } catch (Throwable e) {
            Log.error(Geonet.DATA_MANAGER, "Couldn't update the ownership of the metadata " + event.getMd(), e);
        }

    }
}
