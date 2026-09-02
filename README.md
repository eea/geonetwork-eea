# GeoNetwork opensource

[![LFX Health Score](https://insights.linuxfoundation.org/api/badge/health-score?project=geonetwork-core-geonetwork)](https://insights.linuxfoundation.org/project/geonetwork-core-geonetwork) [![LFX Active Contributors](https://insights.linuxfoundation.org/api/badge/active-contributors?project=geonetwork-core-geonetwork)](https://insights.linuxfoundation.org/project/geonetwork-core-geonetwork)

[![Build Status](https://github.com/geonetwork/core-geonetwork/actions/workflows/linux.yml/badge.svg?branch=main)](https://github.com/geonetwork/core-geonetwork/actions/workflows/linux.yml?query=branch%3Amain) [![OpenSSF Best Practices](https://www.bestpractices.dev/projects/8626/badge)](https://www.bestpractices.dev/projects/8626)  [![CLA assistant](https://cla-assistant.io/readme/badge/geonetwork/geonetwork)](https://cla-assistant.io/geonetwork/geonetwork)

## Features

* Immediate search access to local and distributed geospatial catalogues
* Uploading and downloading of data, graphics, documents, pdf files and any other content type
* An interactive Web Map Viewer to combine Web Map Services from distributed servers around the world
* Online editing of metadata with a powerful template system
* Scheduled harvesting and synchronization of metadata between distributed catalogs
* Support for OGC-CSW 2.0.2, ISO 1911x and DCAT-AP metadata profiles, OAI-PMH, SRU protocols
* Fine-grained access control with group and user management
* Multi-lingual user interface

## Documentation

The GeoNetwork Manual and Online Help are included in the `docs/manual` folder. This content is compiled into html pages during a release for a publishing on docs.geonetwork-opensource.org website.

* [docs.geonetwork-opensource.org](https://docs.geonetwork-opensource.org)

The online help is compiled into html pages during a release and is included in the `war` web archive.

## Developer Documentation

Developer documentation located in ``README.md`` files in the code-base:

* General documentation for the project as a whole is in this [README.md](README.md)
* [Software Development Documentation](/software_development/) provides instructions for setting up a development environment, building GeoNetwork, compiling user documentation, and making a releases.
* Module specific documentation can be found in each module


## EEA GeoNetwork

EEA GeoNetwork is a customised version of GeoNetwork opensource. It includes specific features and configurations for the European Environment Agency (EEA) and its partners.
It runs GeoNetwork 5 on top of GeoNetwork 4 and Nextcloud for file sharing.

GeoNetwork 5 act as the main entry point and takes care of:
* Authentication against EEA LDAP
* Datastore file upload
* Data analysis
* And then proxy all other API calls to GeoNetwork 4

EEA GeoNetwork is based on GeoNetwork 4.4.x versions. Main customizations are:
* [Nextcloud integration for file sharing and datastore](services/src/main/java/org/fao/geonet/util/nextcloud)
* [EEA editor configuration](schemas/iso19115-3.2018/src/main/plugin/iso19115-3.2018/layout/config-editor.xml#L653C6-L653C10)

### GeoNetwork 4 with Java 11

Build and run:

```shell
git clone --recursive git@github.com:eea/geonetwork-eea.git
cd geonetwork-eea
git checkout -b eea-4.9.x origin/eea-4.9.x
mvn clean install -DskipTests
jetty:run -Des.host=localhost -Des.index.records=eea-records \
   -Ddb.type=postgres -Ddb.port=5432 -Ddb.name=eea -Ddb.username=www-data -Ddb.password=www-data \
   -Dgeonetwork.security.type=gn5 \
   -Dgeonetwork.data.dir=/dev/geonetwork-eea/eea/nextcloud/datashare/external/cataloguestore/metadata_data
```

In `config.properties`, set Nextcloud connection parameters:

```properties
nextcloud.url=http://localhost:88
nextcloud.username=admin
nextcloud.password=admin
nextcloud.base.folder=/dev/geonetwork-eea/eea/nextcloud/datashare
nextcloud.datastore.path=/external/datastore/
nextcloud.cataloguestore.path=/external/cataloguestore/metadata_data
nextcloud.shareUrl.prefix=
nextcloud.internalShare.groups=eea-staff,eionet-group-sdi
```


### GeoNetwork 5 with Java 20

Build:
```shell
git clone --recursive git@github.com:eea/geonetwork5-eea.git
cd geonetwork5-eea
git checkout -b eea-5.0.x origin/eea-5.0.x
mvn clean install
```


Configuration:
```shell
GEONETWORK_4_URL=http://localhost:8080/geonetwork;
GEONETWORK_URL=http://localhost:8282;
SERVER_PORT=8282;
SERVER_SERVLET_CONTEXT-PATH=/geonetwork;
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/eea
GEONETWORK_DIRECTORY_DATA=/dev/geonetwork-eea/eea/nextcloud/datashare/external/cataloguestore
GEONETWORK_DIRECTORY_METADATA_LAYOUT=UUID
GEONETWORK_DIRECTORY_PRIVILEGES=NONE
GEONETWORK_SECURITY_PROVIDER=ldap
GEONETWORK_SECURITY_CREATEDUSER_PROFILE=Editor
GEONETWORK_SECURITY_CREATEDUSER_GROUP=XYZ
GEONETWORK_SECURITY_LDAP_URL=ldaps://ldap.A.B.C
GEONETWORK_SECURITY_LDAP_BASE=o=XYZ,l=XYZ
GEONETWORK_SECURITY_LDAP_USER-SEARCH-DN=ou=Users
GEONETWORK_SECURITY_LDAP_USER-SEARCH-FILTER=(&( |(objectclass=XYZ))(|(uid={0})(|(mailPrimaryAddress={0})(mail={0}))))
GEONETWORK_SECURITY_LDAP_ATTRIBUTES_USERNAME=uid
GEONETWORK_SECURITY_LDAP_ATTRIBUTES_EMAIL=email
GEONETWORK_SECURITY_LDAP_ATTRIBUTES_NAME=givenName
GEONETWORK_SECURITY_LDAP_ATTRIBUTES_SURNAME=sn
```

Access: http://localhost:8282/geonetwork


### Nextcloud


```shell
mkdir datashare
mkdir -p datashare/external/cataloguestore
mkdir -p datashare/external/datastore/public
docker run  \
 -e NEXTCLOUD_ADMIN_USER=admin \
 -e NEXTCLOUD_ADMIN_PASSWORD=admin \
 -e OVERWRITEWEBROOT=/ \
  -p 88:80 \
  -u 1000:1000 \
  -v ./datashare:/var/www/html \
  --name=nextcloud --rm  \
  nextcloud
```

Access: http://localhost:88/
