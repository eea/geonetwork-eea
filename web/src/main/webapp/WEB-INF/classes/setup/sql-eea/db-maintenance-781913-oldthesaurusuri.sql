SELECT * FROM metadata WHERE data LIKE '%>Continents countries sea regions of the world.<%';

SELECT * FROM metadata WHERE data LIKE '%https://sdi.eea.europa.eu/editor-catalogue/srv/api/registries/vocabularies/%';



UPDATE metadata SET data = replace(data,
                                   '>Continents countries sea regions of the world.<',
                                   '>Continents, countries, sea regions of the world.<')
WHERE data LIKE '%>Continents countries sea regions of the world.<%';



UPDATE metadata SET data = replace(data,
                                   'https://sdi.eea.europa.eu/editor-catalogue/srv/api/registries/vocabularies/',
                                   'https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/')
WHERE data LIKE '%https://sdi.eea.europa.eu/editor-catalogue/srv/api/registries/vocabularies/%';

