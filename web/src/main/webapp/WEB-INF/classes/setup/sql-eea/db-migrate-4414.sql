ALTER TABLE ogcapi_facet_config
  ADD COLUMN IF NOT EXISTS hard_bounds_min VARCHAR(50),
  ADD COLUMN IF NOT EXISTS hard_bounds_max VARCHAR(50);

UPDATE Settings SET value='4.4.14' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
