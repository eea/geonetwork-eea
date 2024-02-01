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
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:geonet="http://www.fao.org/geonetwork"
                exclude-result-prefixes="#all"
                version="2.0">

  <xsl:output indent="yes"/>

  <xsl:variable name="uuid"
                select="/gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString"/>

  <xsl:variable name="datasetIdentifier"
                select="/gmd:MD_Metadata/gmd:identificationInfo/*/
                              gmd:citation/*/gmd:identifier/*/gmd:code/*[matches(text(), '.*_[ip]_.*')]/text()"/>

  <xsl:variable name="isPublic"
                select="contains($datasetIdentifier, '_p_')"/>

  <xsl:variable name="hasEEAFile"
                select="count(/gmd:MD_Metadata/gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine[(
                                                         */gmd:protocol/*/text() = 'EEA:FILEPATH'
                                                         or */gmd:protocol/*/text() = 'EEA:FOLDERPATH')
                                                         and starts-with(*/gmd:linkage/gmd:URL,
                                                          'https://sdi.eea.europa.eu/webdav')]) > 0"/>

  <xsl:variable name="hasTransferOptions"
                select="count(/gmd:MD_Metadata/gmd:distributionInfo/*/gmd:transferOptions/*) > 0"/>


  <xsl:template match="gmd:distributionInfo/*[not($hasTransferOptions) and not($hasEEAFile)]">
    <xsl:copy>
      <xsl:apply-templates select="gmd:distributionFormat
                                   |gmd:distributor"/>

      <gmd:transferOptions>
        <gmd:MD_DigitalTransferOptions>
          <xsl:call-template name="add-datasharelink"/>
        </gmd:MD_DigitalTransferOptions>
      </gmd:transferOptions>
    </xsl:copy>
  </xsl:template>


  <xsl:template match="gmd:transferOptions/*[not($hasEEAFile)]">
    <xsl:copy>
      <xsl:apply-templates select="gmd:unitsOfDistribution
                                  |gmd:transferSize"/>

      <xsl:call-template name="add-datasharelink"/>

      <xsl:apply-templates select="gmd:onLine
                                  |gmd:offLine"/>
    </xsl:copy>
  </xsl:template>


  <xsl:template name="add-datasharelink">
    <xsl:variable name="folder"
                  select="if ($isPublic) then 'public' else 'internal'"/>

    <gmd:onLine>
      <xsl:if test="not($isPublic)">
        <xsl:attribute name="gco:nilReason" select="'withheld'"/>
      </xsl:if>
      <gmd:CI_OnlineResource>
        <gmd:linkage>
          <gmd:URL><xsl:value-of select="concat('https://sdi.eea.europa.eu/webdav/datastore/', $folder, '/', $datasetIdentifier)"/></gmd:URL>
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
