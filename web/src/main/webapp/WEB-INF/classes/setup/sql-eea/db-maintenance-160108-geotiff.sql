SELECT count(*)
FROM metadata
WHERE (data LIKE '%GTIFF%' OR data LIKE '%GTiff%' OR data LIKE '%geoTiff%' OR data LIKE '%GeoTiff%' OR data LIKE '%Geotiff%' OR data LIKE '%Gtiff%')
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'GTIFF', 'GeoTIFF')
WHERE data LIKE '%GTIFF%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'GTiff', 'GeoTIFF')
WHERE data LIKE '%GTiff%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'Gtiff', 'GeoTIFF')
WHERE data LIKE '%Gtiff%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'geoTiff', 'GeoTIFF')
WHERE data LIKE '%geoTiff%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'Geotiff', 'GeoTIFF')
WHERE data LIKE '%Geotiff%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, 'GeoTiff', 'GeoTIFF')
WHERE data LIKE '%GeoTiff%'
  AND isHarvested = 'n';
