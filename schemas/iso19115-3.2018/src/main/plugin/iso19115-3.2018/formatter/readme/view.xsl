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
<!-- Conversion from iso19115-3.2018 to simple README.md file for EEA Nextcloud record header
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:util="java:org.fao.geonet.util.XslUtil"
                version="2.0"
                exclude-result-prefixes="#all">

  <xsl:output method="text"
              indent="no"/>

  <xsl:param name="nodeUrl" select="util:getSettingValue('nodeUrl')" required="no"/>

  <xsl:template match="//*[local-name() = 'MD_Metadata']">
    <textResponse>
        <xsl:text># </xsl:text> <xsl:value-of select="*:identificationInfo/*/*:citation/*/*:title/*/text()"/>

        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:value-of select="*:identificationInfo/*/*:abstract/*/text()"/>

        <xsl:variable name="metadataLinkage"
                      select="normalize-space(*:metadataLinkage/*/*:linkage/*:CharacterString[. != ''])"/>
        <xsl:if test="$metadataLinkage != ''">
          <xsl:value-of select="$metadataLinkage"/>
        </xsl:if>


      <xsl:variable name="uuid"
                    select="(*:fileIdentifier/*/text()|*:metadataIdentifier/*/*:code/*/text())"/>
        <xsl:variable name="landingPageUrl"
                      select="concat($nodeUrl, 'api/records/', $uuid)"/>
        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:text>&#13;&#10;</xsl:text>
        <xsl:text>[More information](</xsl:text><xsl:value-of select="$landingPageUrl"/>)
    </textResponse>
  </xsl:template>
</xsl:stylesheet>
