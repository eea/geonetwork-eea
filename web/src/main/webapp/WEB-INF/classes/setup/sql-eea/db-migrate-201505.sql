ALTER TABLE ServiceParameters ADD COLUMN occur varchar(1) default '+';
UPDATE ServiceParameters SET occur='+';

create sequence serviceparameter_id_seq start with 1 increment by 1;
alter table serviceparameters add column id integer;
UPDATE serviceparameters SET ID=nextval('serviceparameter_id_seq');

ALTER TABLE SERVICEPARAMETERS ADD PRIMARY KEY (id);


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/proxy/ignorehostlist', NULL, 0, 560, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atom', 'disabled', 0, 7230, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atomSchedule', '0 0 0/24 ? * *', 0, 7240, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atomProtocol', 'INSPIRE-ATOM', 0, 7250, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadata/prefergrouplogo', 'true', 2, 9111, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('map/isMapViewerEnabled', 'true', 2, 9592, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadata/allThesaurus', 'false', 2, 9160, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/ui/defaultView', 'default', 0, 10100, 'n');

INSERT INTO settings (name, value, datatype, position, internal) VALUES ('system/server/log','log4j.xml',0,250,'y');


DELETE FROM settings WHERE name LIKE 'system/csw/contactInfo/%';
DELETE FROM settings WHERE name = 'system/csw/individualName';
DELETE FROM settings WHERE name = 'system/csw/positionName';
DELETE FROM settings WHERE name = 'system/csw/role';
DELETE FROM settings WHERE name = 'system/csw/title';
DELETE FROM settings WHERE name = 'system/csw/abstract';
DELETE FROM settings WHERE name = 'system/csw/accessConstraints';
DELETE FROM settings WHERE name = 'system/csw/fees';

UPDATE Settings SET value='3.0.1' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';


-- Drop unsupported metadata schema
DELETE FROM operationallowed WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadatarating WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadatafiledownloads WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadatafileuploads WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadatanotifications WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadatastatus WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM validation WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std'));
DELETE FROM metadata WHERE schemaid in ('iso19115', 'fgdc-std');
