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

  <xsl:variable name="dataAndMapUrl"
                select="replace(//gmd:URL[starts-with(., 'https://www.eea.europa.eu/data-and-maps') or starts-with(., 'http://www.eea.europa.eu/data-and-maps')], 'https:', 'http:')"/>

  <xsl:template match="gmd:descriptiveKeywords[
                            count($dataAndMapUrl) > 0
                            and preceding-sibling::*[1]/name(.) != 'gmd:descriptiveKeywords']">
    <xsl:variable name="page"
                  select="encode-for-uri($dataAndMapUrl)"/>

    <xsl:variable name="uuid"
                  select="if(contains($dataAndMapUrl, 'http://www.eea.europa.eu/data-and-maps/data/ds_resolveuid/'))
                          then replace($dataAndMapUrl, 'http://www.eea.europa.eu/data-and-maps/data/ds_resolveuid/', '') else ''"/>

    <xsl:variable name="url"
                  select="concat('https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&amp;query=PREFIX+portal_types%3A+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0D%0A%0D%0ASELECT+DISTINCT+%0D%0A%3Fsource+%0D%0A%3Ftopic%0D%0A%3FtopicLabel+%0D%0AWHERE+%7B%0D%0A+GRAPH+%3Fg1+%7B%0D%0A+++%3Fsource+portal_types%3Atopic+%3Ftopic+.%0D%0A+++%3Fsource+dcterms%3Aidentifier+%3Fidentifier+.%0D%0A+%7D%0D%0A+++%3Ftopic+rdfs%3Alabel+%3FtopicLabel+.%0D%0A+++FILTER%28%3Fg1+%3D+%3C', $page, '%2F%40%40rdf%3E+or+%3Fidentifier+%3D+%27', $uuid, '%27%29+.%0D%0A%7D&amp;format=application%2Fsparql-results%2Bxml&amp;nrOfHits=20&amp;execute=Execute')"/>

    <xsl:variable name="dataAndMapPage"
                  select="document($url)"/>

    <xsl:variable name="results"
                  select="$dataAndMapPage/sparql:sparql/sparql:results/sparql:result"/>

    <xsl:if test="count($results) > 0">
      <gmd:descriptiveKeywords>
        <gmd:MD_Keywords>
          <xsl:for-each select="$results">
            <gmd:keyword>
              <gmx:Anchor xlink:href="{sparql:binding[@name = 'topic']/sparql:uri}">
                <xsl:value-of select="sparql:binding[@name = 'topicLabel']/sparql:literal"/>
              </gmx:Anchor>
            </gmd:keyword>
          </xsl:for-each>
          <gmd:type>
            <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                    codeListValue="theme"/>
          </gmd:type>
          <gmd:thesaurusName>
            <gmd:CI_Citation>
              <gmd:title>
                <gmx:Anchor xlink:href="https://www.eea.europa.eu/themes">EEA topics</gmx:Anchor>
              </gmd:title>
              <gmd:date>
                <gmd:CI_Date>
                  <gmd:date>
                    <gco:Date>2020-09-24</gco:Date>
                  </gmd:date>
                  <gmd:dateType>
                    <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"
                                         codeListValue="publication"/>
                  </gmd:dateType>
                </gmd:CI_Date>
              </gmd:date>
              <gmd:identifier>
                <gmd:MD_Identifier>
                  <gmd:code>
                    <gmx:Anchor xlink:href="http://localhost:8080/geonetwork/srv/api/registries/vocabularies/external.theme.eea-topics">geonetwork.thesaurus.external.theme.eea-topics</gmx:Anchor>
                  </gmd:code>
                </gmd:MD_Identifier>
              </gmd:identifier>
            </gmd:CI_Citation>
          </gmd:thesaurusName>
        </gmd:MD_Keywords>
      </gmd:descriptiveKeywords>
    </xsl:if>

    <xsl:copy>
      <xsl:apply-templates select="*"/>
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
