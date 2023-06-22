UPDATE metadata
  SET data = replace(data, 'external.theme.eea-mp', 'local.theme.eea-mp')
  WHERE data LIKE '%external.theme.eea-mp%';
