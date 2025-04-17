UPDATE Metadata SET data = replace(data, 'http://standards.iso.org/iso/19115/-3/srv/2.1', 'http://standards.iso.org/iso/19115/-3/srv/2.0') WHERE data LIKE '%http://standards.iso.org/iso/19115/-3/srv/2.1%' AND schemaId = 'iso19115-3.2018';

UPDATE Settings SET value='4.4.4' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';

UPDATE settings SET name='metadata/history/enabled' WHERE name='system/metadata/history/enabled';
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'metadata/history/accesslevel', 'Editor', 0, 12021, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'metadata/history/accesslevel');

UPDATE Settings SET value='4.4.5' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/translation/provider', '', 0, 7301, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/translation/serviceUrl', '', 0, 7302, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/translation/apiKey', '', 0, 7303, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/feedback/languages', '', 0, 646, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/feedback/languages');
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/feedback/translationFollowsText', '', 0, 647, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'system/feedback/translationFollowsText');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userSelfRegistration/domainsAllowed', '', 0, 1911, 'y');

UPDATE Settings SET value='4.4.6' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/banner/enable', 'false', 2, 1920, 'n');

UPDATE Settings SET value='4.4.7' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';

INSERT INTO doiservers (id, name, description, url, publicurl, landingpagetemplate, username, password, pattern, prefix)
SELECT nextval('doiserver_id_seq'), 'Publication Office', '', c.value, d.value, e.value, f.value, null, h.value, i.value FROM
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doiurl') AS c,
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doipublicurl') AS d,
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doilandingpagetemplate') AS e,
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doiusername') AS f,
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doipattern') AS h,
     (SELECT value FROM settings WHERE name = 'system/publication/doi/doikey') AS i;


DELETE FROM settings WHERE name LIKE 'system/publication/doi/%' and name != 'system/publication/doi/doienabled';

INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'system/metadataprivs/userAlwaysCanEditOwnedMetadata', 'false', 2, 9184, 'n' FROM settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name='system/metadataprivs/userAlwaysCanEditOwnedMetadata');

