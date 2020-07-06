
DELETE FROM cswservercapabilitiesinfo;
DELETE FROM Settings WHERE name = 'system/csw/contactId';
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/csw/capabilityRecordUuid', '-1', 0, 1220, 'y');


UPDATE metadata SET data = replace(data, 'gmd:URL>/local/', 'gmd:URL>https://sdi.eea.europa.eu/webdav/local/') WHERE data LIKE '%gmd:URL>/local/%';
UPDATE metadata SET data = replace(data, 'gmd:URL>/continental/', 'gmd:URL>https://sdi.eea.europa.eu/webdav/continental/') WHERE data LIKE '%gmd:URL>/continental/%';
UPDATE metadata SET data = replace(data, 'gmd:URL>/global/', 'gmd:URL>https://sdi.eea.europa.eu/webdav/global/') WHERE data LIKE '%gmd:URL>/global/%';
UPDATE metadata SET data = replace(data, 'gmd:URL>---LINK TO THE FILE PATH', 'gmd:URL>https://sdi.eea.europa.eu/webdav/---LINK TO THE FILE PATH') WHERE data LIKE '%gmd:URL>---LINK TO THE FILE PATH%';



UPDATE Settings SET value='3.10.3' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
