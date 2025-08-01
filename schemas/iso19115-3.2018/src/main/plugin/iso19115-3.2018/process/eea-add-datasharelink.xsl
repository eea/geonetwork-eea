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
<xsl:stylesheet
  xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0"
  xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0"
  xmlns:mrd="http://standards.iso.org/iso/19115/-3/mrd/1.0"
  xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0"
  xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0"
  xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:geonet="http://www.fao.org/geonetwork"
  xmlns:util="java:org.fao.geonet.util.XslUtil"
  exclude-result-prefixes="#all"
  version="2.0">

  <xsl:output indent="yes"/>

  <xsl:variable name="uuid"
                select="/mdb:MD_Metadata/mdb:metadataIdentifier/*/mcc:code/gco:CharacterString"/>

  <xsl:variable name="datasetIdentifier"
                select="/mdb:MD_Metadata/mdb:identificationInfo/*/
                              mri:citation/*/cit:identifier/*/mcc:code/*[matches(text(), '.*_[ip]_.*')]/text()"/>

  <xsl:variable name="isPublic"
                select="contains($datasetIdentifier, '_p_')"/>

  <xsl:variable name="serverUrl" select="util:getSettingValue('serverUrl')" />

  <xsl:variable name="hasEEAFile"
                select="count(/mdb:MD_Metadata/mdb:distributionInfo/*/mrd:transferOptions/*/mrd:onLine[(
                                                         */cit:protocol/*/text() = 'EEA:FILEPATH'
                                                         or */cit:protocol/*/text() = 'EEA:FOLDERPATH')
                                                         and starts-with(*/cit:linkage/gco:CharacterString,
                                                         concat($serverUrl, '/webdav'))]) > 0"/>

  <xsl:variable name="hasTransferOptions"
                select="count(/mdb:MD_Metadata/mdb:distributionInfo/*/mrd:transferOptions/*) > 0"/>


  <xsl:template match="mdb:distributionInfo/*[not($hasTransferOptions) and not($hasEEAFile)]">
    <xsl:copy>
      <xsl:apply-templates select="mrd:distributionFormat
                                   |mrd:distributor"/>

      <mrd:transferOptions>
        <mrd:MD_DigitalTransferOptions>
          <xsl:call-template name="add-datasharelink"/>
        </mrd:MD_DigitalTransferOptions>
      </mrd:transferOptions>
    </xsl:copy>
  </xsl:template>


  <xsl:template match="mrd:transferOptions[1]/*[not($hasEEAFile)]">
    <xsl:copy>
      <xsl:apply-templates select="mrd:unitsOfDistribution
                                  |mrd:transferSize"/>

      <xsl:call-template name="add-datasharelink"/>

      <xsl:apply-templates select="mrd:onLine
                                  |mrd:offLine"/>
    </xsl:copy>
  </xsl:template>


  <xsl:template name="add-datasharelink">
    <xsl:variable name="folder"
                  select="if ($isPublic) then 'public' else 'internal'"/>

    <mrd:onLine>
      <xsl:if test="not($isPublic)">
        <xsl:attribute name="gco:nilReason" select="'withheld'"/>
      </xsl:if>
      <cit:CI_OnlineResource>
        <cit:linkage>
          <gco:CharacterString><xsl:value-of select="concat($serverUrl, '/webdav/datastore/', $folder, '/', $datasetIdentifier)"/></gco:CharacterString>
        </cit:linkage>
        <cit:protocol>
          <gco:CharacterString>EEA:FOLDERPATH</gco:CharacterString>
        </cit:protocol>
        <cit:function>
          <cit:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                     codeListValue="download"/>
        </cit:function>
      </cit:CI_OnlineResource>
    </mrd:onLine>
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
