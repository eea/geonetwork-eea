

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doienabled', 'false', 2, 191, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doiurl', '', 0, 192, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doiusername', '', 0, 193, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doipassword', '', 0, 194, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doikey', '', 0, 195, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/publication/doi/doilandingpagetemplate', 'http://localhost:8080/geonetwork/srv/resources/records/{{uuid}}', 0, 195, 'n');


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadata/history/enabled', 'true', 2, 9171, 'n');



ALTER TABLE StatusValues ADD type varchar(255);
ALTER TABLE StatusValues ADD notificationLevel varchar(255);


UPDATE StatusValues SET type = 'workflow';

UPDATE StatusValues SET notificationLevel = 'recordUserAuthor' WHERE name = 'approved';
UPDATE StatusValues SET notificationLevel = 'recordUserAuthor' WHERE name = 'retired';
UPDATE StatusValues SET notificationLevel = 'recordProfileReviewer' WHERE name = 'submitted';
UPDATE StatusValues SET notificationLevel = 'recordUserAuthor' WHERE name = 'rejected';


-- INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (100,'doiCreationTask','n', 100, 'task', 'statusUserOwner');


INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (50,'recordcreated','y', 50, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (51,'recordupdated','y', 51, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (52,'attachmentadded','y', 52, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (53,'attachmentdeleted','y', 53, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (54,'recordownerchange','y', 54, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (55,'recordgroupownerchange','y', 55, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (56,'recordprivilegeschange','y', 56, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (57,'recordcategorychange','y', 57, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (58,'recordvalidationtriggered','y', 58, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (59,'recordstatuschange','y', 59, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (60,'recordprocessingchange','y', 60, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (61,'recorddeleted','y', 61, 'event', null);
INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (62,'recordimported','y', 62, 'event', null);


INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (50,'eng','Record created.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (51,'eng','Record updated.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (52,'eng','Attachment {{h.currentStatus}} added.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (53,'eng','Attachment {{h.previousStatus}} deleted.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (54,'eng','Owner changed from {{h.previousStatus}} to {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (55,'eng','Group owner changed from {{h.previousStatus}} to {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (56,'eng','Privileges updated.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (57,'eng','Category changed. Now categories are {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (58,'eng','Validation triggered. Exit status is now {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (59,'eng','Status changed from {{h.previousStatus}} to {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (60,'eng','Record updated by process {{h.currentStatus}}.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (61,'eng','Record deleted.');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (62,'eng','Record imported.');
-- INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (100,'eng','DOI creation request');


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/vcs/enable', 'false', 2, 9161, 'n');


UPDATE Schematron SET filename = 'schematron-rules-url-check.xsl' WHERE filename = 'schematron-rules-url-check.report_only.xsl';
UPDATE Schematron SET filename = 'schematron-rules-inspire-sds.xsl' WHERE filename = 'schematron-rules-inspire-sds.disabled.xsl';
UPDATE Schematron SET filename = 'schematron-rules-inspire-strict.xsl' WHERE filename = 'schematron-rules-inspire-strict.disabled.xsl';
UPDATE Schematron SET filename = 'schematron-rules-inspire-sds.xsl' WHERE filename = 'schematron-rules-inspire-sds.xsl';
UPDATE Schematron SET filename = 'schematron-rules-inspire.xsl' WHERE filename = 'schematron-rules-inspire.disabled.xsl';

UPDATE metadata SET data = replace(data, '>GEMET - Themes, version 2.4<', '>GEMET<') WHERE  data LIKE '%>GEMET - Themes, version 2.4<%';
UPDATE metadata SET data = replace(data, '>GEMET - Themes, version 3.0<', '>GEMET<') WHERE  data LIKE '%>GEMET - Themes, version 2.4<%';


UPDATE Settings SET value='3.6.0' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';

