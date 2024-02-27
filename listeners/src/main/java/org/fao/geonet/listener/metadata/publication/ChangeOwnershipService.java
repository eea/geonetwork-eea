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

import com.google.common.base.Optional;
import jeeves.server.context.ServiceContext;
import org.fao.geonet.constants.Geonet;
import org.fao.geonet.domain.AbstractMetadata;
import org.fao.geonet.domain.OperationAllowed;
import org.fao.geonet.domain.OperationAllowedId;
import org.fao.geonet.kernel.datamanager.IMetadataIndexer;
import org.fao.geonet.kernel.datamanager.IMetadataManager;
import org.fao.geonet.kernel.datamanager.IMetadataOperations;
import org.fao.geonet.kernel.search.IndexingMode;
import org.fao.geonet.repository.OperationAllowedRepository;
import org.fao.geonet.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.fao.geonet.repository.specification.OperationAllowedSpecs.hasGroupId;
import static org.fao.geonet.repository.specification.OperationAllowedSpecs.hasMetadataId;
import static org.springframework.data.jpa.domain.Specification.where;

@Service
public class ChangeOwnershipService {
    OperationAllowedRepository operationAllowedRepository;

    IMetadataManager metadataManager;

    IMetadataOperations metadataOperations;

    IMetadataIndexer metadataIndexer;

    @Autowired
    public ChangeOwnershipService(OperationAllowedRepository operationAllowedRepository,
                                  IMetadataManager metadataManager, IMetadataOperations metadataOperations,
                                  IMetadataIndexer metadataIndexer) {
        this.operationAllowedRepository = operationAllowedRepository;
        this.metadataManager = metadataManager;
        this.metadataOperations = metadataOperations;
        this.metadataIndexer = metadataIndexer;
    }

    /**
     * Changes the metadata group ownership to a new group.
     *
     * @param serviceContext
     * @param metadata
     * @param newGroupOwnerId
     * @throws Exception
     */
    public void changeMetadataGroupOwnership(ServiceContext serviceContext,
                                        AbstractMetadata metadata, Integer fromGroupOwnerId, Integer newGroupOwnerId) throws Exception {
        Integer metadataId = metadata.getId();
        Integer userOwnerId = metadata.getSourceInfo().getOwner();
        Integer groupOwnerId = metadata.getSourceInfo().getGroupOwner();

        // If the group owner is not the one expected, don't apply any changes
        if (!Objects.equals(groupOwnerId, fromGroupOwnerId)) {
            Log.warning(Geonet.DATA_MANAGER, String.format("Ignoring update the ownership of the metadata with uuid '%s'. Current group owner (%d) is not the expected one (%d)", metadata.getUuid(), groupOwnerId, fromGroupOwnerId));
            return;
        }

        List<OperationAllowedId> metadataPrivilegesForOwner =
            retrievePrivilegesForUserAndGroup(
                String.valueOf(metadataId), userOwnerId, groupOwnerId);

        for (OperationAllowedId priv : metadataPrivilegesForOwner) {
            if (groupOwnerId != null) {
                metadataOperations.unsetOperation(
                    serviceContext,
                    metadataId,
                    groupOwnerId,
                    priv.getOperationId());
            }
            metadataOperations.setOperation(serviceContext,
                metadataId,
                newGroupOwnerId,
                priv.getOperationId());
        }

        metadataManager.updateMetadataOwner(metadataId, String.valueOf(userOwnerId), String.valueOf(newGroupOwnerId));

        metadataIndexer.indexMetadata(String.valueOf(metadataId), true, IndexingMode.full);
    }


    private List<OperationAllowedId> retrievePrivilegesForUserAndGroup(String id, Integer userId, Integer groupId) {
        int iMetadataId = Integer.parseInt(id);
        Specification<OperationAllowed> spec =
            where(hasMetadataId(iMetadataId));
        if (groupId != null) {
            spec = spec.and(hasGroupId(groupId));
        }

        List<OperationAllowed> operationsAllowed = operationAllowedRepository.findAllWithOwner(userId, Optional.of(spec));

        List<OperationAllowedId> result = new ArrayList<>();
        for (OperationAllowed operationAllowed : operationsAllowed) {
            result.add(operationAllowed.getId());
        }

        return result;
    }

}
