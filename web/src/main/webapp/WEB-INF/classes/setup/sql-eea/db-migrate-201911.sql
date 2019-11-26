-- Remove DOWNLOAD operation for group INTERNET to not display SDI dataset links to anonymous users.
DELETE FROM operationallowed WHERE groupid = 1 AND operationid = 1;

-- Remove all operation for group INTRANET.
DELETE FROM operationallowed WHERE groupid = 0;

-- Set VIEW/VISUALIZE/DOWNLOAD operation for group INTRANET for all public records
INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 0, id, 0 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 0, id, 1 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 0, id, 5 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);



UPDATE metadata SET data = replace(data, 'ISO 19115:2003/19139', 'ISO 19115/19139') WHERE data LIKE '%ISO 19115:2003/19139%';

UPDATE metadata SET data = replace(data, 'http://sdi.eea.europa.eu/internal-catalogue', 'https://sdi.eea.europa.eu/catalogue') WHERE data LIKE '%http://sdi.eea.europa.eu/internal-catalogue%';

UPDATE metadata SET data = replace(data, '/internal-catalogue', '/catalogue') WHERE data LIKE '%/internal-catalogue%';


UPDATE metadata SET data = replace(data, 'http://bio.discomap.eea.europa.eu', 'https://bio.discomap.eea.europa.eu') WHERE data LIKE '%http://bio.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://land.discomap.eea.europa.eu', 'https://land.discomap.eea.europa.eu') WHERE data LIKE '%http://land.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://water.discomap.eea.europa.eu', 'https://water.discomap.eea.europa.eu') WHERE data LIKE '%http://water.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://discomap.eea.europa.eu', 'https://discomap.eea.europa.eu') WHERE data LIKE '%http://discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://image.discomap.eea.europa.eu', 'https://image.discomap.eea.europa.eu') WHERE data LIKE '%http://image.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://marine.discomap.eea.europa.eu', 'https://marine.discomap.eea.europa.eu') WHERE data LIKE '%http://marine.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://test.discomap.eea.europa.eu', 'https://test.discomap.eea.europa.eu') WHERE data LIKE '%http://test.discomap.eea.europa.eu%';
UPDATE metadata SET data = replace(data, 'http://staging.discomap.eea.europa.eu', 'https://staging.discomap.eea.europa.eu') WHERE data LIKE '%http://staging.discomap.eea.europa.eu%';






-- Rename sample to SDI_INTERNAL
UPDATE groups SET name = 'SDI_INTERNAL' WHERE id = 2;
UPDATE groupsdes SET label = 'SDI_INTERNAL' WHERE iddes = 2;

-- Move any records attached to Maps and ETC/ULS group to SDI_INTERNAL
UPDATE metadata SET groupowner = 2 WHERE groupowner = 1069710;
UPDATE metadata SET groupowner = 2 WHERE groupowner = 1069862;

-- User searches may have to be reassigned to groups manually?

-- Removing existing Maps group
DELETE FROM operationallowed WHERE groupid = 1069710;
DELETE FROM usergroups WHERE groupid = 1069710;
DELETE FROM group_category WHERE group_id = 1069710;
DELETE FROM usersearch_group WHERE group_id = 1069710;
DELETE FROM groupsdes WHERE iddes = 1069710;
DELETE FROM groups WHERE id = 1069710;

-- Removing existing ETC/ULS group
DELETE FROM operationallowed WHERE groupid = 1069862;
DELETE FROM usergroups WHERE groupid = 1069862;
DELETE FROM group_category WHERE group_id = 1069862;
DELETE FROM usersearch_group WHERE group_id = 1069862;
DELETE FROM groupsdes WHERE iddes = 1069862;
DELETE FROM groups WHERE id = 1069862;


-- Create new groups
-- one for all users connected to the catalogue
INSERT INTO Groups (id, name, description, email, referrer)
    VALUES (1069710,'SDI_GUEST','Default group for guest users that are allowed to connect in the catalog if in EOINET LDAP.',NULL,NULL);
INSERT INTO GroupsDes (iddes, langid, label) VALUES (1069710,'eng','SDI_GUEST');

-- one for future users doing editing work (for the time being - not used)
INSERT INTO Groups (id, name, description, email, referrer)
    VALUES (1069862,'SDI_EDITING_DEFAULT','Group for elaborating metadata records. Once validated records will move to the SDI_INTERNAL groups',NULL,NULL);
INSERT INTO GroupsDes (iddes, langid, label) VALUES (1069862,'eng','SDI_EDITING_DEFAULT');


-- All Guest are now RegisteredUser (So we will have only Administrator and RegisterdUser - only admin can edit).
UPDATE users SET profile = 4 WHERE profile = 5;
-- Reset all user groups
DELETE FROM usergroups;
-- All non admin users are RegisteredUser in SDI_GUEST group
INSERT INTO usergroups (userid, groupid, profile) SELECT id, 1069710, 4 FROM users WHERE profile != 0;


-- Member of SDI_GUEST, Set operation view/download/dynamic on all public records
-- This means that when connected, user will see all filtered information (webdav links, EEA keywords, ...) for public records
INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 1069710, id, 0 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 1069710, id, 1 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 1069710, id, 5 FROM metadata WHERE isTemplate = 'n' AND id IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);


-- Check how many records are not published
SELECT count(*) FROM metadata WHERE id NOT IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);
-- Should be less or equal than records published in SDI INTERNAL
SELECT count(*) FROM metadata WHERE id IN (SELECT metadataid FROM operationallowed WHERE groupid = 2 AND operationid = 0);


CREATE TABLE privateRecords AS SELECT id FROM metadata WHERE id NOT IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);

DELETE FROM operationallowed WHERE groupid = 2;
INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 2, id, 0 FROM metadata WHERE id IN (SELECT id FROM privateRecords);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 2, id, 1 FROM metadata WHERE id IN (SELECT id FROM privateRecords);

INSERT INTO operationallowed (groupid, metadataid, operationid)
  SELECT 2, id, 5 FROM metadata WHERE id IN (SELECT id FROM privateRecords);

DROP TABLE privateRecords;


-- Those records are published in the SDI_INTERNAL group
-- This means that only admin can see them.
-- INSERT INTO operationallowed (groupid, metadataid, operationid)
--   SELECT 2, id, 0 FROM metadata WHERE isTemplate = 'n' AND id NOT IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);
--
-- INSERT INTO operationallowed (groupid, metadataid, operationid)
--   SELECT 2, id, 1 FROM metadata WHERE isTemplate = 'n' AND id NOT IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);
--
-- INSERT INTO operationallowed (groupid, metadataid, operationid)
--   SELECT 2, id, 5 FROM metadata WHERE isTemplate = 'n' AND id NOT IN (SELECT metadataid FROM operationallowed WHERE groupid = 1 AND operationid = 0);
