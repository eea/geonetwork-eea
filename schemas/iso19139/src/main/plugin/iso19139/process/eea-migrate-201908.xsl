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
https://taskman.eionet.europa.eu/issues/104851

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

  <xsl:variable name="uuid"
                select="//gmd:fileIdentifier/gco:CharacterString"/>

  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA keyword list']/gmd:date/*/gmd:dateType/*/@codeListValue">
    <xsl:attribute name="codeListValue">publication</xsl:attribute>
  </xsl:template>

  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA categories']/gmd:date/*/gmd:dateType/*/@codeListValue">
    <xsl:attribute name="codeListValue">publication</xsl:attribute>
  </xsl:template>

  <!-- Convert CRS to TG2 encoding
  See D.4 Default Coordinate Reference Systems

  List comes from TG2 + some value used in GeoNetwork
  To be completed depending on the past usage for CRS encoding.
  -->
  <xsl:variable name="crsMap">
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">ETRS89-GRS80</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">ETRS 89 (EPSG:4258)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4936" label="EPSG:4936">ETRS89-XYZ</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4937" label="EPSG:4937">ETRS89-GRS80h</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">ETRS89 (EPSG:4258)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3034" label="EPSG:3034">ETRS89-LCC</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">ETRS89-LAEA</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">ETRS89-LAEA (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">ETRS 89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">ETRS89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3038" label="EPSG:3038">ETRS89-TM26N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3039" label="EPSG:3039">ETRS89-TM27N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3040" label="EPSG:3040">ETRS89-TM28N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3041" label="EPSG:3041">ETRS89-TM29N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3042" label="EPSG:3042">ETRS89-TM30N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3043" label="EPSG:3043">ETRS89-TM31N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3044" label="EPSG:3044">ETRS89-TM32N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3045" label="EPSG:3045">ETRS89-TM33N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3046" label="EPSG:3046">ETRS89-TM34N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3047" label="EPSG:3047">ETRS89-TM35N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3048" label="EPSG:3048">ETRS89-TM36N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3049" label="EPSG:3049">ETRS89-TM37N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3050" label="EPSG:3050">ETRS89-TM38N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3051" label="EPSG:3051">ETRS89-TM39N</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/7409" label="EPSG:7409">ETRS89-GRS80-EVRS</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/5730" label="EPSG:5730">EVRS</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/5861" label="EPSG:5861">LAT</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/5715" label="EPSG:5715">MSL</crs>
    <!-- It is not clear what label should be in this case? -->
    <crs code="http://codes.wmo.int/grib2/codeflag/4.2/_0-3-3" label="WMO:ISO">ISA</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS 1984</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS1984</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS 84 (EPSG:4326)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS84 (EPSG:4326)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS 84 (EPSG:4326)::EPSG</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">WGS84 (EPSG:4326)::EPSG</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32628" label="EPSG:32628">WGS 84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32628" label="EPSG:32628">WGS84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32740" label="EPSG:32740">WGS 84 / UTM zone 40S (EPSG:32740)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32740" label="EPSG:32740">WGS84 / UTM zone 40S (EPSG:32740)</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">urn:ogc:def:crs:EPSG:7.1:EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4258" label="EPSG:4258">urn:ogc:def:crs:EPSG:4258</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">urn:ogc:def:crs:EPSG:7.1:3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">urn:ogc:def:crs:EPSG:7.1:EPSG:3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/3035" label="EPSG:3035">urn:ogc:def:crs:EPSG::3035</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">urn:ogc:def:crs:EPSG:7.1:4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">urn:ogc:def:crs:EPSG:7.1:EPSG:4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/4326" label="EPSG:4326">urn:ogc:def:crs:EPSG::4326</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:7.1:EPSG:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:7.1:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32628" label="EPSG:32628">urn:ogc:def:crs:EPSG:32628</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:7.1:EPSG:32740</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:7.1:32740</crs>
    <crs code="http://www.opengis.net/def/crs/EPSG/0/32740" label="EPSG:32740">urn:ogc:def:crs:EPSG:32740</crs>
  </xsl:variable>

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
          <gmd:code>
            <gmx:Anchor xlink:href="{$newCrs/@code}"><xsl:value-of select="$newCrs/@label"/></gmx:Anchor>
          </gmd:code>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="gmd:code|gmd:codeSpace"/>
        </xsl:otherwise>
      </xsl:choose>
    </gmd:RS_Identifier>
  </xsl:template>


  <!-- update use limitation
  <xsl:template match="gmd:resourceConstraints">
    <xsl:if test="preceding-sibling::*[1]/name() != 'gmd:resourceConstraints'">
      <gmd:resourceConstraints>
        <gmd:MD_Constraints>
          <gmd:useLimitation>
            <gco:CharacterString>EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright). Copyright holder: European Environment Agency (EEA).</gco:CharacterString>
          </gmd:useLimitation>
        </gmd:MD_Constraints>
      </gmd:resourceConstraints>

       <gmd:resourceConstraints>
          <gmd:MD_LegalConstraints>
             <gmd:useConstraints>
                <gmd:MD_RestrictionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode"
                                        codeListValue="otherRestrictions"/>
             </gmd:useConstraints>
             <gmd:otherConstraints>
                <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply">No conditions apply to access and use</gmx:Anchor>
             </gmd:otherConstraints>
          </gmd:MD_LegalConstraints>
       </gmd:resourceConstraints>
       <gmd:resourceConstraints>
          <gmd:MD_LegalConstraints>
             <gmd:accessConstraints>
                <gmd:MD_RestrictionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode"
                                        codeListValue="otherRestrictions"/>
             </gmd:accessConstraints>
             <gmd:otherConstraints>
                <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations">No limitations to public access</gmx:Anchor>
             </gmd:otherConstraints>
          </gmd:MD_LegalConstraints>
       </gmd:resourceConstraints>
    </xsl:if>
  </xsl:template> -->

  <xsl:template match="gmd:resourceConstraints/*/gmd:otherConstraints[gco:CharacterString = 'no limitation' or gco:CharacterString = 'no limitations' or gco:CharacterString = 'No limitations']">
    <gmd:otherConstraints>
      <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations">No limitations to public access</gmx:Anchor>
    </gmd:otherConstraints>
  </xsl:template>


  <xsl:template match="gmd:resourceConstraints/*/gmd:otherConstraints[gco:CharacterString = 'no conditions apply']">
    <gmd:otherConstraints>
      <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/ConditionsApplyingToAccessAndUse/noConditionsApply">No conditions apply to access and use</gmx:Anchor>
    </gmd:otherConstraints>
  </xsl:template>

  <!-- Add the 2 inspire decimals ... -->
  <xsl:template match="gmd:EX_GeographicBoundingBox/*/gco:Decimal[matches(., '^(-?[0-9]+|[0-9]+.[0-9]{1})$')]">
    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:value-of select="format-number(., '#0.00')"/>
    </xsl:copy>
  </xsl:template>


  <xsl:template match="gmd:MD_Metadata/gmd:contact[*/gmd:organisationName/* = 'European Environment Agency']">
    <gmd:contact>
      <gmd:CI_ResponsibleParty>
        <gmd:organisationName>
          <gco:CharacterString>European Environment Agency</gco:CharacterString>
        </gmd:organisationName>
        <gmd:contactInfo>
          <gmd:CI_Contact>
            <gmd:address>
              <gmd:CI_Address>
                <gmd:deliveryPoint>
                  <gco:CharacterString>Kongens Nytorv 6</gco:CharacterString>
                </gmd:deliveryPoint>
                <gmd:city>
                  <gco:CharacterString>Copenhagen</gco:CharacterString>
                </gmd:city>
                <gmd:administrativeArea>
                  <gco:CharacterString>K</gco:CharacterString>
                </gmd:administrativeArea>
                <gmd:postalCode>
                  <gco:CharacterString>1050</gco:CharacterString>
                </gmd:postalCode>
                <gmd:country>
                  <gco:CharacterString>Denmark</gco:CharacterString>
                </gmd:country>
                <gmd:electronicMailAddress>
                  <gco:CharacterString>sdi@eea.europa.eu</gco:CharacterString>
                </gmd:electronicMailAddress>
              </gmd:CI_Address>
            </gmd:address>
          </gmd:CI_Contact>
        </gmd:contactInfo>
        <gmd:role>
          <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                           codeListValue="pointOfContact"/>
        </gmd:role>
      </gmd:CI_ResponsibleParty>
    </gmd:contact>
  </xsl:template>
  <!-- Do a copy of every nodes and attributes -->
  <xsl:template match="@*|node()|comment()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()|comment()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove geonet:* elements. -->
  <xsl:template match="geonet:*" priority="2"/>

</xsl:stylesheet>
