UPDATE metadata
SET data = replace(data, '>GTiff<', '>GeoTIFF<')
WHERE data LIKE '%>GTiff<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>Text<', '>ascii (.csv, .txt, .sql)<')
WHERE data LIKE '%>Text<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>CSV<', '>ascii (.csv, .txt, .sql)<')
WHERE data LIKE '%>CSV<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>Ascii (.csv)<', '>ascii (.csv, .txt, .sql)<')
WHERE data LIKE '%>Ascii (.csv)<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>MDB<', '>Microsoft Access (.mdb, .accdb)<')
WHERE data LIKE '%>MDB<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>Access database<', '>Microsoft Access (.mdb, .accdb)<')
WHERE data LIKE '%>Access database<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>NetCDF<', '>netCDF<')
WHERE data LIKE '%>NetCDF<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>ESRI Shapefile<', '>SHP<')
WHERE data LIKE '%>ESRI Shapefile<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>SpatiaLite<', '>Spatialite<')
WHERE data LIKE '%>SpatiaLite<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>Fgeo<', '>FGeo<')
WHERE data LIKE '%>Fgeo<%'
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '>Gdb<', '>FGeo<')
WHERE data LIKE '%>Gdb<%'
  AND isHarvested = 'n';


