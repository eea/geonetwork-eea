-- Update link label and nilReason attribute
-- for all links in a record with an identifier containing _p_
WITH ns AS ( select ARRAY[
                        ARRAY['xlink', 'http://www.w3.org/1999/xlink'],
                        ARRAY['gmd', 'http://www.isotc211.org/2005/gmd'],
                        ARRAY['gco', 'http://www.isotc211.org/2005/gco']] AS n)

UPDATE metadata SET data =
                        replace(replace(data,
                                'Direct download (Eionet authentication)',
                                'Direct download'),
                            'gmd:onLine gco:nilReason="withheld"',
                            'gmd:onLine') WHERE uuid IN (
    SELECT uuid FROM (
                         SELECT uuid,
                                isharvested,
                                unnest(xpath(
                                        'count(//gmd:MD_Metadata/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier/*/gmd:code/*[contains(text(), "_p_")])',
                                        XMLPARSE(DOCUMENT data), n))::text AS c
                         FROM metadata,
                              ns
                         WHERE data LIKE '%https://sdi.eea.europa.eu/data/%'
                           AND isHarvested = 'n'
                     ) AS subquery WHERE c = '1'
);
