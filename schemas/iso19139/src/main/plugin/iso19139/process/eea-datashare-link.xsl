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
<xsl:stylesheet xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:srv="http://www.isotc211.org/2005/srv"
                xmlns:gmx="http://www.isotc211.org/2005/gmx"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:sparql="http://www.w3.org/2005/sparql-results#"
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
  <xsl:variable name="resourceId"
                select="//gmd:identifier/*/gmd:code/*[starts-with(text(), 'eea_')]"/>

  <!-- Reorder identifier for the datashare synch script to catch the first one. -->
  <xsl:template match="gmd:identificationInfo/*/gmd:citation/*/gmd:identifier[1]" priority="2">
    <xsl:copy-of select="../gmd:identifier[starts-with(*/gmd:code/*/text(), 'eea_')]"/>
    <xsl:copy-of select="../gmd:identifier[not(starts-with(*/gmd:code/*/text(), 'eea_')) and not(starts-with(*/gmd:code/*/text(), 'http://www.eea.europa.eu/data-and-maps/data/'))]"/>
  </xsl:template>
  <xsl:template match="gmd:identificationInfo/*/gmd:citation/*/gmd:identifier"/>


  <xsl:template match="gmd:transferOptions/*">
    <xsl:copy>
      <xsl:copy-of select="gmd:onLine"/>

      <xsl:variable name="hasFolderPath"
                    select="count(gmd:onLine[*/gmd:protocol/*/text() = 'EEA:FOLDERPATH']) > 0"/>
      <xsl:if test="not($hasFolderPath)">
        <gmd:onLine>
          <gmd:CI_OnlineResource>
            <gmd:linkage>
              <gmd:URL>
                <xsl:value-of select="concat('https://sdi.eea.europa.eu/webdav/continental/tabular/', $resourceId, '/')"/>
              </gmd:URL>
            </gmd:linkage>
            <gmd:protocol>
              <gco:CharacterString>EEA:FOLDERPATH</gco:CharacterString>
            </gmd:protocol>
            <gmd:function>
              <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                         codeListValue="download"/>
            </gmd:function>
          </gmd:CI_OnlineResource>
        </gmd:onLine>
      </xsl:if>
    </xsl:copy>
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
