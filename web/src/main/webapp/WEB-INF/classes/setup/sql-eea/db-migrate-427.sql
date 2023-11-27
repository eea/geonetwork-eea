-- From 4.2.6
INSERT INTO Settings (name, value, datatype, position, internal) SELECT distinct 'metadata/batchediting/accesslevel', 'Editor', 0, 12020, 'n' from settings WHERE NOT EXISTS (SELECT name FROM Settings WHERE name = 'metadata/batchediting/accesslevel');

-- From 4.2.7
UPDATE Settings SET value='4.2.7' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';
