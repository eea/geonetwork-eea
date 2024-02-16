-- SELECT id, name FROM groups;
-- SELECT id FROM groups WHERE name = 'datahub';
-- SELECT id FROM groups WHERE name = 'SDI_INTERNAL';


-- Assign all records (groupowner) from DataHub and SDI_GUEST to SDI_INTERNAL
UPDATE metadata SET groupowner = (SELECT id FROM groups WHERE name = 'SDI_INTERNAL')
WHERE groupowner = (SELECT id FROM groups WHERE name = 'datahub');

UPDATE metadata SET groupowner = (SELECT id FROM groups WHERE name = 'SDI_INTERNAL')
WHERE groupowner = (SELECT id FROM groups WHERE name = 'SDI_GUEST');

-- Check
-- SELECT count(*) FROM metadata WHERE groupowner = (SELECT id FROM groups WHERE name = 'datahub');

-- Move also subtemplates from all to SDI_INTERNAL
UPDATE metadata SET groupowner = (SELECT id FROM groups WHERE name = 'SDI_INTERNAL')
WHERE groupowner = (SELECT id FROM groups WHERE name = 'all');


-- Privileges changes
-- Publish records that are only published in datahub in SDI_INTERNAL group
INSERT INTO operationallowed (groupid, metadataid, operationid)
SELECT (SELECT id FROM groups WHERE name = 'SDI_INTERNAL'), metadataid, 0 FROM (
   SELECT distinct(metadataid) FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'datahub')
   EXCEPT
   SELECT distinct(metadataid) FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'SDI_INTERNAL'))
   AS d;

-- Same for SDI_GUEST
INSERT INTO operationallowed (groupid, metadataid, operationid)
SELECT (SELECT id FROM groups WHERE name = 'SDI_INTERNAL'), metadataid, 0 FROM (
   SELECT distinct(metadataid) FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'SDI_GUEST')
   EXCEPT
   SELECT distinct(metadataid) FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'SDI_INTERNAL'))
   AS d;


-- Remove privileges related to the datahub, SDI_GUEST and GUEST group
DELETE FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'datahub');
DELETE FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'SDI_GUEST');
DELETE FROM operationallowed WHERE groupid = (SELECT id FROM groups WHERE name = 'GUEST');

-- Delete datahub group
DELETE FROM groupsdes WHERE iddes = (SELECT id FROM groups WHERE name = 'datahub');
DELETE FROM usergroups WHERE groupid = (SELECT id FROM groups WHERE name = 'datahub');
DELETE FROM groups WHERE name = 'datahub';
-- DELETE FROM groupsdes WHERE iddes = (SELECT id FROM groups WHERE name = 'SDI_GUEST');
-- DELETE FROM groups WHERE name = 'SDI_GUEST';
DELETE FROM groupsdes WHERE iddes = (SELECT id FROM groups WHERE name = 'GUEST');
DELETE FROM groups WHERE name = 'GUEST';