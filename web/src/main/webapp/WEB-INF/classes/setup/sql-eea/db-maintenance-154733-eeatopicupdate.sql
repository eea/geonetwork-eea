UPDATE metadata SET data = replace(data, 'agriculture">Agriculture<', 'agriculture-and-food">Agriculture and food<') WHERE data LIKE '%>Agriculture<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'biodiversity">Biodiversity - Ecosystems<', 'biodiversity">Biodiversity<') WHERE data LIKE '%>Biodiversity - Ecosystems<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'climate-change-adaptation">Climate change adaptation<', 'climate-adaptation">Climate adaptation<') WHERE data LIKE '%>Climate change adaptation<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'climate">Climate change mitigation<', 'climate-mitigation">Climate mitigation<') WHERE data LIKE '%>Climate change mitigation<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'human">Environment and health<', 'environmental-health-impacts">Environmental health impacts<') WHERE data LIKE '%>Environment and health<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'sustainability-transitions">Sustainability transitions<', 'sustainability-solutions">Sustainability solutions<') WHERE data LIKE '%>Sustainability transitions<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'transport">Transport<', 'transport-and-mobility">Transport and mobility<') WHERE data LIKE '%>Transport<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'waste">Resource efficiency and waste<', 'waste-and-recycling">Waste and recycling<') WHERE data LIKE '%>Resource efficiency and waste<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, 'water">Water and marine environment<', 'water">Water<') WHERE data LIKE '%>Water and marine environment<%' and isHarvested = 'n';

UPDATE metadata SET data = replace(data, '<gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/policy">Policy instruments</gmx:Anchor>', '<gmx:Anchor/>') WHERE data LIKE '%>Policy instruments<%' and isHarvested = 'n';
UPDATE metadata SET data = replace(data, '<gmx:Anchor xlink:href="http://www.eea.europa.eu/portal_vocabularies/themes/policy">Policy instruments</gmx:Anchor>', '<gmx:Anchor/>') WHERE data LIKE '%>Policy instruments<%' and isHarvested = 'n';

UPDATE metadata SET data = replace(data, 'http://www.eea.europa.eu/portal_vocabularies/themes', 'https://www.eea.europa.eu/themes') WHERE data LIKE '%http://www.eea.europa.eu/portal_vocabularies/themes%' and isHarvested = 'n';
