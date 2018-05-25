ALTER TABLE users ADD COLUMN isenabled CHAR(1) DEFAULT 'y';
UPDATE users SET isenabled = 'y' WHERE enabled = true;
UPDATE users SET isenabled = 'n' WHERE enabled = false;
ALTER TABLE users  DROP COLUMN enabled;

ALTER TABLE groups ADD COLUMN enableCategoriesRestriction CHAR(1) DEFAULT 'n';
UPDATE groups SET enableCategoriesRestriction = 'y' WHERE ENABLEALLOWEDCATEGORIES = true;
UPDATE groups SET enableCategoriesRestriction = 'n' WHERE ENABLEALLOWEDCATEGORIES = false;
ALTER TABLE groups DROP COLUMN ENABLEALLOWEDCATEGORIES;

INSERT INTO Settings (name, value, datatype, position, internal) VALUES
  ('ui/config', '{"langDetector":{"fromHtmlTag":false,"regexp":"^/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+/([a-z]{3})/","default":"eng"},"nodeDetector":{"regexp":"^/[a-zA-Z0-9_-]+/([a-zA-Z0-9_-]+)/[a-z]{3}/","default":"srv"},"mods":{"header":{"enabled":true,"languages":{"eng":"en"}},"home":{"enabled":true,"appUrl":"../../srv/{{lang}}/catalog.search#/home"},"search":{"enabled":true,"appUrl":"../../srv/{{lang}}/catalog.search#/search?any=&facet.q=status%2Fnotobsolete","hitsperpageValues":[10,50,100],"paginationInfo":{"hitsPerPage":20},"facetsSummaryType":"details","facetConfig":[],"facetTabField":"","filters":{},"sortbyValues":[{"sortBy":"relevance","sortOrder":""},{"sortBy":"changeDate","sortOrder":""},{"sortBy":"title","sortOrder":"reverse"},{"sortBy":"rating","sortOrder":""},{"sortBy":"popularity","sortOrder":""},{"sortBy":"denominatorDesc","sortOrder":""},{"sortBy":"denominatorAsc","sortOrder":"reverse"}],"sortBy":"changeDate","resultViewTpls":[{"tplUrl":"../../catalog/components/search/resultsview/partials/viewtemplates/grid.html","tooltip":"Grid","icon":"fa-th"}],"resultTemplate":"../../catalog/components/search/resultsview/partials/viewtemplates/grid.html","advancedSearchTemplate":"../../catalog/views/default/templates/advancedSearchForm/defaultAdvancedSearchForm.html","formatter":{"list":[{"label":"full","url":"../api/records/{{uuid}}/formatters/xsl-view?root=div&view=advanced"}]},"grid":{"related":["parent","children","services","datasets"]},"linkTypes":{"links":["LINK","kml"],"downloads":["DOWNLOAD"],"layers":["OGC"],"maps":["ows"]},"isFilterTagsDisplayedInSearch":false},"map":{"enabled":false,"appUrl":"../../srv/{{lang}}/catalog.search#/map","is3DModeAllowed":true,"isSaveMapInCatalogAllowed":true,"isExportMapAsImageEnabled":true,"bingKey":"AnElW2Zqi4fI-9cYx1LHiQfokQ9GrNzcjOh_p_0hkO1yo78ba8zTLARcLBIf8H6D","storage":"sessionStorage","map":"../../map/config-viewer.xml","listOfServices":{"wms":[],"wmts":[]},"useOSM":true,"context":"","layer":{"url":"http://data.fao.org/maps/wms?","layers":"COMMON:dark_bluemarble","version":"1.1.1"},"projection":"EPSG:3857","projectionList":[{"code":"EPSG:4326","label":"WGS84(EPSG:4326)"},{"code":"EPSG:3857","label":"Googlemercator(EPSG:3857)"}],"disabledTools":{"processes":false,"addLayers":false,"layers":false,"filter":false,"contexts":false,"print":false,"mInteraction":false,"graticule":false,"syncAllLayers":false,"drawVector":false},"searchMapLayers":[],"viewerMapLayers":[]},"geocoder": {"enabled": true, "appUrl": "https://secure.geonames.org/searchJSON"},"editor":{"enabled":true,"appUrl":"../../srv/{{lang}}/catalog.edit","isUserRecordsOnly":false,"isFilterTagsDisplayed":false,"createPageTpl": "../../catalog/templates/editor/new-metadata-horizontal.html"},"admin":{"enabled":true,"appUrl":"../../srv/{{lang}}/admin.console"},"signin":{"enabled":true,"appUrl":"../../srv/{{lang}}/catalog.signin"},"signout":{"appUrl":"../../signout"}}}', 3, 10000, 'n');




INSERT INTO Settings (name, value, datatype, position, internal) VALUES
  ('system/csw/enabledWhenIndexing', 'true', 2, 1211, 'y');

DELETE FROM Settings WHERE  name = 'map/is3DModeAllowed';
DELETE FROM Settings WHERE  name = 'map/isMapViewerEnabled';
DELETE FROM Settings WHERE  name = 'map/config';
DELETE FROM Settings WHERE  name = 'map/proj4js';
DELETE FROM Settings WHERE  name = 'map/isSaveMapInCatalogAllowed';
DELETE FROM Settings WHERE  name = 'map/bingKey';
DELETE FROM Settings WHERE  name = 'metadata/editor/schemaConfig';


DELETE FROM Settings WHERE name like 'system/shib%';
CREATE TABLE selections
(
  id integer NOT NULL,
  name character varying(255) NOT NULL,
  iswatchable character(1) NOT NULL,
  CONSTRAINT selections_pkey PRIMARY KEY (id)
);

CREATE TABLE selectionsdes
(
  iddes integer NOT NULL,
  label character varying(255) NOT NULL,
  langid character varying(5) NOT NULL,
  CONSTRAINT selectionsdes_pkey PRIMARY KEY (iddes, langid),
  CONSTRAINT fk_r0y9hytqn3nodmwn86hn2vsgf FOREIGN KEY (iddes)
      REFERENCES selections (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

ALTER TABLE services ADD PRIMARY KEY (id);


INSERT INTO Selections (id, name, isWatchable) VALUES (0, 'PreferredList', 'n');
INSERT INTO Selections (id, name, isWatchable) VALUES (1, 'WatchList', 'y');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'ara','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'ara','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'cat','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'cat','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'chi','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'chi','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'dut','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'dut','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'eng','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'eng','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'fin','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'fin','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'fre','Fiches préférées');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'fre','Fiches observées');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'ger','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'ger','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'ita','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'ita','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'nor','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'nor','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'pol','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'pol','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'por','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'por','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'rus','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'rus','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'spa','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'spa','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'tur','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'tur','Watch list');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (0,'vie','Preferred records');
INSERT INTO SelectionsDes (iddes, langid, label) VALUES (1,'vie','Watch list');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userFeedback/lastNotificationDate', '', 0, 1912, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/import/restrict', '', 0, 11000, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/xlinkResolver/referencedDeletionAllowed', 'true', 2, 2313, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/backuparchive/enable', 'false', 2, 12000, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userSelfRegistration/recaptcha/enable', 'false', 2, 1910, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userSelfRegistration/recaptcha/publickey', '', 0, 1910, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userSelfRegistration/recaptcha/secretkey', '', 0, 1910, 'y');

-- INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/feedback/mailServer/tls', 'false', 2, 644, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/remotevalidation/url', '', 0, 7211, 'n');
UPDATE Settings SET internal='n' WHERE name='system/inspire/enable';

UPDATE Settings SET datatype = 0, value = 'off' WHERE name = 'system/localrating/enable' and value = 'n';
UPDATE Settings SET datatype = 0, value = 'basic' WHERE name = 'system/localrating/enable' and value = 'y';


CREATE TABLE public.guf_ratingcriteria
(
  id integer NOT NULL,
  isinternal character(1) NOT NULL DEFAULT 'y'::bpchar,
  name character varying(32) NOT NULL,
  CONSTRAINT guf_ratingcriteria_pkey PRIMARY KEY (id)
);
CREATE TABLE public.guf_ratingcriteriades
(
  iddes integer NOT NULL,
  label character varying(2000) NOT NULL,
  langid character varying(5) NOT NULL,
  CONSTRAINT guf_ratingcriteriades_pkey PRIMARY KEY (iddes, langid),
  CONSTRAINT fk_1lkdhdb0cdxrb4isdw1nyfdh6 FOREIGN KEY (iddes)
      REFERENCES public.guf_ratingcriteria (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (-1, 'Average', 'y');
INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (0, 'Completeness', 'n');
INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (1, 'Discoverability', 'n');
INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (2, 'Readability', 'n');
INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (3, 'DataQuality', 'n');
INSERT INTO GUF_RatingCriteria (id, name, isinternal) VALUES (4, 'ServiceQuality', 'n');

INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (-1,'eng', 'Average');
INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (0,'eng', 'Completeness#Is the information on this page complete enough to know what you can expect from this dataset?');
INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (1,'eng', 'Discoverability#Was it easy to find this information page?');
INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (2,'eng', 'Readability#Was it easy to read and understand the contents of this page?');
INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (3,'eng', 'Data quality#Does the dataset contain the information you expected, the dataset has enough accuracy, the data is valid/up-to-date?');
INSERT INTO GUF_RatingCriteriaDes (iddes, langid, label) VALUES (4,'eng', 'Service quality#The dataset is provided as a service or mediatype that is easy to work with?');


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvester/disabledHarvesterTypes', '', 0, 9011, 'n');


UPDATE metadata SET data = replace(data, 'http://sdi.eea.europa.eu/public/catalogue-graphic-overview', 'https://sdi.eea.europa.eu/public/catalogue-graphic-overview');


UPDATE Settings SET value='3.4.3' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';
