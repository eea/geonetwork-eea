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


  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA keyword list']/gmd:date/*/gmd:dateType/*/@codeListValue">
    <xsl:attribute name="codeListValue">publication</xsl:attribute>
  </xsl:template>
  
  <xsl:template match="gmd:thesaurusName/*[gmd:title/* = 'EEA categories']/gmd:date/*/gmd:dateType/*/@codeListValue">
    <xsl:attribute name="codeListValue">publication</xsl:attribute>
  </xsl:template>

  <xsl:template match="gmd:resourceConstraints">
    <xsl:if test="preceding-sibling::*[1]/name() != 'gmd:resourceConstraints'">
      <gmd:resourceConstraints>
        <gmd:MD_Constraints>
          <gmd:useLimitation>
            <gco:CharacterString>Unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged.  The EEA re-use policy follows Directive 2003/98/EC of the European Parliament and the Council on the re-use of public sector information throughout the European Union and Commission Decision 2006/291/EC, Euratom on the re-use of Commission information.  The EEA accepts no responsibility or liability whatsoever for the re-use of content accessible on its website.  Any inquiries about re-use of content on the EEA website should be addressed to Ove Caspersen, EEA, Kongens Nytorv 6, DK-1050 Copenhagen K, Tel +45 33 36 71 00, Fax +45 33 36 71 99, e-mail copyrights at eea.europa.eu</gco:CharacterString>
          </gmd:useLimitation>
        </gmd:MD_Constraints>
      </gmd:resourceConstraints>
      <gmd:resourceConstraints>
        <gmd:MD_LegalConstraints>
          <gmd:accessConstraints>
            <gmd:MD_RestrictionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode"
                                    codeListValue="otherRestrictions"/>
          </gmd:accessConstraints>
          <gmd:otherConstraints>
            <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations">No limitations on public access</gmx:Anchor>
          </gmd:otherConstraints>
        </gmd:MD_LegalConstraints>
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
    </xsl:if>
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
