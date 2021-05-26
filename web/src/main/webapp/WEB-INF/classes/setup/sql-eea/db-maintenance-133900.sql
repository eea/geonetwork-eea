-- WITH ns AS (
--     select ARRAY[ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
--     ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
--     ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n
--     )
--
-- SELECT concat('UPDATE metadata SET data = replace(data, ''', distance, ''', ''', distance, ''' WHERE data LIKE ''%', distance, '%'')') FROM (
--     SELECT uuid,
--         replace(
--             unnest(
--                 xpath('//gco:Distance', XMLPARSE(DOCUMENT data), n))::text,
--                  'xmlns:gco="http://www.isotc211.org/2005/gco" ', '') as distance
--     FROM metadata, ns
--              WHERE data LIKE '%%' AND isharvested = 'n' ORDER BY 1) AS s GROUP BY distance;



UPDATE metadata SET data = replace(data, '<gco:Distance uom="m">5000</gco:Distance>', '<gco:Distance uom="km">5</gco:Distance>') WHERE data LIKE '%<gco:Distance uom="m">5000</gco:Distance>%';
UPDATE metadata SET data = replace(data, '<gco:Distance uom="m">1000</gco:Distance>', '<gco:Distance uom="km">1</gco:Distance>') WHERE data LIKE '%<gco:Distance uom="m">1000</gco:Distance>%';
UPDATE metadata SET data = replace(data, '<gco:Distance uom="m">10000</gco:Distance>', '<gco:Distance uom="km">10</gco:Distance>') WHERE data LIKE '%<gco:Distance uom="m">10000</gco:Distance>%';
UPDATE metadata SET data = replace(data, '<gco:Distance uom="m">100000</gco:Distance>', '<gco:Distance uom="km">100</gco:Distance>') WHERE data LIKE '%<gco:Distance uom="m">100000</gco:Distance>%';
UPDATE metadata SET data = replace(data, '<gco:Distance uom="k">1</gco:Distance>', '<gco:Distance uom="km">1</gco:Distance>') WHERE data LIKE '%<gco:Distance uom="k">1</gco:Distance>%';
