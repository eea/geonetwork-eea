UPDATE metadata SET data = replace(data,
                                   '>FGeo<',
                                   '>GDB<')
WHERE data LIKE '%>FGeo<%';

UPDATE metadata SET data = replace(data,
                                   '>PGeo<',
                                   '>GDB<')
WHERE data LIKE '%>PGeo<%';
