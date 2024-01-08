UPDATE metadata SET data = replace(data, 'clms-prod.eea.europa.eu', 'land.copernicus.eu') WHERE data like '%clms-prod.eea.europa.eu%';

-- Check SELECT count(*) FROM metadata WHERE data like '%clms-prod.eea.europa.eu%'; = 0
