<?xml version="1.0" encoding="UTF-8"?>
<!--
  ~ Copyright (C) 2001-2016 Food and Agriculture Organization of the
  ~ United Nations (FAO-UN), United Nations World Food Programme (WFP)
  ~ and United Nations Environment Programme (UNEP)
  ~
  ~ This program is free software; you can redistribute it and/or modify
  ~ it under the terms of the GNU General Public License as published by
  ~ the Free Software Foundation; either version 2 of the License, or (at
  ~ your option) any later version.
  ~
  ~ This program is distributed in the hope that it will be useful, but
  ~ WITHOUT ANY WARRANTY; without even the implied warranty of
  ~ MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
  ~ General Public License for more details.
  ~
  ~ You should have received a copy of the GNU General Public License
  ~ along with this program; if not, write to the Free Software
  ~ Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301, USA
  ~
  ~ Contact: Jeroen Ticheler - FAO - Viale delle Terme di Caracalla 2,
  ~ Rome - Italy. email: geonetwork@osgeo.org
  -->

<!--
Stylesheet used to update metadata to improve validation.
https://taskman.eionet.europa.eu/issues/99253

Restore a backup
UPDATE metadata a SET data = (SELECT data FROM metadata20181010 b WHERE a.uuid= b.uuid);
-->
<xsl:stylesheet xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:srv="http://www.isotc211.org/2005/srv"
                xmlns:gmx="http://www.isotc211.org/2005/gmx"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:util="java:org.fao.geonet.util.XslUtil"
                xmlns:skos="http://www.w3.org/2004/02/skos/core#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:geonet="http://www.fao.org/geonetwork"
                exclude-result-prefixes="#all"
                version="2.0">

  <xsl:output indent="yes"/>

  <xsl:param name="thesauriDir" select="'/data/dev/gn/eea/web/src/main/webapp/WEB-INF/data/config/codelist'"/>

  <xsl:variable name="inspire-thesaurus"
                select="document(concat('file:///', replace($thesauriDir, '\\', '/'), '/external/thesauri/theme/httpinspireeceuropaeutheme-theme.rdf'))"/>
  <xsl:variable name="inspire-theme"
                select="$inspire-thesaurus//skos:Concept"/>

  <xsl:variable name="uuid"
                select="//gmd:fileIdentifier/gco:CharacterString"/>

  <xsl:variable name="defaultCharacterSet"
                select="'utf8'"/>

  <xsl:variable name="defaultLanguage"
                select="'eng'"/>

  <!-- ===============================================================
     - Rules that can apply to a migration from TG1.3 to TG2
     - =============================================================== -->

  <!-- Convert CRS to TG2 encoding
  See D.4 Default Coordinate Reference Systems

  List comes from TG2 + some value used in GeoNetwork
  To be completed depending on the past usage for CRS encoding.
  -->
  <xsl:variable name="crsMap">
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">ETRS89-GRS80</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">ETRS 89 (EPSG:4258)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4936" label="EPSG:4936">ETRS89-XYZ</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4937" label="EPSG:4937">ETRS89-GRS80h</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">ETRS89 (EPSG:4258)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3034" label="EPSG:3034">ETRS89-LCC</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">ETRS89-LAEA</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">ETRS89-LAEA (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">ETRS 89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">ETRS89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3038" label="EPSG:3038">ETRS89-TM26N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3039" label="EPSG:3039">ETRS89-TM27N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3040" label="EPSG:3040">ETRS89-TM28N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3041" label="EPSG:3041">ETRS89-TM29N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3042" label="EPSG:3042">ETRS89-TM30N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3043" label="EPSG:3043">ETRS89-TM31N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3044" label="EPSG:3044">ETRS89-TM32N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3045" label="EPSG:3045">ETRS89-TM33N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3046" label="EPSG:3046">ETRS89-TM34N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3047" label="EPSG:3047">ETRS89-TM35N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3048" label="EPSG:3048">ETRS89-TM36N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3049" label="EPSG:3049">ETRS89-TM37N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3050" label="EPSG:3050">ETRS89-TM38N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3051" label="EPSG:3051">ETRS89-TM39N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:7409" label="EPSG:7409">ETRS89-GRS80-EVRS</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:5730" label="EPSG:5730">EVRS</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:5861" label="EPSG:5861">LAT</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:5715" label="EPSG:5715">MSL</crs>
    <!-- It is not clear what label should be in this case? -->
    <crs code="http://codes.wmo.int/grib2/codeflag/4.2/_0-3-3" label="WMO:ISO">ISA</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS 1984</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS1984</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS 84 (EPSG:4326)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS84 (EPSG:4326)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS 84 (EPSG:4326)::EPSG</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">WGS84 (EPSG:4326)::EPSG</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32628" label="EPSG:32628">WGS 84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32628" label="EPSG:32628">WGS84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32740" label="EPSG:32740">WGS 84 / UTM zone 40S (EPSG:32740)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32740" label="EPSG:32740">WGS84 / UTM zone 40S (EPSG:32740)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">urn:ogc:def:crs:EPSG:7.1:EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4258" label="EPSG:4258">urn:ogc:def:crs:EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">urn:ogc:def:crs:EPSG:7.1:3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">urn:ogc:def:crs:EPSG:7.1:EPSG:3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:3035" label="EPSG:3035">urn:ogc:def:crs:EPSG::3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">urn:ogc:def:crs:EPSG:7.1:4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">urn:ogc:def:crs:EPSG:7.1:EPSG:4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:4326" label="EPSG:4326">urn:ogc:def:crs:EPSG::4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:7.1:EPSG:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:7.1:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:7.1:EPSG:32740</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:7.1:32740</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/EPSG:32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:32740</crs>
  </xsl:variable>


  <!-- INSPIRE Themes / Fix date of the thesaurus

  Validator error report:
  * The content "2018-05-25" of element <DateOfPublication> does not match the required
   simple type. Value "2018-05-25" contravenes the enumeration facet "2008-06-01" of
   the type of element DateOfPublication at column 66, line 10 (GEMET - INSPIRE themes, version 1.0)
   * The metadata record has keywords which originate from a controlled vocabulary
   'GEMET - INSPIRE themes, version 1.0', but the date or date type is not correct.
   Date should be '2008-06-01' and date type 'publication'. The keywords are:
   Area management/restriction/regulation zones and reporting units.

  See https://github.com/geonetwork/core-geonetwork/issues/2500#issuecomment-427818239
  for details -->
  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'GEMET - INSPIRE themes, version 1.0']
                        /gmd:date/*/gmd:date/gco:Date[. = '2018-05-25']/text()">2008-06-01</xsl:template>




  <!-- INSPIRE Themes / Add Anchor to thesaurus title

   Validator error report:
   * Missing or wrong Originating Controlled Vocabulary URI - URI needs to be 'http://www.eionet.europa.eu/gemet/inspire_themes'
   -->
  <xsl:template match="gmd:thesaurusName/*/gmd:title/gco:CharacterString[. = 'GEMET - INSPIRE themes, version 1.0']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Theme / Adding Anchor for INSPIRE thesaurus title.</xsl:message>

    <gmx:Anchor xlink:href="http://www.eionet.europa.eu/gemet/inspire_themes">GEMET - INSPIRE themes, version 1.0</gmx:Anchor>
  </xsl:template>




  <!-- INSPIRE Themes / Encode keyword using Anchor
   Validator error report:
   * Missing or wrong Keyword URI - URI needs to be 'http://inspire.ec.europa.eu/theme/am'
  -->
  <xsl:template match="gmd:descriptiveKeywords/*[
                          gmd:thesaurusName/*/gmd:title/* = 'GEMET - INSPIRE themes, version 1.0']
                        /gmd:keyword/gco:CharacterString">
    <xsl:variable name="theme"
                  select="."/>
    <xsl:variable name="url"
                  select="$inspire-theme[skos:prefLabel = $theme]/@rdf:about"/>
    <xsl:choose>
      <xsl:when test="$url != ''">
        <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Theme / Using Anchor for '<xsl:value-of select="$theme"/>'.</xsl:message>
        <gmx:Anchor>
          <xsl:attribute name="xlink:href"><xsl:value-of select="$url"/></xsl:attribute>
          <xsl:value-of select="$theme"/>
        </gmx:Anchor>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message>Record <xsl:value-of select="$uuid"/> [CHECK] Theme '<xsl:value-of select="$theme"/>' not found in INSPIRE thesaurus. Keeping it.</xsl:message>
        <xsl:copy-of select="."/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <!-- Coordinate reference system

   Validator error report:
   * The metadata record references none of the expected coordinate reference systems.
   The following reference system code have been referenced:
   'urn:ogc:def:crs:EPSG::4326'. Please refer to table 2 of the data specification
   for the list of expected coordinate reference system codes.

   Replace CharacterString with Anchor.
   Replace old label by EPSG:code only

   -->
  <xsl:template match="gmd:referenceSystemIdentifier/gmd:RS_Identifier[gmd:code/gco:CharacterString = $crsMap/crs/text()]">
    <xsl:variable name="code" select="gmd:code/gco:CharacterString"/>
    <xsl:variable name="newCrs" select="$crsMap/crs[text() = $code]"/>

    <gmd:RS_Identifier>
      <xsl:choose>
        <xsl:when test="$newCrs != ''">
          <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] CRS / Using Anchor for '<xsl:value-of select="$code"/>'.</xsl:message>
          <gmd:code>
            <gmx:Anchor xlink:href="{$newCrs/@code}"><xsl:value-of select="$newCrs/@label"/></gmx:Anchor>
          </gmd:code>
        </xsl:when>
        <xsl:otherwise>
          <xsl:message>Record <xsl:value-of select="$uuid"/> [CHECK] CRS '<xsl:value-of select="$code"/>' not found CRS table. Keeping it.</xsl:message>
          <xsl:apply-templates select="gmd:code|gmd:codeSpace"/>
        </xsl:otherwise>
      </xsl:choose>
    </gmd:RS_Identifier>
  </xsl:template>


  <!--
  Some records do not have resource character set defined.
  Some records do not have resource language defined.

  Adding UTF-8 by default when missing.
  Adding eng by default when missing.

  This rule expect a topicCategory to be set as it is used for the insertion.
  -->
  <xsl:template match="gmd:MD_DataIdentification/gmd:topicCategory[1]">

    <xsl:choose>
      <xsl:when test="count(preceding-sibling::*[name() = 'gmd:language']) = 0">
        <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Adding a default resource language preceding characterSet and the topic category '<xsl:value-of select="*/text()"/>'.</xsl:message>

        <gmd:language>
          <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="{$defaultLanguage}"/>
        </gmd:language>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="../gmd:language"/>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:choose>
      <xsl:when test="count(preceding-sibling::*[name() = 'gmd:characterSet']) = 0">
        <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Adding a default UTF8 character set before the topic category '<xsl:value-of select="*/text()"/>'.</xsl:message>
        <gmd:characterSet>
          <gmd:MD_CharacterSetCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/codelist/ML_gmxCodelists.xml#MD_CharacterSetCode"
                                   codeListValue="{$defaultCharacterSet}"/>
        </gmd:characterSet>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy-of select="../gmd:characterSet"/>
      </xsl:otherwise>
    </xsl:choose>

    <xsl:copy-of select="."/>
  </xsl:template>

  <xsl:template match="gmd:MD_DataIdentification/gmd:characterSet|gmd:MD_DataIdentification/gmd:language"/>


  <!-- ===============================================================
     - Rules that apply to EEA records only
     - =============================================================== -->

  <!--
  Some EEA records have contact without email addresse

  Log a message here - this requires a manual fix.

  Validator error report:
  * In content of element <ResponsibleParty>: The content is incomplete. Expected <Q{.../1.0}EmailAddress>.
   at column 32, line 75
  * Each point of contact (within the identification info) of a metadata record must have at least on electronic mail address.
   The metadata record does not fulfill this requirement.
  -->
  <xsl:template match="gmd:CI_ResponsibleParty[normalize-space(gmd:contactInfo/*/gmd:address/*/gmd:electronicMailAddress/*) = '']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [MANUAL FIX] CI_ResponsibleParty '<xsl:value-of select="gmd:organisationName/*"/>' do not have email address.</xsl:message>
  </xsl:template>


  <!--
  Some EEA records have self closing reports
  eg.
   <gmd:report/>
   or eg. e74c9c01-1196-4617-86d6-3aec385927e7
   <gmd:report>
      <gmd:DQ_DomainConsistency/>
   </gmd:report>

  Removing them.

  Validator error report:
  * The gmd:DQ_ConformanceResult has an element gmd:pass that must contain a value of type gco:Boolean.
  This metadata record does not contain such a value.
  -->
  <xsl:template match="gmd:report[count(*) = 0]|gmd:report[gmd:DQ_DomainConsistency/count(*) = 0]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an empty DQ report.</xsl:message>
  </xsl:template>

  <!--
  Some EEA records have self closing contact
  eg.
  <gmd:contact/>
  -->
  <xsl:template match="gmd:contact[count(*) = 0]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an empty contact.</xsl:message>
  </xsl:template>


  <!--
  Some EEA records have self closing distributionFormats
  eg.
  <gmd:distributionFormat/>

  Removing them.

  Validator error report:
  * Every metadata record must document the encoding in which the dataset is available and specify the name,
  version and specification of the encoding, but this record does not have the 'name' property.
  * Every metadata record must document the encoding in which the dataset is available and specify the name,
  version and specification of the encoding, but this record does not have the 'version' property.
  -->
  <xsl:template match="gmd:distributionFormat[count(*) = 0]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an empty distributionFormat.</xsl:message>
  </xsl:template>


  <!--
  Some EEA records have self closing distributionFormats
  eg.
  <gmd:distributionFormat/>

  Removing them.

  Validator error report:
  * [ISOFTDS19139:2005-TableA1] - HierarchyLevelName must be documented if hierarchyLevel does not contain "dataset"
    hierarchyLevelName must be documented if hierarchyLevel does not contain 'dataset'
  -->
  <xsl:template match="gmd:hierarchyLevel[*/@codeListValue != 'dataset' and count(../hierarchyLevelName) = 0]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Missing hierarchy level name.</xsl:message>
    <xsl:copy-of select="."/>
    <gmd:hierarchyLevelName>
      <gco:CharacterString><xsl:value-of select="*/@codeListValue"/></gco:CharacterString>
    </gmd:hierarchyLevelName>
  </xsl:template>



  <!--
  Some EEA records contains a LI_Source element which then trigger

  Removing them.

  Validator error report:
  [ISOFTDS19139:2005-TableA1-Row13] - Description required if no sourceExtent
  'description' is mandatory if 'sourceExtent' is not documented.
  Suggestions: Add a description or/and a source extent.
  -->
  <xsl:template match="gmd:LI_Source[count(*) = 0]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an empty LI_Source.</xsl:message>
  </xsl:template>

  <!--
  Some EEA records contains empty otherCitationDetails

                     <gmd:otherCitationDetails>
                        <gmx:Anchor xmlns:gmx="http://www.isotc211.org/2005/gmx" xlink:href=""/>
                     </gmd:otherCitationDetails>

  Removing them.
  -->
  <xsl:template match="gmd:otherCitationDetails[gmx:Anchor = '']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an empty LI_Source.</xsl:message>
  </xsl:template>



  <!--
  Some EEA records contains HTML tag in the middle of text

  Removing them.

  Element 'gco:CharacterString' is a simple type, so it must have no element
  information item [children]. (Element: gco:CharacterString with parent element: gmd:abstract)
  -->
  <xsl:template match="br">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Removing an HTML tag '<xsl:value-of select="name(.)"/>'.</xsl:message>
  </xsl:template>

  <!--
  Some EEA records have content Info after distribution Info. This is wrong.
  eg. fe355506-b74e-43d5-82c4-ec3467d514d8

  Invalid content was found starting with element 'gmd:contentInfo'.
  One of '{"http://www.isotc211.org/2005/gmd":dataQualityInfo,
   "http://www.isotc211.org/2005/gmd":portrayalCatalogueInfo,
   "http://www.isotc211.org/2005/gmd":metadataConstraints,
   "http://www.isotc211.org/2005/gmd":applicationSchemaInfo,
   "http://www.isotc211.org/2005/gmd":metadataMaintenance,
   "http://www.isotc211.org/2005/gmd":series,
   "http://www.isotc211.org/2005/gmd":describes,
   "http://www.isotc211.org/2005/gmd":propertyType,
   "http://www.isotc211.org/2005/gmd":featureType,
   "http://www.isotc211.org/2005/gmd":featureAttribute}' is expected.
   (Element: gmd:contentInfo with parent element: gmd:MD_Metadata)
  -->
  <xsl:template match="gmd:distributionInfo[following-sibling::gmd:contentInfo]">
    <xsl:apply-templates select="following-sibling::gmd:contentInfo"/>
    <xsl:copy>
      <xsl:apply-templates select="@*|*"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template match="gmd:contentInfo[preceding-sibling::gmd:distributionInfo]"/>





  <!-- Some EEA records have empty EX_GeographicDescription
   eg. c6d98fda-796e-40c0-b953-d716a8db1df5

   Removing them.

   -->
  <xsl:template match="gmd:geographicElement/gmd:EX_GeographicDescription[count(*) = 0]"/>
  <xsl:template match="gmd:geographicElement[count(*) = 0]"/>



  <!-- Some EEA records have empty DQ reports
   eg. d44f2631-79d9-401d-80ce-ca0c0ffb3fef

   Removing them.

   -->
  <xsl:template match="gmd:report[*/gmd:result/*/gmd:specification/*/gmd:title/* = '']"/>


  <xsl:template match="gmd:pass[gco:Boolean = '']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [CLEANING] Not evaluated use nilReason unknown.</xsl:message>
    <gmd:pass gco:nilReason="unknown"/>
  </xsl:template>




  <!--
  Some EEA records have reference to EEA categories/keyword list which does not set the thesaurus date.

  eg.
    <gmd:CI_Citation>
      <gmd:title>
        <gco:CharacterString>EEA categories</gco:CharacterString>
      </gmd:title>
      <gmd:date>
        <gmd:CI_Date>
          <gmd:date>
           <gco:Date/>

  Validator error report:
  The content "" of element <Date> does not match the required simple type. Value ""
  does not match any member of union type Date_Type at column 42, line 523
  -->

  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA categories']/gmd:date/*/gmd:date/gco:Date[. = '']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] EEA categories / Set thesaurus date value.</xsl:message>

    <gco:Date>2010-07-06</gco:Date>
  </xsl:template>

  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA keyword list']/gmd:date/*/gmd:date/gco:Date[. = '']">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] EEA keyword list / Set thesaurus date value.</xsl:message>

    <gco:Date>2002-03-01</gco:Date>
  </xsl:template>




  <!--
  Some EEA records have missing format version
  eg. 74421f48-e62d-411b-b01e-5466a2cb955a
         <gmd:distributionFormat>
            <gmd:MD_Format>
               <gmd:name>
                  <gco:CharacterString>SQLite</gco:CharacterString>
               </gmd:name>
            </gmd:MD_Format>
         </gmd:distributionFormat>
         -->
  <xsl:template match="gmd:distributionFormat/*[not(gmd:version)]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Missing format version.</xsl:message>

    <xsl:copy>
      <xsl:apply-templates select="gmd:name"/>

      <gmd:version gco:nilReason="missing">
        <gco:CharacterString/>
      </gmd:version>
    </xsl:copy>
  </xsl:template>



  <!--
  Some EEA records have 2 formats mixed in same distributionFormat
  eg. e16f6034-0de1-4c37-9606-b5590df1d2e5

         -->
  <xsl:template match="gmd:distributionFormat[count(gmd:MD_Format) > 1]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Split format in same distribution format.</xsl:message>

    <xsl:for-each select="gmd:MD_Format">
      <gmd:distributionFormat>
        <xsl:apply-templates select="."/>
      </gmd:distributionFormat>
    </xsl:for-each>
  </xsl:template>

  <!--
  Some EEA records have spatialResolution inside spatialResolution !
  eg. 16c57e11-9b6d-4250-bb38-1986690079e5


         <gmd:spatialResolution>
            <gmd:MD_Resolution>
               <gmd:equivalentScale>
                  <gmd:MD_RepresentativeFraction>
                     <gmd:denominator>
                        <gco:Integer>1000000</gco:Integer>
                     </gmd:denominator>
                  </gmd:MD_RepresentativeFraction>
               </gmd:equivalentScale>
            </gmd:MD_Resolution>
            <gmd:spatialResolution>
               <gmd:MD_Resolution>
                  <gmd:equivalentScale>
                     <gmd:MD_RepresentativeFraction>
                        <gmd:denominator>
                           <gco:Integer>3000000</gco:Integer>
                        </gmd:denominator>
                     </gmd:MD_RepresentativeFraction>
                  </gmd:equivalentScale>
               </gmd:MD_Resolution>
            </gmd:spatialResolution>
            <gmd:spatialResolution>

         -->
  <xsl:template match="gmd:spatialResolution[gmd:spatialResolution]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Move spatial resolution to identification info.</xsl:message>

    <xsl:copy-of select="gmd:spatialResolution"/>
    <xsl:copy>
      <xsl:copy-of select="gmd:MD_Resolution"/>
    </xsl:copy>
  </xsl:template>




  <!--
  Some EEA records have invalid datetime in date
  eg. 74421f48-e62d-411b-b01e-5466a2cb955a
 The value '2011-05-31T12:00:00' of element 'gco:Date' is not valid. (Element: gco:Date with parent element: gmd:date)
         -->
  <xsl:template match="gco:Date[contains(., 'T')]">
    <xsl:message>Record <xsl:value-of select="$uuid"/> [FIX] Date time encoded in a date field.</xsl:message>
    <gco:DateTime><xsl:value-of select="."/></gco:DateTime>
  </xsl:template>



  <!--
  Errors with no fix for now.

  Validator error report:
  * The gmd:DQ_ConformanceResult has an element gmd:pass that must contain a value of type gco:Boolean.
  This metadata record does not contain such a value.
  EEA record contains <gmd:pass gco:nilReason="unknown"/> which is correct for Not Evaluated.


  * A dataset (series) metadata record must have a valid bounding box that defines the extent
   of the resource in geographic space. The bounding box is valid if: 1) it has four coordinates
   (given in decimal degree with a precision of at least 2 decimals), 2) both west- and east-bound
   longitude are greater than or equal to 180.00, and smaller than or equal to 180.00, 3) both
   south and north-bound latitude are greater than or equal to -90.00, and smaller than or
   equal to 90.00, 4) south-bound latitude is smaller than or equal to north-bound latitude.
    At least one of these criteria is not fulfilled for one of the geographic bounding boxes
    of this metadata record. The provided values of this bounding box are: west-bound
    longitude = '-31.27', east-bound longitude = '62', south-bound latitude = '28',
    north-bound latitude = '81'.

    Adding decimal 81.00 fix the report.

          <gmd:geographicElement>
            <gmd:EX_GeographicBoundingBox>
              <gmd:westBoundLongitude>
                <gco:Decimal>-31.27</gco:Decimal>
              </gmd:westBoundLongitude>
              <gmd:eastBoundLongitude>
                <gco:Decimal>62.00</gco:Decimal>
              </gmd:eastBoundLongitude>
              <gmd:southBoundLatitude>
                <gco:Decimal>28.00</gco:Decimal>
              </gmd:southBoundLatitude>
              <gmd:northBoundLatitude>
                <gco:Decimal>81.00</gco:Decimal>
              </gmd:northBoundLatitude>
            </gmd:EX_GeographicBoundingBox>
          </gmd:geographicElement>

   Do we really need to add ".00" for the validator not to complain?

   Related report: https://github.com/geonetwork/core-geonetwork/issues/2229
  -->



  <!-- Do a copy of every nodes and attributes -->
  <xsl:template match="@*|node()|comment()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()|comment()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove geonet:* elements. -->
  <xsl:template match="geonet:*" priority="2"/>


  <!--
  Requires manual check:

  Identification
  INSPIRE - Resource locator is mandatory if linkage is available See advanved view /
  distribution section / only resource element. Implementing instructions: Specify a
  valid URL to the resource. If no direct link to a resource is available,
  provide link to a contact point where more information about the resource is available.
  For a service, the Resource Locator might be one of the following: A link to the
  service capabilities document; A link to the service WSDL document (SOAP Binding);
  A link to a web page with further instructions A link to a client application that
  directly accesses the service

  eg. 84e3a274-beff-40c1-bb40-c97afb8473d6



  Constraints related to access and use
  The value of 'accessConstraints' must be 'otherRestrictions', if there are instances
  of 'otherConstraints' expressing limitations on public access. Check access constraints
   list and other constraints text field.
  eg. f78beb69-bd26-4d53-b761-07fb05007d92

  -->
</xsl:stylesheet>
