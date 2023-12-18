alter table files
alter column content type oid using content::oid;

alter table settings
alter column internal char default 'y'

UPDATE Settings SET value='4.4.2' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
