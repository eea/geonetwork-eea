
UPDATE metadata SET data = replace(data, 'Macedonia (FYR)', 'North Macedonia') WHERE  data LIKE '%Macedonia (FYR)%';
UPDATE metadata SET data = replace(data, 'Macedonia (FYROM)', 'North Macedonia') WHERE  data LIKE '%Macedonia (FYROM)%';
UPDATE metadata SET data = replace(data, 'former Yugoslavian Republic of Macedonia', 'North Macedonia') WHERE  data LIKE '%former Yugoslavian Republic of Macedonia%';
UPDATE metadata SET data = replace(data, 'Former Yugoslav Republic of Macedonia', 'North Macedonia') WHERE  data LIKE '%Former Yugoslav Republic of Macedonia%';
UPDATE metadata SET data = replace(data, 'Republic of Macedonia', 'North Macedonia') WHERE  data LIKE '%Republic of Macedonia%';
UPDATE metadata SET data = replace(data, '>Macedonia<', '>North Macedonia<') WHERE  data LIKE '%>Macedonia<%';
UPDATE metadata SET data = replace(data, 'former Yugoslav North Macedonia', 'North Macedonia') WHERE  data LIKE '%former Yugoslav North Macedonia%';
