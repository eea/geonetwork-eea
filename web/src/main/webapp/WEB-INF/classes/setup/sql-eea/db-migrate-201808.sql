INSERT INTO Settings (name, value, datatype, position, internal) VALUES
  ('system/eea/templateapi', 'true', 2, 9990, 'y');

UPDATE Settings SET value='3.4.3' WHERE name='system/platform/version';

