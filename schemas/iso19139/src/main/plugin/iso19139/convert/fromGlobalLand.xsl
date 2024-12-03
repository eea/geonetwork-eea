<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gmx="http://www.isotc211.org/2005/gmx"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gml320="http://www.opengis.net/gml"
                xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                xmlns:java="java:org.fao.geonet.util.XslUtil"
                version="2.0" exclude-result-prefixes="#all">

  <xsl:variable name="isUsing2007Schema" select="true()"/>

  <xsl:template name="add-namespaces">
    <xsl:namespace name="xsi" select="'http://www.w3.org/2001/XMLSchema-instance'"/>
    <xsl:namespace name="gco" select="'http://www.isotc211.org/2005/gco'"/>
    <xsl:namespace name="gmd" select="'http://www.isotc211.org/2005/gmd'"/>
    <xsl:namespace name="srv" select="'http://www.isotc211.org/2005/srv'"/>
    <xsl:namespace name="gmx" select="'http://www.isotc211.org/2005/gmx'"/>
    <xsl:namespace name="gts" select="'http://www.isotc211.org/2005/gts'"/>
    <xsl:namespace name="gsr" select="'http://www.isotc211.org/2005/gsr'"/>
    <xsl:namespace name="gmi" select="'http://www.isotc211.org/2005/gmi'"/>
    <xsl:namespace name="gml" select="'http://www.opengis.net/gml/3.2'"/>
    <xsl:namespace name="xlink" select="'http://www.w3.org/1999/xlink'"/>
  </xsl:template>

  <xsl:template match="/gmd:MD_Metadata">
    <xsl:copy copy-namespaces="no">
      <xsl:call-template name="add-namespaces"/>

      <xsl:apply-templates select="@*[name() != 'xsi:schemaLocation']"/>

      <xsl:apply-templates select="*"/>
    </xsl:copy>
  </xsl:template>

  <!--
    Resource type: series -> dataset
    <gmd:hierarchyLevel>
      <gmd:MD_ScopeCode codeList="https://standards.iso.org/iso/19139/resources/ML_gmxCodelists.xml#MD_ScopeCode"
                        codeListValue="series"/>
    </gmd:hierarchyLevel>
  -->
  <xsl:template match="gmd:hierarchyLevel/*/@codeListValue[. = 'series']|gmd:level/*/@codeListValue[. = 'series']">
    <xsl:attribute name="codeListValue" select="'dataset'"/>
  </xsl:template>


  <!--
  <gmd:referenceSystemInfo>
    <gmd:MD_ReferenceSystem>
      <gmd:referenceSystemIdentifier>
        <gmd:RS_Identifier>
          <gmd:code>
            <gco:CharacterString>EPSG:4326</gco:CharacterString>
          </gmd:code>
          <gmd:codeSpace>
            <gco:CharacterString>EPSG Geodetic Parameter Dataset</gco:CharacterString>
          </gmd:codeSpace>
        </gmd:RS_Identifier>
      </gmd:referenceSystemIdentifier>
    </gmd:MD_ReferenceSystem>
  </gmd:referenceSystemInfo>
  <gmd:referenceSystemInfo>
    <gmd:MD_ReferenceSystem>
      <gmd:referenceSystemIdentifier>
        <gmd:RS_Identifier>
          <gmd:code>
            <gco:CharacterString>WGS84</gco:CharacterString>
          </gmd:code>
          <gmd:codeSpace>
            <gco:CharacterString>World Geodetic System</gco:CharacterString>
          </gmd:codeSpace>
        </gmd:RS_Identifier>
      </gmd:referenceSystemIdentifier>
    </gmd:MD_ReferenceSystem>
  </gmd:referenceSystemInfo>

  Convert EPSG codes to links to the EPSG registry.
  -->
  <xsl:template
    match="gmd:referenceSystemInfo[starts-with(*/gmd:referenceSystemIdentifier/*/gmd:code/*/text(), 'EPSG:')]">
    <xsl:variable name="epsgCode"
                  select="*/gmd:referenceSystemIdentifier/*/gmd:code/*/text()"/>
    <gmd:referenceSystemInfo>
      <gmd:MD_ReferenceSystem>
        <gmd:referenceSystemIdentifier>
          <gmd:RS_Identifier>
            <gmd:code>
              <gmx:Anchor xlink:href="http://www.opengis.net/def/crs/EPSG/0/{substring-after($epsgCode, 'EPSG:')}">
                <xsl:value-of select="$epsgCode"/>
              </gmx:Anchor>
            </gmd:code>
          </gmd:RS_Identifier>
        </gmd:referenceSystemIdentifier>
      </gmd:MD_ReferenceSystem>
    </gmd:referenceSystemInfo>
  </xsl:template>

  <!--
  Remove non EPSG references.
  -->
  <xsl:template
    match="gmd:referenceSystemInfo[not(starts-with(*/gmd:referenceSystemIdentifier/*/gmd:code/*/text(), 'EPSG:'))]"/>


  <!--
  * Add EEA topics
  * Add Spatial Scope
  -->
  <xsl:template match="gmd:descriptiveKeywords[position() = 1]">
    <gmd:descriptiveKeywords>
      <gmd:MD_Keywords>
        <xsl:variable name="title"
                      select="ancestor::gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString"/>
        <xsl:choose>
          <xsl:when test="starts-with($title, 'Burnt Area')">
            <gmd:keyword>
              <gco:CharacterString>Climate</gco:CharacterString>
            </gmd:keyword>
          </xsl:when>
          <xsl:when test="starts-with($title, 'Dry Matter') or
                                      starts-with($title, 'Gross Dry') or
                                      starts-with($title, 'Gross Primary Production') or
                                      starts-with($title, 'Net Primary Production') or
                                      starts-with($title, 'Fraction of Absorbed') or
                                      starts-with($title, 'Vegetation Phenology and Productivity') or
                                      starts-with($title, 'Leaf Area Index') or
                                      starts-with($title, 'Normalised Difference Vegetation Index')">
            <gmd:keyword>
              <gco:CharacterString>Agriculture and food</gco:CharacterString>
            </gmd:keyword>
          </xsl:when>
          <xsl:when test="starts-with($title, 'Soil Water Index') or
                                      starts-with($title, 'Surface Soil Moisture')">
            <gmd:keyword>
              <gco:CharacterString>Soil</gco:CharacterString>
            </gmd:keyword>
            <gmd:keyword>
              <gco:CharacterString>Agriculture and food</gco:CharacterString>
            </gmd:keyword>
          </xsl:when>
          <xsl:when test="starts-with($title, 'Lake') or
                                      starts-with($title, 'Snow') or
                                      starts-with($title, 'Water')">
            <gmd:keyword>
              <gco:CharacterString>Water</gco:CharacterString>
            </gmd:keyword>
          </xsl:when>
          <xsl:when test="starts-with($title, 'Land Cover') or
                                      starts-with($title, 'Fraction of Vegetation') or
                                      starts-with($title, 'Land Surface')">
            <gmd:keyword>
              <gco:CharacterString>Land use</gco:CharacterString>
            </gmd:keyword>
          </xsl:when>
        </xsl:choose>
        <gmd:type>
          <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
        </gmd:type>
        <gmd:thesaurusName>
          <gmd:CI_Citation>
            <gmd:title>
              <gco:CharacterString>EEA topics</gco:CharacterString>
            </gmd:title>
            <gmd:date>
              <gmd:CI_Date>
                <gmd:date>
                  <gco:Date>2020-09-24</gco:Date>
                </gmd:date>
                <gmd:dateType>
                  <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
                </gmd:dateType>
              </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
              <gmd:MD_Identifier>
                <gmd:code>
                  <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.eea-topics">geonetwork.thesaurus.external.theme.eea-topics</gmx:Anchor>
                </gmd:code>
              </gmd:MD_Identifier>
            </gmd:identifier>
          </gmd:CI_Citation>
        </gmd:thesaurusName>
      </gmd:MD_Keywords>
    </gmd:descriptiveKeywords>

    <gmd:descriptiveKeywords>
      <gmd:MD_Keywords>
        <gmd:keyword>
          <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/SpatialScope/global">Global</gmx:Anchor>
        </gmd:keyword>
        <gmd:type>
          <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
        </gmd:type>
        <gmd:thesaurusName>
          <gmd:CI_Citation>
            <gmd:title>
              <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/SpatialScope">Spatial scope</gmx:Anchor>
            </gmd:title>
            <gmd:date>
              <gmd:CI_Date>
                <gmd:date>
                  <gco:Date>2019-05-22</gco:Date>
                </gmd:date>
                <gmd:dateType>
                  <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
                </gmd:dateType>
              </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
              <gmd:MD_Identifier>
                <gmd:code>
                  <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope">geonetwork.thesaurus.external.theme.httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope</gmx:Anchor>
                </gmd:code>
              </gmd:MD_Identifier>
            </gmd:identifier>
          </gmd:CI_Citation>
        </gmd:thesaurusName>
      </gmd:MD_Keywords>
    </gmd:descriptiveKeywords>

    <gmd:descriptiveKeywords>
      <gmd:MD_Keywords>
        <gmd:keyword>
          <gco:CharacterString>World</gco:CharacterString>
        </gmd:keyword>
        <gmd:type>
          <gmd:MD_KeywordTypeCode
            codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
            codeListValue="place"/>
        </gmd:type>
        <gmd:thesaurusName>
          <gmd:CI_Citation>
            <gmd:title>
              <gco:CharacterString>Continents, countries, sea regions of the world.</gco:CharacterString>
            </gmd:title>
            <gmd:date>
              <gmd:CI_Date>
                <gmd:date>
                  <gco:DateTime>2015-07-17T12:00:00</gco:DateTime>
                </gmd:date>
                <gmd:dateType>
                  <gmd:CI_DateTypeCode
                    codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"
                    codeListValue="publication"/>
                </gmd:dateType>
              </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
              <gmd:MD_Identifier>
                <gmd:code>
                  <gmx:Anchor
                    xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.place.regions">
                    geonetwork.thesaurus.external.place.regions
                  </gmx:Anchor>
                </gmd:code>
              </gmd:MD_Identifier>
            </gmd:identifier>
          </gmd:CI_Citation>
        </gmd:thesaurusName>
      </gmd:MD_Keywords>
    </gmd:descriptiveKeywords>

    <gmd:descriptiveKeywords gco:nilReason="withheld">
      <gmd:MD_Keywords>
        <gmd:keyword>
          <gco:CharacterString>geospatial data</gco:CharacterString>
        </gmd:keyword>
        <gmd:type>
          <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
        </gmd:type>
        <gmd:thesaurusName>
          <gmd:CI_Citation>
            <gmd:title>
              <gco:CharacterString>EEA categories</gco:CharacterString>
            </gmd:title>
            <gmd:date>
              <gmd:CI_Date>
                <gmd:date>
                  <gco:Date>2024-05-17</gco:Date>
                </gmd:date>
                <gmd:dateType>
                  <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
                </gmd:dateType>
              </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
              <gmd:MD_Identifier>
                <gmd:code>
                  <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/local.theme.eea-categories">geonetwork.thesaurus.local.theme.eea-categories</gmx:Anchor>
                </gmd:code>
              </gmd:MD_Identifier>
            </gmd:identifier>
          </gmd:CI_Citation>
        </gmd:thesaurusName>
      </gmd:MD_Keywords>
    </gmd:descriptiveKeywords>

    <xsl:copy>
      <xsl:apply-templates select="*"/>
    </xsl:copy>

  </xsl:template>

  <!--
  <gmd:descriptiveKeywords>
      <gmd:MD_Keywords>
         <gmd:keyword>
            <gco:CharacterString>vegetation</gco:CharacterString>
         </gmd:keyword>
         <gmd:thesaurusName>
            <gmd:CI_Citation>
               <gmd:title>
                  <gco:CharacterString>GEMET - Concepts, version 2.1</gco:CharacterString>
               </gmd:title>
               <gmd:date>
                  <gmd:CI_Date>
                     <gmd:date>
                        <gco:Date>2008-06-13</gco:Date>
                     </gmd:date>
                     <gmd:dateType>
                        <gmd:CI_DateTypeCode codeList="https://standards.iso.org/iso/19139/resources/ML_gmxCodelists.xml#CI_DateTypeCode"
                                             codeListValue="publication"/>
                     </gmd:dateType>
                  </gmd:CI_Date>
               </gmd:date>
            </gmd:CI_Citation>
         </gmd:thesaurusName>
      </gmd:MD_Keywords>
   </gmd:descriptiveKeywords>
  -->
  <xsl:template match="gmd:descriptiveKeywords/*/gmd:thesaurusName[*/gmd:title/gco:CharacterString = 'GEMET - Concepts, version 2.1']">
    <gmd:thesaurusName>
      <gmd:CI_Citation>
        <gmd:title>
          <gco:CharacterString>GEMET</gco:CharacterString>
        </gmd:title>
        <gmd:date>
          <gmd:CI_Date>
            <gmd:date>
              <gco:Date>2021-11-30</gco:Date>
            </gmd:date>
            <gmd:dateType>
              <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
            </gmd:dateType>
          </gmd:CI_Date>
        </gmd:date>
        <gmd:identifier>
          <gmd:MD_Identifier>
            <gmd:code>
              <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.gemet">geonetwork.thesaurus.external.theme.gemet</gmx:Anchor>
            </gmd:code>
          </gmd:MD_Identifier>
        </gmd:identifier>
      </gmd:CI_Citation>
    </gmd:thesaurusName>
  </xsl:template>


  <xsl:template match="gmd:descriptiveKeywords/*/gmd:thesaurusName[*/gmd:title/gco:CharacterString = 'GEMET - INSPIRE themes, version 1.0']">
    <gmd:thesaurusName>
      <gmd:CI_Citation>
        <gmd:title>
          <gco:CharacterString>GEMET - INSPIRE themes, version 1.0</gco:CharacterString>
        </gmd:title>
        <gmd:date>
          <gmd:CI_Date>
            <gmd:date>
              <gco:Date>2008-06-01</gco:Date>
            </gmd:date>
            <gmd:dateType>
              <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode" codeListValue="publication"/>
            </gmd:dateType>
          </gmd:CI_Date>
        </gmd:date>
        <gmd:identifier>
          <gmd:MD_Identifier>
            <gmd:code>
              <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.httpinspireeceuropaeutheme-theme">geonetwork.thesaurus.external.theme.httpinspireeceuropaeutheme-theme</gmx:Anchor>
            </gmd:code>
          </gmd:MD_Identifier>
        </gmd:identifier>
      </gmd:CI_Citation>
    </gmd:thesaurusName>
  </xsl:template>


  <xsl:template match="gmd:metadataStandardName/gco:CharacterString[. = 'ISO19115']">
    <gco:CharacterString>ISO 19115/19139</gco:CharacterString>
  </xsl:template>
  <xsl:template match="gmd:metadataStandardVersion/gco:CharacterString[. = '2003/Cor.1:2006']">
    <gco:CharacterString>1.0</gco:CharacterString>
  </xsl:template>

  <!--
  <gmd:aggregationInfo>
        <gmd:MD_AggregateInformation>
          <gmd:associationType>
            <gmd:DS_AssociationTypeCode
              codeList="https://standards.iso.org/iso/19139/resources/ML_gmxCodelists.xml#DS_AssociationTypeCode"
              codeListValue="partOfSeamlessDatabase"/>
          </gmd:associationType>
          <gmd:initiativeType>
            <gmd:DS_InitiativeTypeCode
              codeList="https://standards.iso.org/iso/19139/resources/ML_gmxCodelists.xml#DS_InitiativeTypeCode"
              codeListValue="project"/>
          </gmd:initiativeType>
        </gmd:MD_AggregateInformation>
      </gmd:aggregationInfo>

       <gmd:aggregationInfo>
        <gmd:MD_AggregateInformation>
           <gmd:associationType>
              <gmd:DS_AssociationTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#DS_AssociationTypeCode"
                                          codeListValue="source"/>
           </gmd:associationType>
           <gmd:initiativeType>
              <gmd:DS_InitiativeTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#DS_InitiativeTypeCode"
                                         codeListValue="platform"/>
           </gmd:initiativeType>
        </gmd:MD_AggregateInformation>
     </gmd:aggregationInfo>
  -->
  <xsl:template match="gmd:aggregationInfo"/>


  <xsl:template match="gml320:*[$isUsing2007Schema]">
    <xsl:element name="gml:{local-name()}" namespace="http://www.opengis.net/gml/3.2">
      <xsl:apply-templates select="@*|node()"/>
    </xsl:element>
  </xsl:template>
  <xsl:template match="@gml320:*[$isUsing2007Schema]">
    <xsl:attribute name="gml:{local-name()}" namespace="http://www.opengis.net/gml/3.2" select="."/>
  </xsl:template>

  <xsl:template match="gml:*|gml320:*">
    <xsl:call-template name="correct_ns_prefix_with_namespace">
      <xsl:with-param name="element" select="."/>
      <xsl:with-param name="prefix"
                      select="'gml'"/>
      <xsl:with-param name="namespace"
                      select="'http://www.opengis.net/gml/3.2'"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="correct_ns_prefix_with_namespace">
    <xsl:param name="element"/>
    <xsl:param name="prefix"/>
    <xsl:param name="namespace"/>

    <xsl:choose>
      <xsl:when test="local-name($element)=name($element) and $prefix != '' ">
        <xsl:element name="{$prefix}:{local-name($element)}" namespace="{$namespace}">
          <xsl:apply-templates select="@*|node()"/>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
        <xsl:copy>
          <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="gmd:MD_Metadata/@xsi:schemaLocation|gmd:MD_Metadata/@id" priority="2"/>

  <xsl:template match="@*|node()">
    <xsl:copy copy-namespaces="no">
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
