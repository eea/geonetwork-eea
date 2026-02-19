
-- SELECT * FROM metadata WHERE data LIKE '%https://sdi.eea.europa.eu/geonetwork/srv/api/records%';

UPDATE metadata SET data = replace(data,
                                   'https://sdi.eea.europa.eu/geonetwork/srv/api/records',
                                   'https://sdi.eea.europa.eu/catalogue/srv/api/records')
WHERE data LIKE '%https://sdi.eea.europa.eu/geonetwork/srv/api/records%';
