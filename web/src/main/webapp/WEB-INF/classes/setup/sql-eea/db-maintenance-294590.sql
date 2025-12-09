WITH ns AS (select ARRAY [
                     ARRAY ['xlink', 'http://www.w3.org/1999/xlink'],
                     ARRAY ['mdb', 'http://standards.iso.org/iso/19115/-3/mdb/2.0'],
                     ARRAY ['mrd', 'http://standards.iso.org/iso/19115/-3/mrd/1.0'],
                     ARRAY ['cit', 'http://standards.iso.org/iso/19115/-3/cit/2.0'],
                     ARRAY ['gco', 'http://standards.iso.org/iso/19115/-3/gco/1.0']] AS n)
SELECT uuid
FROM (
       SELECT uuid,
              unnest(xpath(
                '//mdb:MD_Metadata/mdb:distributionInfo//mrd:onLine[*/cit:linkage/*/text() =""]/*',
                XMLPARSE(DOCUMENT data), n))::text AS online
       FROM metadata,
            ns
       WHERE   isHarvested = 'n') AS onLine, ns;
