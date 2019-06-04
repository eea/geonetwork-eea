-- Copy the current UI setting
INSERT INTO Settings_ui (id, configuration) (SELECT 'srv', value FROM Settings WHERE name = 'ui/config');
DELETE FROM Settings WHERE name = 'ui/config';


-- Remove deprecated (and  unused) ISO19115-3 schema.
DELETE FROM operationallowed WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadatarating WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadatafiledownloads WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadatafileuploads WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadatanotifications WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadatastatus WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM validation WHERE metadataid in (SELECT id FROM metadata WHERE schemaid in ('iso19115-3'));
DELETE FROM metadata WHERE schemaid in ('iso19115-3');

DELETE FROM schematrondes WHERE iddes in (SELECT id FROM schematron WHERE schemaname in ('iso19115-3'));
DELETE FROM schematroncriteria WHERE group_schematronid in (SELECT id FROM schematron WHERE schemaname in ('iso19115-3'));
DELETE FROM schematroncriteriagroup WHERE schematronid in (SELECT id FROM schematron WHERE schemaname in ('iso19115-3'));
DELETE FROM schematron WHERE schemaname in ('iso19115-3');


UPDATE Settings SET value='3.7.0' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
