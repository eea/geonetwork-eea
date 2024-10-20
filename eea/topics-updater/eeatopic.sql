UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Agriculture</gmx:Anchor>', '<gco:CharacterString>Agriculture and food</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Agriculture</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Air pollution</gmx:Anchor>', '<gco:CharacterString>Air pollution</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Air pollution</gmx:Anchor>%';

UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Biodiversity - Ecosystems</gmx:Anchor>', '<gco:CharacterString>Biodiversity</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Biodiversity - Ecosystems</gmx:Anchor>%';

UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Climate change adaptation</gmx:Anchor>', '<gco:CharacterString>Climate adaptation</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Climate change adaptation</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Climate change mitigation</gmx:Anchor>', '<gco:CharacterString>Climate mitigation</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Climate change mitigation</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Energy</gmx:Anchor>', '<gco:CharacterString>Energy</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Energy</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Industry</gmx:Anchor>', '<gco:CharacterString>Industry</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Industry</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Land use</gmx:Anchor>', '<gco:CharacterString>Land use</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Land use</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Environment and health</gmx:Anchor>', '<gco:CharacterString>Environmental health impacts</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Environment and health</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Transport</gmx:Anchor>', '<gco:CharacterString>Transport and mobility</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Transport</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Resource efficiency and waste</gmx:Anchor>', '<gco:CharacterString>Waste and recycling</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Resource efficiency and waste</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Water and marine environment</gmx:Anchor>', '<gco:CharacterString>Water</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Water and marine environment</gmx:Anchor>%';
UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z]+">Policy instruments</gmx:Anchor>', '<gco:CharacterString></gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Policy instruments</gmx:Anchor>%';

UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/biodiversity">Biodiversity - Ecosystems</gmx:Anchor>', '<gco:CharacterString>Biodiversity</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/biodiversity">Biodiversity - Ecosystems</gmx:Anchor>%';

UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/policy">Policy instruments</gmx:Anchor>', '<gco:CharacterString></gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/policy">Policy instruments</gmx:Anchor>%';

UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/[a-z-]+">Sustainability transitions</gmx:Anchor>', '<gco:CharacterString>Sustainability solutions</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/%">Sustainability transitions</gmx:Anchor>%';


UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/sustainability-transitions">Sustainability transitions</gmx:Anchor>', '<gco:CharacterString>Sustainability solutions</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/sustainability-transitions">Sustainability transitions</gmx:Anchor>%';




UPDATE metadata SET data = regexp_replace(data, '<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/landuse">Land use</gmx:Anchor>', '<gco:CharacterString>Land use</gco:CharacterString>') WHERE data LIKE '%<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/landuse">Land use</gmx:Anchor>%';


SELECT count(*) FROM metadata WHERE data LIKE '%.europa.eu/portal_vocabularies/theme%';
