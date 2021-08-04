-- https://taskman.eionet.europa.eu/issues/129293#change-604160

UPDATE metadata SET data = replace(data, '>EU28<', '>EU28 (2013-2020)<') WHERE data LIKE '%>EU28<%';
UPDATE metadata SET data = replace(data, '>EU27<', '>EU27 (2007-2013)<') WHERE data LIKE '%>EU27<%';
UPDATE metadata SET data = replace(data, '>EU27_2007<', '>EU27 (2007-2013)<') WHERE data LIKE '%>EU27_2007<%';
