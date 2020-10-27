UPDATE metadata SET data = replace(data, '>2005 8-9</gml', '>2005-08-09</gml') WHERE data LIKE '%2005 8-9</gm%';
UPDATE metadata SET data = replace(data, '>2010-0814</gml', '>2010-08-14</gml') WHERE data LIKE '%2010-0814</gml%';



UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2BresourceIdentifier:copernicus*)' WHERE url = 'any=*copernicus_*&facet.q=status%2Fnotobsolete&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bany:IDP_*)' WHERE url = 'any=idp_*&facet.q=status%2Fnotobsolete&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bcat:marine)';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bcat:water)' WHERE url = '_cat=water&facet.q=status%2Fnotobsolete&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bcat:biodiversity)' WHERE url = '_cat=biodiversity&facet.q=status%2Fnotobsolete&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bcat:reference)' WHERE url = '_cat=reference&facet.q=status%2Fnotobsolete&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(+thesaurus_geonetworkthesaurusexternalthemehttpinspireeceuropaeumetadatacodelistPriorityDatasetPriorityDataset:*)' WHERE url = 'any=*PriorityDataset*&resultType=details&sortBy=relevance';
UPDATE usersearch SET url = 'any=q(-codelist_status:obsolete%20%2Bcat:reference)&sortBy=dateStamp&sortOrder=desc' WHERE url = '_cat=reference&facet.q=status%2Fnotobsolete&resultType=details&sortBy=changeDate';




ALTER TABLE usersearch ALTER COLUMN url TYPE text;
