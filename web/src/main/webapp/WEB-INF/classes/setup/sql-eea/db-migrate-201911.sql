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
