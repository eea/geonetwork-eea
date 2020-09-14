
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/index/indexingTimeRecordLink', 'false', 2, 9209, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/server/timeZone', '', 0, 260, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/users/identicon', 'gravatar:mp', 0, 9110, 'n');



ALTER TABLE usersearch ALTER COLUMN url TYPE text;




SELECT setval('address_id_seq', (SELECT max(id) + 1 FROM address));
SELECT setval('csw_server_capabilities_info_id_seq', (SELECT max(idfield) FROM cswservercapabilitiesinfo));
SELECT setval('files_id_seq', (SELECT max(id) + 1 FROM files));
SELECT setval('group_id_seq', (SELECT max(id) + 1 FROM groups));
SELECT setval('gufkey_id_seq', (SELECT max(id) + 1 FROM guf_keywords));
SELECT setval('gufrat_id_seq', (SELECT max(id) + 1 FROM guf_rating));
SELECT setval('harvest_history_id_seq', (SELECT max(id) + 1 FROM harvesthistory));
SELECT setval('harvester_setting_id_seq', (SELECT max(id) + 1 FROM harvestersettings));
SELECT setval('inspire_atom_feed_id_seq', (SELECT max(id) + 1 FROM inspireatomfeed));
SELECT setval('iso_language_id_seq', (SELECT max(id) + 1 FROM isolanguages));
SELECT setval('link_id_seq', (SELECT max(id) + 1 FROM links));
SELECT setval('linkstatus_id_seq', (SELECT max(id) + 1 FROM linkstatus));
SELECT setval('mapserver_id_seq', (SELECT max(id) + 1 FROM mapservers));
SELECT setval('metadata_category_id_seq', (SELECT max(id) + 1 FROM categories));
SELECT setval('metadata_filedownload_id_seq', (SELECT max(id) + 1 FROM metadatafiledownloads));
SELECT setval('metadata_fileupload_id_seq', (SELECT max(id) + 1 FROM metadatafileuploads));
SELECT setval('metadata_id_seq', (SELECT max(id) + 1 FROM metadata));
SELECT setval('metadata_identifier_template_id_seq', (SELECT max(id) + 1 FROM metadataidentifiertemplate));
SELECT setval('operation_id_seq', (SELECT max(id) + 1 FROM operations));
SELECT setval('rating_criteria_id_seq', (SELECT max(id) + 1 FROM guf_ratingcriteria));
SELECT setval('schematron_criteria_id_seq', (SELECT max(id) + 1 FROM schematroncriteria));
SELECT setval('schematron_id_seq', (SELECT max(id) + 1 FROM schematron));
SELECT setval('selection_id_seq', (SELECT max(id) + 1 FROM selections));
SELECT setval('status_value_id_seq', (SELECT max(id) + 1 FROM statusvalues));
SELECT setval('user_id_seq', (SELECT max(id) + 1 FROM users));
SELECT setval('user_search_id_seq', (SELECT max(id) + 1 FROM usersearch));



-- Update datashare path

WITH ns AS ( select ARRAY[
                        ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
                        ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
                        ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n)

UPDATE metadata SET data = replace(data, 'https://sdi.eea.europa.eu/data/', 'https://sdi.eea.europa.eu/data/public/') WHERE uuid IN (
    SELECT uuid FROM (
                         SELECT uuid,
                                isharvested,
                                unnest(xpath(
                                        'count(//gmd:MD_Metadata/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier/*/gmd:code/*[contains(text(), "_p_")])',
                                        XMLPARSE(DOCUMENT data), n))::text AS c
                         FROM metadata,
                              ns
                         WHERE data LIKE '%https://sdi.eea.europa.eu/data/%'
                           AND isHarvested = 'n'
                     ) AS subquery WHERE c = '1'
);


WITH ns AS ( select ARRAY[
                        ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
                        ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
                        ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n)

UPDATE metadata SET data = replace(data, 'https://sdi.eea.europa.eu/data/', 'https://sdi.eea.europa.eu/data/restricted/') WHERE uuid IN (
    SELECT uuid FROM (
                         SELECT uuid,
                                isharvested,
                                unnest(xpath(
                                        'count(//gmd:MD_Metadata/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier/*/gmd:code/*[contains(text(), "_p_")])',
                                        XMLPARSE(DOCUMENT data), n))::text AS c
                         FROM metadata,
                              ns
                         WHERE data LIKE '%https://sdi.eea.europa.eu/data/%'
                           AND isHarvested = 'n'
                     ) AS subquery WHERE c = '0'
);



UPDATE Settings SET value='4.0.0' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
