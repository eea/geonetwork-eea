-- EEA migration to GeoNetwork 4.4.13 (4.4.10 to 4.4.13 and EEA changes).
--
-- EEA disables the automatic database migration (WEB-INF/config-db/database_migration.xml),
-- so this script is run by hand, in this order:
--   1. stop GeoNetwork 4 and GeoNetwork 5;
--   2. run this script once, in one transaction:
--        psql -v ON_ERROR_STOP=1 -1 -f db-migrate-4413.sql
--   3. start GeoNetwork 4.4.13, then GeoNetwork 5.
-- It creates the schema GeoNetwork 4.4.13 would otherwise add through Hibernate, and the OGC API
-- Records configuration GeoNetwork 5 would otherwise seed on its first start (Liquibase is
-- disabled for EEA), so it does not depend on either application starting first.
-- It is not meant to run twice: a second run stops at the first CREATE SEQUENCE and, in one
-- transaction, changes nothing.

create sequence ogcapi_field_mapping_id_seq;

alter sequence ogcapi_field_mapping_id_seq owner to "geonetwork";

create sequence ogcapi_facet_config_id_seq;

alter sequence ogcapi_facet_config_id_seq owner to "geonetwork";

create sequence ogcapi_filter_facet_id_seq;

alter sequence ogcapi_filter_facet_id_seq owner to "geonetwork";


create table ogcapi_property_mapping
(
  id                   varchar(255)       not null,
  default_bucket_count integer default 10 not null,
  update_sequence      bigint  default 1  not null
);

alter table ogcapi_property_mapping
  owner to "geonetwork";

create table ogcapi_field_mapping
(
  id                     bigint  default nextval('ogcapi_field_mapping_id_seq'::regclass) not null,
  config_id              varchar(255)                                                     not null,
  sort_order             integer default 0                                                not null,
  ogc_property           varchar(255),
  elastic_property       varchar(255),
  index_record_property  varchar(255),
  type_override          varchar(50),
  sort_field_suffix      varchar(255),
  is_sortable            boolean default false,
  is_queryable           boolean default false,
  title                  varchar(255),
  description            text,
  add_property_to_output boolean default true
);

alter table ogcapi_field_mapping
  owner to "geonetwork";

create table ogcapi_facet_config
(
  id                       bigint  default nextval('ogcapi_facet_config_id_seq'::regclass) not null,
  field_mapping_id         bigint                                                          not null,
  sort_order               integer default 0                                               not null,
  facet_name               varchar(255),
  facet_type               varchar(50),
  bucket_sorting           varchar(50),
  bucket_sorting_direction varchar(50),
  bucket_count             integer,
  minimum_document_count   integer default 1                                               not null,
  number_bucket_interval   double precision,
  calendar_interval_unit   varchar(50)
);

alter table ogcapi_facet_config
  owner to "geonetwork";

create table ogcapi_filter_facet
(
  id                  bigint  default nextval('ogcapi_filter_facet_id_seq'::regclass) not null,
  facet_config_id     bigint                                                          not null,
  sort_order          integer default 0                                               not null,
  filter_name         varchar(255),
  filter_equation_cql text
);

alter table ogcapi_filter_facet
  owner to "geonetwork";

-- OGC API Records property mapping: the configuration GeoNetwork 5 seeds from
-- application-ogcapi-records.yml (eea-dev-5.0.x) when the 'property-mapping' row is missing.
-- Inserted here so the configuration does not depend on GeoNetwork 5 starting first (Liquibase
-- is disabled for EEA). Only when the row does not exist yet. Keep in sync with the GeoNetwork 5
-- YAML when it changes the standard mappings.
DO $$
BEGIN
IF NOT EXISTS (SELECT 1 FROM ogcapi_property_mapping WHERE id = 'property-mapping') THEN
INSERT INTO ogcapi_property_mapping (id, default_bucket_count, update_sequence) VALUES ('property-mapping', 10, 1);
INSERT INTO ogcapi_field_mapping (config_id, sort_order, ogc_property, elastic_property, index_record_property, type_override, sort_field_suffix, is_sortable, is_queryable, title, description, add_property_to_output) VALUES
  ('property-mapping', 0, 'spatialRepresentationType', 'cl_spatialRepresentationType.key', 'codelists.["cl_spatialRepresentationType"].[*].properties.["key"]', 'LIST_STRING', NULL, false, false, NULL, NULL, true),
  ('property-mapping', 1, 'resourceType', 'resourceType', 'resourceType', NULL, NULL, true, true, NULL, NULL, true),
  ('property-mapping', 2, 'format', 'format', 'format', NULL, NULL, false, false, NULL, NULL, false),
  ('property-mapping', 3, 'tags', 'tag.langeng', 'tag.[*].["default"]', NULL, NULL, false, false, NULL, NULL, false),
  ('property-mapping', 4, 'updateFrequency', 'cl_maintenanceAndUpdateFrequency.key', 'codelists.["cl_maintenanceAndUpdateFrequency"].[*].properties.["key"]', 'SINGLE_STRING', NULL, true, true, NULL, NULL, true),
  ('property-mapping', 5, 'topic', 'cl_topic.key', 'codelists.["cl_topic"].[*].properties.["key"]', 'LIST_STRING', NULL, false, true, NULL, NULL, true),
  ('property-mapping', 6, 'status', 'cl_status.key', 'codelists.["cl_status"].[*].properties.["key"]', 'LIST_STRING', NULL, false, true, NULL, NULL, true),
  ('property-mapping', 7, 'creationYearForResource', 'creationYearForResource', 'resourceDateDetails.["creationYearForResource"].[0]', NULL, NULL, true, false, NULL, NULL, true),
  ('property-mapping', 8, 'linkProtocol', 'linkProtocol', 'linkProtocols', NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 9, 'createDate', 'createDate', 'createDate', NULL, NULL, true, true, NULL, NULL, true),
  ('property-mapping', 10, 'resourceTitleObject', 'resourceTitleObject.default', 'resourceTitle.["default"]', NULL, 'sort', true, true, NULL, NULL, true),
  ('property-mapping', 11, 'resolutionScaleDenominator', 'resolutionScaleDenominator', 'resolutionScaleDenominator', NULL, NULL, true, true, NULL, NULL, true),
  ('property-mapping', 12, 'popularity', 'popularity', 'popularity', NULL, NULL, true, false, NULL, NULL, true),
  ('property-mapping', 13, 'childUuid', 'childUuid', 'childUuid', 'LIST_STRING', NULL, false, true, NULL, NULL, true),
  ('property-mapping', 14, 'orgForResource', 'OrgForResourceObject.default', 'orgForResourceByRole.["OrgForResourceObject"].[*].["default"]', NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 15, 'id', 'uuid', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 16, 'created', 'createDate', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 17, 'updated', 'resourceDate.date', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 18, 'language', 'mainLanguage', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 19, 'languages', 'otherLanguage', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 20, 'organization', 'OrgForResourceObject.default', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 21, 'title', 'resourceTitleObject.default', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 22, 'description', 'resourceAbstractObject.default', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 23, 'keywords', 'tag.default', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 24, 'geometry', 'geom', NULL, NULL, NULL, false, false, NULL, NULL, true),
  ('property-mapping', 25, 'time', 'resourceTemporalDateRange', NULL, NULL, NULL, false, false, NULL, NULL, true);
INSERT INTO ogcapi_facet_config (field_mapping_id, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction, bucket_count, minimum_document_count, number_bucket_interval, calendar_interval_unit)
SELECT fm.id, v.sort_order, v.facet_name, v.facet_type, v.bucket_sorting, v.bucket_sorting_direction, v.bucket_count, v.minimum_document_count, v.number_bucket_interval, v.calendar_interval_unit
FROM (VALUES
  ('spatialRepresentationType', 0, 'spatialRepresentationType', 'TERM', 'COUNT', 'DESCENDING', NULL, 1, NULL, NULL),
  ('resourceType', 0, 'resourceType', 'TERM', 'COUNT', 'DESCENDING', NULL, 1, NULL, NULL),
  ('format', 0, 'format', 'TERM', 'COUNT', 'DESCENDING', 50, 1, NULL, NULL),
  ('tags', 0, 'tags', 'TERM', 'COUNT', 'DESCENDING', 50, 1, NULL, NULL),
  ('updateFrequency', 0, 'updateFrequency', 'TERM', 'COUNT', 'DESCENDING', 50, 1, NULL, NULL),
  ('topic', 0, 'topic', 'TERM', 'COUNT', 'DESCENDING', 25, 1, NULL, NULL),
  ('status', 0, 'status', 'TERM', 'COUNT', 'DESCENDING', NULL, 1, NULL, NULL),
  ('creationYearForResource', 0, 'creationYearForResource', 'HISTOGRAM_FIXED_INTERVAL', 'VALUE', 'DESCENDING', 25, 1, 5, NULL),
  ('creationYearForResource', 1, 'creationYearForResource2', 'HISTOGRAM_FIXED_BUCKET_COUNT', 'VALUE', 'ASCENDING', 5, 1, NULL, NULL),
  ('linkProtocol', 0, 'availableInServices', 'FILTER', 'COUNT', 'DESCENDING', NULL, 1, NULL, NULL),
  ('createDate', 0, 'createDate', 'HISTOGRAM_FIXED_INTERVAL', 'VALUE', 'DESCENDING', 25, 1, NULL, 'month'),
  ('createDate', 1, 'createDate2', 'HISTOGRAM_FIXED_BUCKET_COUNT', 'VALUE', 'DESCENDING', 5, 1, NULL, NULL),
  ('resolutionScaleDenominator', 0, 'resolutionScaleDenominator', 'HISTOGRAM_FIXED_INTERVAL', 'VALUE', 'DESCENDING', 25, 1, 100000, NULL),
  ('resolutionScaleDenominator', 1, 'resolutionScaleDenominator2', 'HISTOGRAM_FIXED_BUCKET_COUNT', 'VALUE', 'DESCENDING', 5, 1, NULL, NULL),
  ('orgForResource', 0, 'orgForResource', 'TERM', 'COUNT', 'DESCENDING', 50, 1, NULL, NULL)
) AS v(ogc_property, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction, bucket_count, minimum_document_count, number_bucket_interval, calendar_interval_unit)
JOIN ogcapi_field_mapping fm ON fm.config_id = 'property-mapping' AND fm.ogc_property = v.ogc_property;
INSERT INTO ogcapi_filter_facet (facet_config_id, sort_order, filter_name, filter_equation_cql)
SELECT fc.id, v.sort_order, v.filter_name, v.filter_equation_cql
FROM (VALUES
  ('linkProtocol', 'availableInServices', 0, 'availableInDownloadService', 'linkProtocol = ''OGC:WFS'''),
  ('linkProtocol', 'availableInServices', 1, 'availableInViewService', 'linkProtocol = ''OGC:WMS''')
) AS v(ogc_property, facet_name, sort_order, filter_name, filter_equation_cql)
JOIN ogcapi_field_mapping fm ON fm.config_id = 'property-mapping' AND fm.ogc_property = v.ogc_property
JOIN ogcapi_facet_config fc ON fc.field_mapping_id = fm.id AND fc.facet_name = v.facet_name;
END IF;
END $$;


INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/publication/doi/doimailnotification', 'false', 2, 100192, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/publication/doi/doimailnotification');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/publishForGroupEditors', 'false', 2, 9101, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/publishForGroupEditors');
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/copyAttachments', 'true', 2, 9102, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/copyAttachments');
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/skipMetadataCreationPage', 'false', 2, 9103, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/skipMetadataCreationPage');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadata/edit/supportedFileMimetypes', '*/*', 0, 9107, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadata/edit/supportedFileMimetypes');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'metadata/zipExport/attachmentsSizeLimit', NULL, 1, 12700, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'metadata/zipExport/attachmentsSizeLimit');

-- Schema that GeoNetwork 4.4.13 expects and that upstream leaves to Hibernate
-- (hibernate.hbm2ddl.auto=update). Created here so the script does not depend on GeoNetwork
-- starting first, and so it also works when Hibernate only validates the schema.
ALTER TABLE groups ADD COLUMN IF NOT EXISTS type varchar(255);

CREATE SEQUENCE IF NOT EXISTS anonymous_access_link_id_seq START WITH 100 INCREMENT BY 1;
ALTER SEQUENCE anonymous_access_link_id_seq OWNER TO "geonetwork";
CREATE TABLE IF NOT EXISTS anonymousaccesslink
(
  id           integer      NOT NULL CONSTRAINT anonymousaccesslink_pkey PRIMARY KEY,
  hash         varchar(255),
  metadataid   integer      NOT NULL,
  metadatauuid varchar(255) CONSTRAINT uk_rx48y1s1cjn8f27iwemxsrnty UNIQUE
);
ALTER TABLE anonymousaccesslink OWNER TO "geonetwork";

UPDATE groups SET type='RecordPrivilege' WHERE id<2 AND type IS NULL;
UPDATE groups SET type='Workspace' WHERE id>=2 AND type IS NULL;

UPDATE Settings SET value='4.4.10' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';


UPDATE settings_ui
SET configuration = replace(
  configuration,
  '"gn-recordview-manage-menu"',
  '"gn-recordview-manage-menu","gn-recordview-download-menu"'
                    )
WHERE configuration LIKE '%"gn-recordview-manage-menu"%'
  AND configuration NOT LIKE '%"gn-recordview-download-menu"%';

UPDATE Settings SET value='4.4.11' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';



INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/csw/getRecordsIgnoreMetadataNotSupported', 'true', 2, 1321, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/oai/enable', 'true', 2, 7000, 'n'  from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/oai/enable');

UPDATE Settings SET value='4.4.12' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';

DROP SEQUENCE IF EXISTS files_id_seq;
DROP TABLE IF EXISTS files;

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadataprivs/publication/managepublicationdate', 'true', 2, 9182, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadataprivs/publication/managepublicationdate');
UPDATE Settings SET position=9183 WHERE name='system/metadataprivs/publication/notificationLevel';
UPDATE Settings SET position=9184 WHERE name='system/metadataprivs/publication/notificationGroups';

ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showOnNonApproved boolean DEFAULT true NOT NULL;
ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showOnApproved boolean DEFAULT true NOT NULL;
ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showWhenWorkflowDisabled boolean DEFAULT true NOT NULL;

-- Move the force validation on save setting out of the workflow section so it
-- can also be used when the metadata approval workflow is disabled.
UPDATE Settings SET name='metadata/save/forceValidationOnMdSave', position = 12005 WHERE name='metadata/workflow/forceValidationOnMdSave';

-- Move the allow publication of invalid metadata setting out of the workflow
-- section as it is a publication concern, not linked to the approval workflow.
UPDATE Settings SET name='metadata/publication/allowPublishInvalidMd', position = 12023 WHERE name='metadata/workflow/allowPublishInvalidMd';

-- Move the automatic unpublication of invalid metadata setting out of the
-- workflow section as it is a publication concern, not linked to the approval workflow.
UPDATE Settings SET name='metadata/publication/automaticUnpublishInvalidMd', position = 12024 WHERE name='metadata/workflow/automaticUnpublishInvalidMd';


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/publication/enableScheduledPublication', 'true', 2, 12023, 'n');

ALTER TABLE MetadataFileUploads ADD COLUMN IF NOT EXISTS resourceaccess VARCHAR(1);
ALTER TABLE MetadataFileUploads ADD COLUMN IF NOT EXISTS mimetype VARCHAR(255);
ALTER TABLE MetadataFileUploads ALTER COLUMN fileName TYPE VARCHAR(1024);

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadata/recordCreationDateFromXml', 'false', 2, 9190, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadata/recordCreationDateFromXml');

UPDATE Settings SET value='4.4.13' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';

-- 1. reportingObligations (EEA thesaurus: Eionet reporting obligations, #255)
INSERT INTO ogcapi_field_mapping
    (config_id, sort_order, ogc_property, elastic_property, index_record_property,
     type_override, is_sortable, is_queryable, add_property_to_output)
SELECT 'property-mapping',
       (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM ogcapi_field_mapping WHERE config_id = 'property-mapping'),
       'reportingObligations', 'th_rod-eionet-europa-eu.default',
       'keywordByThesaurus.["th_rod-eionet-europa-eu"].[*].properties.["default"]',
       'LIST_STRING', false, true, true
WHERE EXISTS (SELECT 1 FROM ogcapi_property_mapping WHERE id = 'property-mapping')
  AND NOT EXISTS (SELECT 1 FROM ogcapi_field_mapping
                  WHERE config_id = 'property-mapping' AND ogc_property = 'reportingObligations');

INSERT INTO ogcapi_facet_config
    (field_mapping_id, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction,
     bucket_count, minimum_document_count)
SELECT fm.id, 0, 'reportingObligations', 'TERM', 'COUNT', 'DESCENDING', 150, 1
FROM ogcapi_field_mapping fm
WHERE fm.config_id = 'property-mapping' AND fm.ogc_property = 'reportingObligations'
  AND NOT EXISTS (SELECT 1 FROM ogcapi_facet_config fc
                  WHERE fc.field_mapping_id = fm.id AND fc.facet_name = 'reportingObligations');

-- 2. eeaTopics (EEA thesaurus: EEA topics, #256)
INSERT INTO ogcapi_field_mapping
    (config_id, sort_order, ogc_property, elastic_property, index_record_property,
     type_override, is_sortable, is_queryable, add_property_to_output)
SELECT 'property-mapping',
       (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM ogcapi_field_mapping WHERE config_id = 'property-mapping'),
       'eeaTopics', 'th_eea-topics.default',
       'keywordByThesaurus.["th_eea-topics"].[*].properties.["default"]',
       'LIST_STRING', false, true, true
WHERE EXISTS (SELECT 1 FROM ogcapi_property_mapping WHERE id = 'property-mapping')
  AND NOT EXISTS (SELECT 1 FROM ogcapi_field_mapping
                  WHERE config_id = 'property-mapping' AND ogc_property = 'eeaTopics');

INSERT INTO ogcapi_facet_config
    (field_mapping_id, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction,
     bucket_count, minimum_document_count)
SELECT fm.id, 0, 'eeaTopics', 'TERM', 'COUNT', 'DESCENDING', 50, 1
FROM ogcapi_field_mapping fm
WHERE fm.config_id = 'property-mapping' AND fm.ogc_property = 'eeaTopics'
  AND NOT EXISTS (SELECT 1 FROM ogcapi_facet_config fc
                  WHERE fc.field_mapping_id = fm.id AND fc.facet_name = 'eeaTopics');

-- 3. gemetKeywords (GEMET hierarchy: group^theme^term paths, #257)
INSERT INTO ogcapi_field_mapping
    (config_id, sort_order, ogc_property, elastic_property, index_record_property,
     type_override, is_sortable, is_queryable, add_property_to_output)
SELECT 'property-mapping',
       (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM ogcapi_field_mapping WHERE config_id = 'property-mapping'),
       'gemetKeywords', 'th_gemet_tree.default',
       'keywordHierarchyByThesaurus.["th_gemet_tree"].defaultTexts',
       'LIST_STRING', false, true, true
WHERE EXISTS (SELECT 1 FROM ogcapi_property_mapping WHERE id = 'property-mapping')
  AND NOT EXISTS (SELECT 1 FROM ogcapi_field_mapping
                  WHERE config_id = 'property-mapping' AND ogc_property = 'gemetKeywords');

INSERT INTO ogcapi_facet_config
    (field_mapping_id, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction,
     bucket_count, minimum_document_count)
SELECT fm.id, 0, 'gemetKeywords', 'TERM', 'COUNT', 'DESCENDING', 500, 1
FROM ogcapi_field_mapping fm
WHERE fm.config_id = 'property-mapping' AND fm.ogc_property = 'gemetKeywords'
  AND NOT EXISTS (SELECT 1 FROM ogcapi_facet_config fc
                  WHERE fc.field_mapping_id = fm.id AND fc.facet_name = 'gemetKeywords');

-- 4. eeaBusinessDomain (EEA business domains thesaurus, subdomain keywords and their domains)
INSERT INTO ogcapi_field_mapping
    (config_id, sort_order, ogc_property, elastic_property, index_record_property,
     type_override, is_sortable, is_queryable, add_property_to_output)
SELECT 'property-mapping',
       (SELECT COALESCE(MAX(sort_order), -1) + 1 FROM ogcapi_field_mapping WHERE config_id = 'property-mapping'),
       'eeaBusinessDomain', 'th_eea-business-domains_tree.default',
       'keywordHierarchyByThesaurus.["th_eea-business-domains_tree"].defaultTexts',
       'LIST_STRING', false, true, true
WHERE EXISTS (SELECT 1 FROM ogcapi_property_mapping WHERE id = 'property-mapping')
  AND NOT EXISTS (SELECT 1 FROM ogcapi_field_mapping
                  WHERE config_id = 'property-mapping' AND ogc_property = 'eeaBusinessDomain');

INSERT INTO ogcapi_facet_config
    (field_mapping_id, sort_order, facet_name, facet_type, bucket_sorting, bucket_sorting_direction,
     bucket_count, minimum_document_count)
SELECT fm.id, 0, 'eeaBusinessDomain', 'TERM', 'COUNT', 'DESCENDING', 100, 1
FROM ogcapi_field_mapping fm
WHERE fm.config_id = 'property-mapping' AND fm.ogc_property = 'eeaBusinessDomain'
  AND NOT EXISTS (SELECT 1 FROM ogcapi_facet_config fc
                  WHERE fc.field_mapping_id = fm.id AND fc.facet_name = 'eeaBusinessDomain');
