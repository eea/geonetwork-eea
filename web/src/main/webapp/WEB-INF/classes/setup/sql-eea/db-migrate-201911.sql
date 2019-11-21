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
