SELECT count(*)
FROM metadata
WHERE (data LIKE '%<gco:CharacterString>Direct Download</gco:CharacterString>%')
  AND isHarvested = 'n';

UPDATE metadata
SET data = replace(data, '<gco:CharacterString>Direct Download</gco:CharacterString>',
  '<gco:CharacterString>Direct download</gco:CharacterString>')
WHERE data LIKE '%<gco:CharacterString>Direct Download</gco:CharacterString>%'
  AND isHarvested = 'n';
