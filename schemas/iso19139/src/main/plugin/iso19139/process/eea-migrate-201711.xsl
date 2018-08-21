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
Stylesheet used to update metadata adding a reference to a parent record.
-->
<xsl:stylesheet xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:srv="http://www.isotc211.org/2005/srv"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:geonet="http://www.fao.org/geonetwork"
                version="2.0">

  <xsl:output indent="yes"/>

  <!-- Convert CRS to EEA encoding -->
  <xsl:variable name="crsMap">
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4258">EPSG:4258</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4258">ETRS 89 (EPSG:4258)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4258">ETRS89 (EPSG:4258)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:3035">ETRS 89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:3035">ETRS89 / LAEA Europe (EPSG:3035)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS 1984</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS1984</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS 84 (EPSG:4326)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS84 (EPSG:4326)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS 84 (EPSG:4326)::EPSG</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:4326">WGS84 (EPSG:4326)::EPSG</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:32628">WGS 84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:32628">WGS84 / UTM zone 28N (EPSG:32628)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:32740">WGS 84 / UTM zone 40S (EPSG:32740)</crs>
    <crs code="urn:ogc:def:crs:EPSG:7.1:EPSG:32740">WGS84 / UTM zone 40S (EPSG:32740)</crs>
  </xsl:variable>

  <xsl:template match="gmd:RS_Identifier[gmd:code/gco:CharacterString = $crsMap/crs/text()]">
    <xsl:variable name="code" select="gmd:code/gco:CharacterString"/>
    <gmd:RS_Identifier>
      <gmd:code>
        <gco:CharacterString><xsl:value-of select="$crsMap/crs[text() = $code]/@code"/></gco:CharacterString>
      </gmd:code>
      <gmd:codeSpace>
        <gco:CharacterString>OGP Surveying &amp; Positioning Committee</gco:CharacterString>
      </gmd:codeSpace>
    </gmd:RS_Identifier>
  </xsl:template>


  <!-- Convert Mauro email to generic mailbox
   sdi@eea.europa.eu
   -->
  <xsl:template match="gmd:electronicMailAddress/gco:CharacterString[. = 'mauro.michielon@eea.europa.eu']">
    <xsl:copy>sdi@eea.europa.eu</xsl:copy>
  </xsl:template>

  <!-- Add INSPIRE conformity -->
  <xsl:template match="gmd:lineage">
    <xsl:if test="count(../gmd:report[contains(*/gmd:result/*/gmd:specification/*/gmd:title/gco:CharacterString, '1089/2010 of 23 November 2010')]) = 0">
      <gmd:report>
        <gmd:DQ_DomainConsistency>
          <gmd:result>
            <gmd:DQ_ConformanceResult>
              <gmd:specification>
                <gmd:CI_Citation>
                  <gmd:title>
                    <gco:CharacterString>Commission Regulation (EU) No 1089/2010 of 23 November 2010 implementing Directive 2007/2/EC of the European Parliament and of the Council as regards interoperability of spatial data sets and services</gco:CharacterString>
                  </gmd:title>
                  <gmd:date>
                    <gmd:CI_Date>
                      <gmd:date>
                        <gco:Date>2010-12-08</gco:Date>
                      </gmd:date>
                      <gmd:dateType>
                        <gmd:CI_DateTypeCode codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode"
                                             codeListValue="publication"/>
                      </gmd:dateType>
                    </gmd:CI_Date>
                  </gmd:date>
                </gmd:CI_Citation>
              </gmd:specification>
              <gmd:explanation>
                <gco:CharacterString>See the referenced specification</gco:CharacterString>
              </gmd:explanation>
              <gmd:pass gco:nilReason="unknown"/>
            </gmd:DQ_ConformanceResult>
          </gmd:result>
        </gmd:DQ_DomainConsistency>
      </gmd:report>
    </xsl:if>

    <xsl:copy-of select="."/>
  </xsl:template>


  <!-- Remove parent identifier and move it
  to an aggregate with initiative type = series-->
  <xsl:template match="gmd:parentIdentifier"/>

  <xsl:template match="gmd:identificationInfo/*">
    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates select="gmd:citation"/>
      <xsl:apply-templates select="gmd:abstract"/>
      <xsl:apply-templates select="gmd:purpose"/>
      <xsl:apply-templates select="gmd:credit"/>
      <xsl:apply-templates select="gmd:status"/>
      <xsl:apply-templates select="gmd:pointOfContact"/>
      <xsl:apply-templates select="gmd:resourceMaintenance"/>
      <xsl:apply-templates select="gmd:graphicOverview"/>
      <xsl:apply-templates select="gmd:resourceFormat"/>
      <xsl:apply-templates select="gmd:descriptiveKeywords"/>
      <xsl:apply-templates select="gmd:resourceSpecificUsage"/>
      <xsl:apply-templates select="gmd:resourceConstraints"/>

      <xsl:apply-templates select="gmd:aggregationInfo"/>

      <xsl:variable name="parentIdentifier"
                    select="../../gmd:parentIdentifier/*[. != '']"/>
      <xsl:if test="$parentIdentifier != ''">
        <xsl:call-template name="make-aggregate">
          <xsl:with-param name="uuid" select="$parentIdentifier"/>
          <xsl:with-param name="context" select="."/>
          <xsl:with-param name="associationType" select="'series'"/>
          <xsl:with-param name="initiativeType" select="''"/>
        </xsl:call-template>
      </xsl:if>

      <xsl:apply-templates select="gmd:spatialRepresentationType"/>
      <xsl:apply-templates select="gmd:spatialResolution"/>
      <xsl:apply-templates select="gmd:language"/>
      <xsl:apply-templates select="gmd:characterSet"/>
      <xsl:apply-templates select="gmd:topicCategory"/>
      <xsl:apply-templates select="gmd:environmentDescription"/>
      <xsl:apply-templates select="gmd:extent"/>
      <xsl:apply-templates select="gmd:supplementalInformation"/>

      <xsl:apply-templates select="srv:*"/>

      <xsl:apply-templates select="*[namespace-uri()!='http://www.isotc211.org/2005/gmd' and
                                     namespace-uri()!='http://www.isotc211.org/2005/srv']"/>
    </xsl:copy>
  </xsl:template>

  <xsl:template name="make-aggregate">
    <xsl:param name="uuid"/>
    <xsl:param name="context"/>
    <xsl:param name="initiativeType" select="''" required="no"/>
    <xsl:param name="associationType" select="''" required="no"/>

    <xsl:variable name="notExist" select="count($context/gmd:aggregationInfo/gmd:MD_AggregateInformation[
      gmd:aggregateDataSetIdentifier/gmd:MD_Identifier/gmd:code/gco:CharacterString = $uuid
      and gmd:associationType/gmd:DS_AssociationTypeCode/@codeListValue = $associationType
      and gmd:initiativeType/gmd:DS_InitiativeTypeCode/@codeListValue = $initiativeType
      ]) = 0"/>
    <xsl:if test="$notExist">
      <gmd:aggregationInfo>
        <gmd:MD_AggregateInformation>
          <gmd:aggregateDataSetIdentifier>
            <gmd:MD_Identifier>
              <gmd:code>
                <gco:CharacterString>
                  <xsl:value-of select="$uuid"/>
                </gco:CharacterString>
              </gmd:code>
            </gmd:MD_Identifier>
          </gmd:aggregateDataSetIdentifier>
          <gmd:associationType>
            <gmd:DS_AssociationTypeCode
              codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/codelist/ML_gmxCodelists.xml#DS_AssociationTypeCode"
              codeListValue="{$associationType}"/>
          </gmd:associationType>
          <xsl:if test="$initiativeType != ''">
            <gmd:initiativeType>
              <gmd:DS_InitiativeTypeCode
                codeList="http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/codelist/ML_gmxCodelists.xml#DS_InitiativeTypeCode"
                codeListValue="{$initiativeType}"/>
            </gmd:initiativeType>
          </xsl:if>
        </gmd:MD_AggregateInformation>
      </gmd:aggregationInfo>
    </xsl:if>
  </xsl:template>





  <!-- Do a copy of every nodes and attributes -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove geonet:* elements. -->
  <xsl:template match="geonet:*" priority="2"/>

</xsl:stylesheet>
