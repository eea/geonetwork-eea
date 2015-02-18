ALTER TABLE Metadata ALTER harvestUri TYPE varchar(512);
CREATE TABLE Services
  (
  
    id         int,
    name       varchar(64)   not null,
    class       varchar(1048)   not null,
    description       varchar(1048),
        
    primary key(id)
  );
  

CREATE TABLE ServiceParameters
  (
    service     int,
    name       varchar(64)   not null,
    value       varchar(1048)   not null,
    
        
    foreign key(service) references Services(id)
  );



CREATE TABLE HarvesterSettings
  (
    id        int            not null,
    parentId  int,
    name      varchar(64)    not null,
    value     text,

    primary key(id),

    foreign key(parentId) references HarvesterSettings(id)
  );


CREATE TABLE Address
(
	id			  int 			not null,
	address       varchar(128),
	city          varchar(128),
	state         varchar(32),
	zip           varchar(16),
	country       varchar(128),
	primary key(id)
);

CREATE TABLE UserAddress
(
	userid 	int not null,
	addressid int not null,
	primary key(userid,addressid),
    foreign key(userid) references Users(id),
    foreign key(addressid) references Address(id)
);

CREATE TABLE Email
(
	user_id			  int 			not null,
	email         varchar(128),

	primary key(user_id),
    foreign key(user_id) references Users(id)
);


ALTER TABLE Requests ALTER COLUMN query TYPE text;
ALTER TABLE Requests ALTER COLUMN type TYPE text;
ALTER TABLE Requests ALTER COLUMN spatialfilter TYPE text;


--Inserts new data and modifies data

ALTER TABLE operations DROP COLUMN reserved;
ALTER TABLE ServiceParameters DROP CONSTRAINT IF EXISTS serviceparameters_service_fkey;
ALTER TABLE ServiceParameters DROP COLUMN IF EXISTS id;
ALTER TABLE services DROP COLUMN IF EXISTS id;

CREATE TABLE SettingsBackup AS SELECT * FROM Settings;

INSERT INTO HarvesterSettings VALUES  (1,NULL,'harvesting',NULL);
-- Copy all harvester's root nodes config
INSERT INTO HarvesterSettings SELECT id, 1, name, value FROM Settings WHERE parentId = 2;
-- Copy all harvester's properties (Greater than last 2.10.1 settings ie. keepMarkedElement)
INSERT INTO HarvesterSettings SELECT * FROM Settings WHERE id > 958 AND parentId > 2;
-- Drop harvester config from Settings table
ALTER TABLE settings DROP CONSTRAINT settings_parentid_fkey;
DELETE FROM Settings WHERE id > 958;
DELETE FROM Settings WHERE id=2;

ALTER TABLE Settings ALTER name TYPE varchar(512);

-- 0 is char, 1 is number, 2 is boolean
ALTER TABLE Settings ADD datatype int;
ALTER TABLE Settings ADD position int;
ALTER TABLE Settings ADD internal varchar(1);

UPDATE Settings SET position = id * 10;

UPDATE Settings SET name = 'system/site/name', datatype = 0, internal = 'n' WHERE id = 11;
UPDATE Settings SET name = 'system/site/siteId', datatype = 0, internal = 'n' WHERE id = 12;
UPDATE Settings SET name = 'system/site/organization', datatype = 0, internal = 'n' WHERE id = 13;
UPDATE Settings SET name = 'system/platform/version', datatype = 0, internal = 'n' WHERE id = 15;
UPDATE Settings SET name = 'system/platform/subVersion', datatype = 0, internal = 'n' WHERE id = 16;
UPDATE Settings SET name = 'system/site/svnUuid', datatype = 0 WHERE id = 17;
UPDATE Settings SET name = 'system/server/host', datatype = 0, internal = 'n' WHERE id = 21;
UPDATE Settings SET name = 'system/server/port', datatype = 1, internal = 'n' WHERE id = 22;
UPDATE Settings SET name = 'system/server/protocol', datatype = 0, internal = 'n' WHERE id = 23;
UPDATE Settings SET name = 'system/server/securePort', datatype = 1 WHERE id = 24;
UPDATE Settings SET name = 'system/intranet/network', datatype = 0 WHERE id = 31;
UPDATE Settings SET name = 'system/intranet/netmask', datatype = 0 WHERE id = 32;
UPDATE Settings SET name = 'system/z3950/enable', datatype = 2 WHERE id = 41;
UPDATE Settings SET name = 'system/z3950/port', datatype = 1 WHERE id = 42;
UPDATE Settings SET name = 'system/proxy/use', datatype = 2 WHERE id = 51;
UPDATE Settings SET name = 'system/proxy/host', datatype = 0 WHERE id = 52;
UPDATE Settings SET name = 'system/proxy/port', datatype = 1 WHERE id = 53;
UPDATE Settings SET name = 'system/proxy/username', datatype = 0 WHERE id = 54;
UPDATE Settings SET name = 'system/proxy/password', datatype = 0 WHERE id = 55;
UPDATE Settings SET name = 'system/feedback/email', datatype = 0 WHERE id = 61;
UPDATE Settings SET name = 'system/feedback/mailServer/host', datatype = 0 WHERE id = 63;
UPDATE Settings SET name = 'system/feedback/mailServer/port', datatype = 1 WHERE id = 64;
UPDATE Settings SET name = 'system/removedMetadata/dir', datatype = 0 WHERE id = 71;
UPDATE Settings SET name = 'system/selectionmanager/maxrecords', datatype = 1 WHERE id = 91;
UPDATE Settings SET name = 'system/csw/enable', datatype = 2 WHERE id = 121;
UPDATE Settings SET name = 'system/csw/contactId', datatype = 0 WHERE id = 122;
UPDATE Settings SET name = 'system/csw/individualName', datatype = 0 WHERE id = 123;
UPDATE Settings SET name = 'system/csw/positionName', datatype = 0 WHERE id = 124;
UPDATE Settings SET name = 'system/csw/role', datatype = 0 WHERE id = 126;
UPDATE Settings SET name = 'system/csw/title', datatype = 0 WHERE id = 127;
UPDATE Settings SET name = 'system/csw/abstract', datatype = 0 WHERE id = 128;
UPDATE Settings SET name = 'system/csw/fees', datatype = 0 WHERE id = 129;
UPDATE Settings SET name = 'system/csw/accessConstraints', datatype = 2 WHERE id = 130;
UPDATE Settings SET name = 'system/csw/metadataPublic', datatype = 2 WHERE id = 131;
UPDATE Settings SET name = 'system/csw/contactInfo/phone/voice', datatype = 0 WHERE id = 140;
UPDATE Settings SET name = 'system/csw/contactInfo/phone/facsimile', datatype = 0 WHERE id = 141;
UPDATE Settings SET name = 'system/csw/contactInfo/address/deliveryPoint', datatype = 0 WHERE id = 150;
UPDATE Settings SET name = 'system/csw/contactInfo/address/city', datatype = 0 WHERE id = 151;
UPDATE Settings SET name = 'system/csw/contactInfo/address/administrativeArea', datatype = 0 WHERE id = 152;
UPDATE Settings SET name = 'system/csw/contactInfo/address/postalCode', datatype = 0 WHERE id = 153;
UPDATE Settings SET name = 'system/csw/contactInfo/address/country', datatype = 0 WHERE id = 154;
UPDATE Settings SET name = 'system/csw/contactInfo/address/email', datatype = 0 WHERE id = 155;
UPDATE Settings SET name = 'system/csw/contactInfo/address/hoursOfService', datatype = 0 WHERE id = 162;
UPDATE Settings SET name = 'system/csw/contactInfo/address/contactInstructions', datatype = 0 WHERE id = 163;


UPDATE Settings SET name = 'system/shib/use', datatype = 2 WHERE id = 171;
UPDATE Settings SET name = 'system/shib/path', datatype = 0 WHERE id = 172;
UPDATE Settings SET name = 'system/shib/username', datatype = 0 WHERE id = 174;
UPDATE Settings SET name = 'system/shib/surname', datatype = 0 WHERE id = 175;
UPDATE Settings SET name = 'system/shib/firstname', datatype = 0 WHERE id = 176;
UPDATE Settings SET name = 'system/shib/profile', datatype = 0 WHERE id = 177;
UPDATE Settings SET name = 'system/userSelfRegistration/enable', datatype = 2, internal = 'n' WHERE id = 191;
UPDATE Settings SET name = 'system/clickablehyperlinks/enable', datatype = 2 WHERE id = 201;
UPDATE Settings SET name = 'system/localrating/enable', datatype = 2 WHERE id = 211;
UPDATE Settings SET name = 'system/downloadservice/leave', datatype = 0 WHERE id = 221;
UPDATE Settings SET name = 'system/downloadservice/simple', datatype = 0 WHERE id = 222;
UPDATE Settings SET name = 'system/downloadservice/withdisclaimer', datatype = 0 WHERE id = 223;
UPDATE Settings SET name = 'system/xlinkResolver/enable', datatype = 2, internal = 'n' WHERE id = 231;
UPDATE Settings SET name = 'system/autofixing/enable', datatype = 2 WHERE id = 241;
UPDATE Settings SET name = 'system/searchStats/enable', datatype = 2, internal = 'n' WHERE id = 251;
UPDATE Settings SET name = 'system/indexoptimizer/enable', datatype = 2 WHERE id = 601;
UPDATE Settings SET name = 'system/indexoptimizer/at/hour', datatype = 1 WHERE id = 603;
UPDATE Settings SET name = 'system/indexoptimizer/at/min', datatype = 1 WHERE id = 604;
UPDATE Settings SET name = 'system/indexoptimizer/at/sec', datatype = 1 WHERE id = 605;
UPDATE Settings SET name = 'system/indexoptimizer/interval', datatype = 0 WHERE id = 606;
UPDATE Settings SET name = 'system/indexoptimizer/interval/day', datatype = 1 WHERE id = 607;
UPDATE Settings SET name = 'system/indexoptimizer/interval/hour', datatype = 1 WHERE id = 608;
UPDATE Settings SET name = 'system/indexoptimizer/interval/min', datatype = 1 WHERE id = 609;
UPDATE Settings SET name = 'system/oai/mdmode', datatype = 0 WHERE id = 701;
UPDATE Settings SET name = 'system/oai/tokentimeout', datatype = 1 WHERE id = 702;
UPDATE Settings SET name = 'system/oai/cachesize', datatype = 1 WHERE id = 703;
UPDATE Settings SET name = 'system/inspire/enable', datatype = 2 WHERE id = 721;
UPDATE Settings SET name = 'system/inspire/enableSearchPanel', datatype = 2, internal = 'n' WHERE id = 722;
UPDATE Settings SET name = 'system/harvester/enableEditing', datatype = 2, internal = 'n' WHERE id = 901;
UPDATE Settings SET name = 'system/metadata/enableSimpleView', datatype = 2 WHERE id = 911;
UPDATE Settings SET name = 'system/metadata/enableIsoView', datatype = 2 WHERE id = 912;
UPDATE Settings SET name = 'system/metadata/enableInspireView', datatype = 2 WHERE id = 913;
UPDATE Settings SET name = 'system/metadata/enableXmlView', datatype = 2 WHERE id = 914;
UPDATE Settings SET name = 'system/metadata/defaultView', datatype = 0, internal = 'n' WHERE id = 915;
UPDATE Settings SET name = 'system/metadataprivs/usergrouponly', datatype = 2, internal = 'n' WHERE id = 918;
UPDATE Settings SET name = 'system/threadedindexing/maxthreads', datatype = 1 WHERE id = 921;
UPDATE Settings SET name = 'system/autodetect/enable', datatype = 2 WHERE id = 951;
UPDATE Settings SET name = 'system/requestedLanguage/only', datatype = 0 WHERE id = 953;
UPDATE Settings SET name = 'system/requestedLanguage/sorted', datatype = 2 WHERE id = 954;
UPDATE Settings SET name = 'system/requestedLanguage/ignored', datatype = 2 WHERE id = 955;


DELETE FROM Settings WHERE id = 957;
DELETE FROM Settings WHERE id = 958;


UPDATE Settings SET internal = 'y' WHERE internal IS NULL;
UPDATE Settings SET parentId = null;

DELETE FROM Settings WHERE id = 173;
DELETE FROM Settings WHERE id = 178;
DELETE FROM Settings WHERE id = 179;
DELETE FROM Settings WHERE id = 180;
DELETE FROM Settings WHERE id = 181;
DELETE FROM Settings WHERE id = 182;
DELETE FROM Settings WHERE id = 183;
DELETE FROM Settings WHERE id = 184;

DELETE FROM Settings WHERE id = 120;
DELETE FROM Settings WHERE id = 170;
DELETE FROM Settings WHERE id = 190;
DELETE FROM Settings WHERE id = 200;
DELETE FROM Settings WHERE id = 210;
DELETE FROM Settings WHERE id = 220;
DELETE FROM Settings WHERE id = 230;
DELETE FROM Settings WHERE id = 240;
DELETE FROM Settings WHERE id = 250;
DELETE FROM Settings WHERE id = 600;
DELETE FROM Settings WHERE id = 602;
DELETE FROM Settings WHERE id = 700;
DELETE FROM Settings WHERE id = 720;
DELETE FROM Settings WHERE id = 900;
DELETE FROM Settings WHERE id = 910;
DELETE FROM Settings WHERE id = 917;
DELETE FROM Settings WHERE id = 920;
DELETE FROM Settings WHERE id = 950;
DELETE FROM Settings WHERE id = 952;
DELETE FROM Settings WHERE id = 956;

DELETE FROM Settings WHERE id = 10;
DELETE FROM Settings WHERE id = 14;
DELETE FROM Settings WHERE id = 20;
DELETE FROM Settings WHERE id = 30;
DELETE FROM Settings WHERE id = 40;
DELETE FROM Settings WHERE id = 50;
DELETE FROM Settings WHERE id = 62;
DELETE FROM Settings WHERE id = 60;
DELETE FROM Settings WHERE id = 70;
DELETE FROM Settings WHERE id = 90;

DELETE FROM Settings WHERE id = 160;
DELETE FROM Settings WHERE id = 161;
DELETE FROM Settings WHERE id = 125;

DELETE FROM Settings WHERE id = 0;
DELETE FROM Settings WHERE id = 1;

ALTER TABLE Settings DROP COLUMN parentId;
ALTER TABLE Settings DROP CONSTRAINT settings_pkey;
ALTER TABLE Settings DROP COLUMN id;
ALTER TABLE Settings ADD PRIMARY KEY (name);

-- Add new settings
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/feedback/mailServer/username', '', 0, 642, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/feedback/mailServer/password', '', 0, 643, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/feedback/mailServer/ssl', false, 2, 641, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/recipient', NULL, 0, 9020, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/template', '', 0, 9021, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/templateError', 'There was an error on the harvesting: $$errorMsg$$', 0, 9022, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/templateWarning', '', 0, 9023, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/subject', '[$$harvesterType$$] $$harvesterName$$ finished harvesting', 0, 9024, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/enabled', 'false', 2, 9025, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/level1', 'false', 2, 9026, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/level2', 'false', 2, 9027, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/harvesting/mail/level3', 'false', 2, 9028, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/requestedLanguage/ignorechars', '', 0, 9590, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/userFeedback/enable', 'true', 2, 1911, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/requestedLanguage/preferUiLanguage', 'true', 2, 9595, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/csw/transactionUpdateCreateXPath', 'true', 2, 1320, 'n');


-- INSERT INTO Settings (name, value, datatype, position, internal) VALUES
--  ('map/backgroundChoices', '{"contextList": []}', 0, 9590, false);
INSERT INTO Settings (name, value, datatype, position, internal) VALUES
  ('map/config', '{"viewerMap": "../../map/config-viewer.xml", "listOfServices": {"wms": [], "wmts": []}, "useOSM":true,"context":"","layer":{"url":"http://www2.demis.nl/mapserver/wms.asp?","layers":"Countries","version":"1.1.1"},"projection":"EPSG:3857","projectionList":[{"code":"EPSG:4326","label":"WGS84 (EPSG:4326)"},{"code":"EPSG:3857","label":"Google mercator (EPSG:3857)"}]}', 0, 9590, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES 
  ('map/proj4js', '[{"code":"EPSG:2154","value":"+proj=lcc +lat_1=49 +lat_2=44 +lat_0=46.5 +lon_0=3 +x_0=700000 +y_0=6600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"}]', 0, 9591, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES
  ('metadata/editor/schemaConfig', '{"iso19110":{"defaultTab":"default","displayToolTip":false,"related":{"display":true,"readonly":true,"categories":["dataset"]},"validation":{"display":true}},"iso19139":{"defaultTab":"inspire","displayToolTip":false,"related":{"display":true,"categories":[]},"suggestion":{"display":true},"validation":{"display":true}},"dublin-core":{"defaultTab":"default","related":{"display":true,"readonly":false,"categories":["parent","onlinesrc"]},}}', 0, 10000, 'n');


ALTER TABLE StatusValues ADD displayorder int;

UPDATE StatusValues SET displayorder = 0 WHERE id = 0;
UPDATE StatusValues SET displayorder = 1 WHERE id = 1;
UPDATE StatusValues SET displayorder = 3 WHERE id = 2;
UPDATE StatusValues SET displayorder = 5 WHERE id = 3;
UPDATE StatusValues SET displayorder = 2 WHERE id = 4;
UPDATE StatusValues SET displayorder = 4 WHERE id = 5;


-- Version update
UPDATE Settings SET value='2.11.0' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';

-- Populate new tables from Users
INSERT INTO Address (SELECT id, address, city, state, zip, country FROM Users);
INSERT INTO UserAddress (SELECT id, id FROM Users);
INSERT INTO Email (SELECT id, email FROM Users);


-- Set the start of the sequence to the highest current id.
-- SELECT max(id) + 1 FROM Requests;
CREATE SEQUENCE HIBERNATE_SEQUENCE START WITH 400000 INCREMENT BY 1;


-- Update Requests column type (integer > boolean)
ALTER TABLE Requests ADD COLUMN autogeneratedtemp boolean;
UPDATE Requests SET autogeneratedtemp = false;
UPDATE Requests SET autogeneratedtemp = true WHERE autogenerated = 1;
ALTER TABLE Requests DROP COLUMN autogenerated;
ALTER TABLE Requests ADD COLUMN autogenerated boolean;
UPDATE Requests SET autogeneratedtemp = autogenerated;
ALTER TABLE Requests DROP COLUMN autogeneratedtemp;

ALTER TABLE Requests ADD COLUMN simpletemp boolean;
UPDATE Requests SET simpletemp = false;
UPDATE Requests SET simpletemp = true WHERE simple = 1;
ALTER TABLE Requests DROP COLUMN simple;
ALTER TABLE Requests ADD COLUMN simple boolean;
UPDATE Requests SET simpletemp = simple;
ALTER TABLE Requests DROP COLUMN simpletemp;

-- Create temporary tables used when modifying a column type

-- Convert Profile column to the profile enumeration ordinal

CREATE TABLE USERGROUPS_TMP 
(
   USERID int NOT NULL,
   GROUPID int NOT NULL,
   PROFILE int NOT NULL
);


-- Convert Profile column to the profile enumeration ordinal

CREATE TABLE USERS_TMP
  (
    id            int         ,
    username      varchar(256),
    password      varchar(120),
    surname       varchar(32),
    name          varchar(32),
    profile       int,
    organisation  varchar(128),
    kind          varchar(16),
    security      varchar(128),
    authtype      varchar(32),
	
    primary key(id),
    unique(username)
  );


-- ----  Change params querytype column to map to the LuceneQueryParamType enumeration

CREATE TABLE Params_TEMP
  (
    id          int           not null,
    requestId   int,
    queryType   int,
    termField   varchar(128),
    termText    varchar(128),
    similarity  float,
    lowerText   varchar(128),
    upperText   varchar(128),
    inclusive   char(1)
);

-- Copy data from a table that needs a column migrated to an enum to a temporary table

-- Update UserGroups profiles to be one of the enumerated profiles
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 0 FROM USERGROUPS where profile='Administrator';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 1 FROM USERGROUPS where profile='UserAdmin';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 2 FROM USERGROUPS where profile='Reviewer';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 3 FROM USERGROUPS where profile='Editor';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 4 FROM USERGROUPS where profile='RegisteredUser';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 5 FROM USERGROUPS where profile='Guest';
INSERT INTO USERGROUPS_TMP (userid, groupid, profile) SELECT userid, groupid, 6 FROM USERGROUPS where profile='Monitor';

-- Convert Profile column to the profile enumeration ordinal
-- create address and email tables to allow multiple per user

INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 0, organisation, kind, security, authtype FROM USERS where profile='Administrator';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 1, organisation, kind, security, authtype FROM USERS where profile='UserAdmin';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 2, organisation, kind, security, authtype FROM USERS where profile='Reviewer';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 3, organisation, kind, security, authtype FROM USERS where profile='Editor';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 4, organisation, kind, security, authtype FROM USERS where profile='RegisteredUser';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 5, organisation, kind, security, authtype FROM USERS where profile='Guest';
INSERT INTO USERS_TMP SELECT id, username, password, surname, name, 6, organisation, kind, security, authtype FROM USERS where profile='Monitor';

-- ----  Change params querytype column to map to the LuceneQueryParamType enumeration

INSERT INTO Params_TEMP SELECT id, requestId, 0, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='BOOLEAN_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 1, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='TERM_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 2, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='FUZZY_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 3, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='PREFIX_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 4, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='MATCH_ALL_DOCS_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 5, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='WILDCARD_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 6, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='PHRASE_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 7, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='RANGE_QUERY';
INSERT INTO Params_TEMP SELECT id, requestId, 8, termField, termText, similarity, lowerText, upperText, inclusive FROM Params where querytype='NUMERIC_RANGE_QUERY';

-- Drop the old tables (that are being migrated to an enum) and create them again with new definition

-- Update UserGroups profiles to be one of the enumerated profiles

DROP TABLE USERGROUPS;
CREATE TABLE USERGROUPS
  (
    userId   int          not null,
    groupId  int          not null,
    profile  int          not null,

    primary key(userId,groupId,profile),

    foreign key(userId) references Users(id),
    foreign key(groupId) references Groups(id)
  );
-- Update UserGroups profiles to be one of the enumerated profiles

INSERT INTO USERGROUPS SELECT * FROM USERGROUPS_TMP;
DROP TABLE USERGROUPS_TMP;


-- Convert Profile column to the profile enumeration ordinal

ALTER TABLE metadata DROP CONSTRAINT IF EXISTS metadata_owner_fkey;
ALTER TABLE metadatastatus DROP CONSTRAINT IF EXISTS metadatastatus_userid_fkey;
ALTER TABLE useraddress DROP CONSTRAINT IF EXISTS useraddress_userid_fkey;
ALTER TABLE email DROP CONSTRAINT IF EXISTS email_user_id_fkey;
ALTER TABLE groups DROP CONSTRAINT IF EXISTS groups_referrer_fkey;
ALTER TABLE usergroups DROP CONSTRAINT IF EXISTS usergroups_userid_fkey;
DROP TABLE Users;
CREATE TABLE Users
  (
    id            int           not null,
    username      varchar(256)  not null,
    password      varchar(120)  not null,
    surname       varchar(32),
    name          varchar(32),
    profile       int not null,
    organisation  varchar(128),
    kind          varchar(16),
    security      varchar(128)  default '',
    authtype      varchar(32),
    primary key(id),
    unique(username)
  );


-- Convert Profile column to the profile enumeration ordinal

INSERT INTO USERS SELECT * FROM USERS_TMP;
DROP TABLE USERS_TMP;


ALTER TABLE metadata ADD CONSTRAINT metadata_owner_fkey FOREIGN KEY (owner)
      REFERENCES users (id);
ALTER TABLE metadatastatus ADD CONSTRAINT metadatastatus_userid_fkey FOREIGN KEY (userid)
      REFERENCES users (id);
ALTER TABLE useraddress ADD CONSTRAINT useraddress_userid_fkey FOREIGN KEY (userid)
      REFERENCES users (id);
ALTER TABLE email ADD CONSTRAINT email_user_id_fkey FOREIGN KEY (user_id)
      REFERENCES users (id);
ALTER TABLE groups ADD CONSTRAINT groups_referrer_fkey FOREIGN KEY (referrer)
      REFERENCES users (id);


-- ----  Change notifier actions column to map to the MetadataNotificationAction enumeration

DROP TABLE MetadataNotifications;
CREATE TABLE MetadataNotifications
  (
    metadataId         int            not null,
    notifierId         int            not null,
    notified           char(1)        default 'n' not null,
    metadataUuid       varchar(250)   not null,
    action             int        not null,
    errormsg           text,
    primary key(metadataId,notifierId)
  );

-- ----  Change params querytype column to map to the LuceneQueryParamType enumeration

DROP TABLE Params;

CREATE TABLE Params
  (
    id          int           not null,
    requestId   int,
    queryType   int,
    termField   varchar(128),
    termText    varchar(128),
    similarity  float,
    lowerText   varchar(128),
    upperText   varchar(128),
    inclusive   char(1),
    primary key(id),
    foreign key(requestId) references Requests(id)
  );

-- ----  Change params querytype column to map to the LuceneQueryParamType enumeration

INSERT INTO Params SELECT * FROM Params_TEMP;
DROP TABLE Params_TEMP;

CREATE INDEX ParamsNDX1 ON Params(requestId);
CREATE INDEX ParamsNDX2 ON Params(queryType);
CREATE INDEX ParamsNDX3 ON Params(termField);
CREATE INDEX ParamsNDX4 ON Params(termText);

DELETE FROM Settings WHERE name like 'system/csw/contactInfo%';
DELETE FROM Settings WHERE name like 'system/csw/individualName';
DELETE FROM Settings WHERE name like 'system/csw/positionName';
DELETE FROM Settings WHERE name like 'system/csw/role';
DELETE FROM Settings WHERE name like 'system/csw/title';
DELETE FROM Settings WHERE name like 'system/csw/abstract';
DELETE FROM Settings WHERE name like 'system/csw/fees';
DELETE FROM Settings WHERE name like 'system/csw/accessConstraints';


INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('metadata/resourceIdentifierPrefix', 'http://localhost:8080/geonetwork/', 0, 10001, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/xlinkResolver/localXlinkEnable', 'true', 2, 2311, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('region/getmap/background', 'osm', 0, 9590, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('region/getmap/width', '500', 0, 9590, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('region/getmap/summaryWidth', '500', 0, 9590, 'n');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('region/getmap/mapproj', 'EPSG:3857', 0, 9590, 'n');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/proxy/ignorehostlist', NULL, 0, 560, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atom', 'disabled', 0, 7230, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atomSchedule', '0 0 0/24 ? * *', 0, 7240, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/inspire/atomProtocol', 'INSPIRE-ATOM', 0, 7250, 'y');
INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('system/metadata/prefergrouplogo', 'y', 0, 9111, 'y');

INSERT INTO Settings (name, value, datatype, position, internal) VALUES ('map/isMapViewerEnabled', 'false', 2, 9592, 'n');

UPDATE metadata SET schemaid = 'iso19139' WHERE schemaid = 'iso19139.eea';
SELECT setval('hibernate_sequence', (SELECT 1000 + max(id) FROM requests));


DROP TABLE spatialindex;

UPDATE Settings SET value='3.0.0' WHERE name='system/platform/version';
UPDATE Settings SET value='SNAPSHOT' WHERE name='system/platform/subVersion';

