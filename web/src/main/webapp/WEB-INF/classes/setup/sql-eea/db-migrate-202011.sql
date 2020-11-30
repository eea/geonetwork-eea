CREATE TABLE metadatastatus_202011_backup AS SELECT * FROM metadatastatus;

DROP TABLE metadatastatus;

UPDATE sources SET filter = replace(filter, '-codelist_status', '-cl_status.default') WHERE filter LIKE '%%';
