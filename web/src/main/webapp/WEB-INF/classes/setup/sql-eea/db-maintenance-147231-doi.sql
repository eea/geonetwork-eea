INSERT INTO StatusValues (id, name, reserved, displayorder, type, notificationLevel) VALUES  (100,'doiCreationTask','n', 100, 'task', 'statusUserOwner');
INSERT INTO StatusValuesDes  (iddes, langid, label) VALUES (100,'eng','DOI creation request');

UPDATE Settings SET value='4.2.5' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
