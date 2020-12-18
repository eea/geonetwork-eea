
-- Set default timezone to UTC if not set.
UPDATE Settings SET value = 'Europe/Copenhagen' WHERE name = 'system/server/timeZone';

-- * Server timezone setting = DB timezone = UTC = Nothing to update. Will only add Z
-- 2020-10-29T16:11:55 > 2020-10-29T16:11:55Z
-- * Server timezone setting != UTC.
-- Shift old DB dates from server timezone to UTC
-- eg. for CET
-- UPDATE metadata SET (createdate, changedate) = (
--        to_char(
--            timezone('UTC',
--         to_timestamp(createDate, 'YYYY-MM-DDThh24:mi:ss')
--         AT TIME ZONE (SELECT value FROM Settings WHERE name = 'system/server/timeZone')), 'YYYY-MM-DDThh24:mi:ssZ'),
--        to_char(
--         timezone('UTC',
--          to_timestamp(changedate, 'YYYY-MM-DDThh24:mi:ss')
--          AT TIME ZONE (SELECT value FROM Settings WHERE name = 'system/server/timeZone')), 'YYYY-MM-DDThh24:mi:ssZ')
--        ) WHERE length(createdate) = 19 AND length(changedate) = 19;


UPDATE Settings SET value='4.0.2' WHERE name='system/platform/version';
UPDATE Settings SET value='0' WHERE name='system/platform/subVersion';
