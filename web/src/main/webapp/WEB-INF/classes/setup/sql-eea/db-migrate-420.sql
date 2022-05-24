INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doipublicurl', '', 0, 100196, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvester/enablePrivilegesManagement', 'false', 2, 9010, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/localrating/notificationLevel', 'catalogueAdministrator', 0, 2111, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadatacreate/preferredGroup', '', 1, 9105, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadatacreate/preferredTemplate', '', 0, 9106, 'n');

DELETE FROM Settings WHERE name = 'system/server/securePort';

UPDATE Settings SET value = '0 0 0 * * ?' WHERE name = 'system/inspire/atomSchedule' and value = '0 0 0/24 ? * *';


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/csvReport/csvName', 'metadata_{datetime}.csv', 0, 12607, 'n');

UPDATE Settings set position = 7213 WHERE name = 'system/inspire/remotevalidation/nodeid';
UPDATE Settings set position = 7214 WHERE name = 'system/inspire/remotevalidation/apikey';
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/remotevalidation/urlquery', '', 0, 7212, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/import/userprofile', 'Editor', 0, 12001, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/security/password/allowAdminReset', 'false', 2, 12004, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/link/excludedUrlPattern', '', 0, 12010, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadata/thesaurusNamespace', 'https://registry.geonetwork-opensource.org/{{type}}/{{filename}}', 0, 9161, 'n');

UPDATE Settings SET editable = 'n' WHERE name = 'system/userFeedback/lastNotificationDate';
UPDATE Settings SET editable = 'n' WHERE name = 'system/security/passwordEnforcement/pattern';

UPDATE Settings SET internal = 'n' WHERE name = 'system/metadata/prefergrouplogo';

UPDATE Settings SET value='4.2.0' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';
