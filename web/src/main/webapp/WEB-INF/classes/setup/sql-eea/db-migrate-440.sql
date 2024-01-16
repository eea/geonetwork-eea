ALTER TABLE files
ALTER COLUMN content type oid USING content::oid;

ALTER TABLE settings
ALTER COLUMN internal  type char;

ALTER TABLE settings
ALTER COLUMN internal SET  DEFAULT 'y';

-- From 4.4.1
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'metadata/pdfReport/headerLogoFileName', '', 0, 12508, 'y' FROM settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'metadata/pdfReport/headerLogoFileName');

-- From 4.4.2
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('region/getmap/useGeodesicExtents', 'false', 2, 9591, 'n');
  
UPDATE Settings SET value='4.4.2' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
