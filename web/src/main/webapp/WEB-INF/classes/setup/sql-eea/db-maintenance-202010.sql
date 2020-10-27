UPDATE metadata SET data = replace(data, '>2005 8-9</gml', '>2005-08-09</gml') WHERE data LIKE '%2005 8-9</gm%';
UPDATE metadata SET data = replace(data, '>2010-0814</gml', '>2010-08-14</gml') WHERE data LIKE '%2010-0814</gml%';
