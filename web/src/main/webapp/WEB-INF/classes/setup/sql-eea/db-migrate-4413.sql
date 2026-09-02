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


INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/publication/doi/doimailnotification', 'false', 2, 100192, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/publication/doi/doimailnotification');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/publishForGroupEditors', 'false', 2, 9101, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/publishForGroupEditors');
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/copyAttachments', 'true', 2, 9102, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/copyAttachments');
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadatacreate/skipMetadataCreationPage', 'false', 2, 9103, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadatacreate/skipMetadataCreationPage');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadata/edit/supportedFileMimetypes', '*/*', 0, 9107, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadata/edit/supportedFileMimetypes');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'metadata/zipExport/attachmentsSizeLimit', NULL, 1, 12700, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'metadata/zipExport/attachmentsSizeLimit');

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

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadataprivs/publication/managepublicationdate', 'false', 2, 9182, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/metadataprivs/publication/managepublicationdate');
UPDATE Settings SET position=9183 WHERE name='system/metadataprivs/publication/notificationLevel';
UPDATE Settings SET position=9184 WHERE name='system/metadataprivs/publication/notificationGroups';

ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showOnNonApproved boolean DEFAULT true NOT NULL;
ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showOnApproved boolean DEFAULT true NOT NULL;
ALTER TABLE spg_page ADD COLUMN IF NOT EXISTS showWhenWorkflowDisabled boolean DEFAULT true NOT NULL;

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/publication/enableScheduledPublication', 'true', 2, 12023, 'n');

ALTER TABLE MetadataFileUploads ADD COLUMN IF NOT EXISTS resourceaccess VARCHAR(1);
ALTER TABLE MetadataFileUploads ADD COLUMN IF NOT EXISTS mimetype VARCHAR(255);
ALTER TABLE MetadataFileUploads ALTER COLUMN fileName TYPE VARCHAR(1024);

UPDATE Settings SET value='4.4.13' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
