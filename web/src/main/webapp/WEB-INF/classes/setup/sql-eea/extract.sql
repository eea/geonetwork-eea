WITH ns AS (
select ARRAY[ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
       ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
       ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n
)

SELECT uuid,
       xpath('//gmd:organisationName/gco:CharacterString[1]/text()', node, n) as organization,
       xpath('//gmd:individualName/gco:CharacterString[1]/text()', node, n) as individual,
       xpath('//gmd:electronicMailAddress/gco:CharacterString[1]/text()', node, n) as mail,
       xpath('//gmd:positionName/gco:CharacterString[1]/text()', node, n) as pos,
       xpath('//gmd:role/@codeListValue', node, n) as role
FROM (
SELECT uuid, unnest(xpath('//gmd:CI_ResponsibleParty',  XMLPARSE(DOCUMENT data), n))  AS node
FROM metadata, ns
WHERE data LIKE '%%'
  ) sub, ns



WITH ns AS (
select ARRAY[ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
       ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
       ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n
)

SELECT
    uuid,
    array_to_string(theasurus, '') as theasurus,
    translate(regexp_split_to_table(keyword::TEXT, E','), '{,},"', '') AS keyword

FROM (SELECT uuid,
       xpath('//gmd:organisationName/gco:CharacterString[1]/text()', node, n) as organization,
       xpath('//gmd:individualName/gco:CharacterString[1]/text()', node, n) as individual,
       xpath('//gmd:positionName/gco:CharacterString[1]/text()', node, n) as pos,
       xpath('//gmd:positionName/gco:CharacterString[1]/text()', node, n) as pos,
       xpath('//gmd:role/@codeListValue', node, n) as role
FROM (
SELECT uuid, unnest(xpath('//gmd:CI_ResponsibleParty',  XMLPARSE(DOCUMENT data), n))  AS node
FROM metadata, ns
WHERE data LIKE '%%'
  ) sub, ns) a




WITH ns AS (
select ARRAY[ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
       ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
       ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n
)

SELECT
    uuid,
    array_to_string(theasurus, '') as theasurus,
    translate(regexp_split_to_table(keyword::TEXT, E','), '{,},"', '') AS keyword

FROM (SELECT uuid,
       xpath('//gmd:useLimitation/gco:CharacterString[1]/text()', node, n) as useLimitation
FROM (
SELECT uuid, unnest(xpath('//gmd:useLimitation',  XMLPARSE(DOCUMENT data), n))  AS node
FROM metadata, ns
WHERE data LIKE '%%'
  ) sub, ns) a





SELECT
    uuid,
    array_to_string(theasurus, '') as theasurus,
    translate(regexp_split_to_table(keyword::TEXT, E','), '{,},"', '') AS keyword

FROM (SELECT uuid,
       xpath('//gmd:keyword/gco:CharacterString[1]/text()', node, n) as keyword
      ,xpath('//gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString[1]/text()', node, n) as theasurus
FROM (
SELECT uuid, unnest(xpath('//gmd:MD_Keywords',  XMLPARSE(DOCUMENT data), n))  AS node
FROM metadata, ns
WHERE isTemplate = 'n'
  --AND data LIKE '%%'
  ) sub, ns) a
