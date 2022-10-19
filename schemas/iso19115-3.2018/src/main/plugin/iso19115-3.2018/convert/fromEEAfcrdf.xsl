<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:wf="http://intelleo.eu/ontologies/workflow/ns#"
                xmlns:eea="http://www.eea.europa.eu/ontologies.rdf#"
                xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
                xmlns:skos="http://www.w3.org/2004/02/skos/core#"
                xmlns:owl="http://www.w3.org/2002/07/owl#"
                xmlns:data="http://www.eea.europa.eu/portal_types/Data#"
                xmlns:datatable="http://www.eea.europa.eu/portal_types/DataTable#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:dcterms="http://purl.org/dc/terms/"
                xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
                xmlns:schema="http://schema.org/"
                xmlns:saxon="http://saxon.sf.net/"
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:cat="http://standards.iso.org/iso/19115/-3/cat/1.0"
                xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0"
                xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0"
                xmlns:gex="http://standards.iso.org/iso/19115/-3/gex/1.0"
                xmlns:lan="http://standards.iso.org/iso/19115/-3/lan/1.0"
                xmlns:srv="http://standards.iso.org/iso/19115/-3/srv/2.1"
                xmlns:mac="http://standards.iso.org/iso/19115/-3/mac/2.0"
                xmlns:mas="http://standards.iso.org/iso/19115/-3/mas/1.0"
                xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0"
                xmlns:mco="http://standards.iso.org/iso/19115/-3/mco/1.0"
                xmlns:mda="http://standards.iso.org/iso/19115/-3/mda/1.0"
                xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0"
                xmlns:mdt="http://standards.iso.org/iso/19115/-3/mdt/1.0"
                xmlns:mex="http://standards.iso.org/iso/19115/-3/mex/1.0"
                xmlns:mic="http://standards.iso.org/iso/19115/-3/mic/1.0"
                xmlns:mil="http://standards.iso.org/iso/19115/-3/mil/1.0"
                xmlns:mrl="http://standards.iso.org/iso/19115/-3/mrl/1.0"
                xmlns:mds="http://standards.iso.org/iso/19115/-3/mds/2.0"
                xmlns:mmi="http://standards.iso.org/iso/19115/-3/mmi/1.0"
                xmlns:mpc="http://standards.iso.org/iso/19115/-3/mpc/1.0"
                xmlns:mrc="http://standards.iso.org/iso/19115/-3/mrc/2.0"
                xmlns:mrd="http://standards.iso.org/iso/19115/-3/mrd/1.0"
                xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0"
                xmlns:mrs="http://standards.iso.org/iso/19115/-3/mrs/1.0"
                xmlns:msr="http://standards.iso.org/iso/19115/-3/msr/2.0"
                xmlns:mai="http://standards.iso.org/iso/19115/-3/mai/1.0"
                xmlns:mdq="http://standards.iso.org/iso/19157/-2/mdq/1.0"
                xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0"
                xmlns:gfc="http://standards.iso.org/iso/19110/gfc/1.1"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:util="java:org.fao.geonet.util.XslUtil"
                xmlns:xmlutil="java:org.fao.geonet.utils.Xml"
                version="2.0"
                exclude-result-prefixes="#all">

  <xsl:template match="/">

    <mdb:MD_Metadata xmlns:mda="http://standards.iso.org/iso/19115/-3/mda/1.0"
                     xmlns:srv="http://standards.iso.org/iso/19115/-3/srv/2.1"
                     xmlns:gcx="http://standards.iso.org/iso/19115/-3/gcx/1.0"
                     xmlns:mds="http://standards.iso.org/iso/19115/-3/mds/2.0"
                     xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0"
                     xmlns:gex="http://standards.iso.org/iso/19115/-3/gex/1.0"
                     xmlns:cat="http://standards.iso.org/iso/19115/-3/cat/1.0"
                     xmlns:mex="http://standards.iso.org/iso/19115/-3/mex/1.0"
                     xmlns:mdt="http://standards.iso.org/iso/19115/-3/mdt/2.0"
                     xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0"
                     xmlns:mmi="http://standards.iso.org/iso/19115/-3/mmi/1.0"
                     xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0"
                     xmlns:mpc="http://standards.iso.org/iso/19115/-3/mpc/1.0"
                     xmlns:mcc="http://standards.iso.org/iso/19115/-3/mcc/1.0"
                     xmlns:mdq="http://standards.iso.org/iso/19157/-2/mdq/1.0"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xmlns:mac="http://standards.iso.org/iso/19115/-3/mac/2.0"
                     xmlns:mri="http://standards.iso.org/iso/19115/-3/mri/1.0"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     xmlns:mrc="http://standards.iso.org/iso/19115/-3/mrc/2.0"
                     xmlns:mrl="http://standards.iso.org/iso/19115/-3/mrl/2.0"
                     xmlns:mrs="http://standards.iso.org/iso/19115/-3/mrs/1.0"
                     xmlns:mrd="http://standards.iso.org/iso/19115/-3/mrd/1.0"
                     xmlns:gml="http://www.opengis.net/gml/3.2"
                     xmlns:mco="http://standards.iso.org/iso/19115/-3/mco/1.0"
                     xmlns:gfc="http://standards.iso.org/iso/19110/gfc/1.1"
                     xmlns:msr="http://standards.iso.org/iso/19115/-3/msr/2.0"
                     xmlns:mas="http://standards.iso.org/iso/19115/-3/mas/1.0"
                     xmlns:lan="http://standards.iso.org/iso/19115/-3/lan/1.0">
      <mdb:metadataIdentifier>
        <mcc:MD_Identifier>
          <mcc:code>
            <gco:CharacterString>18d8a9c2-f76f-4851-b5e7-7aeb156ede7c</gco:CharacterString>
          </mcc:code>
          <mcc:codeSpace>
            <gco:CharacterString>urn:uuid</gco:CharacterString>
          </mcc:codeSpace>
        </mcc:MD_Identifier>
      </mdb:metadataIdentifier>
      <mdb:defaultLocale>
        <lan:PT_Locale id="EN">
          <lan:language>
            <lan:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
          </lan:language>
          <lan:characterEncoding>
            <lan:MD_CharacterSetCode
              codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_CharacterSetCode"
              codeListValue="anyValidURI"/>
          </lan:characterEncoding>
        </lan:PT_Locale>
      </mdb:defaultLocale>
      <mdb:metadataScope>
        <mdb:MD_MetadataScope>
          <mdb:resourceScope>
            <mcc:MD_ScopeCode
              codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode"
              codeListValue="featureCatalog"/>
          </mdb:resourceScope>
          <mdb:name gco:nilReason="missing">
            <gco:CharacterString/>
          </mdb:name>
        </mdb:MD_MetadataScope>
      </mdb:metadataScope>
      <mdb:contact>
        <cit:CI_Responsibility>
          <cit:role>
            <cit:CI_RoleCode
              codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode"
              codeListValue="pointOfContact"/>
          </cit:role>
          <cit:party>
            <cit:CI_Organisation>
              <cit:name>
                <gco:CharacterString>European Environment Agency</gco:CharacterString>
              </cit:name>
              <cit:contactInfo>
                <cit:CI_Contact>
                  <cit:address>
                    <cit:CI_Address>
                      <cit:electronicMailAddress>
                        <gco:CharacterString>sdi@eea.europa.eu</gco:CharacterString>
                      </cit:electronicMailAddress>
                    </cit:CI_Address>
                  </cit:address>
                </cit:CI_Contact>
              </cit:contactInfo>
            </cit:CI_Organisation>
          </cit:party>
        </cit:CI_Responsibility>
      </mdb:contact>
      <mdb:metadataStandard>
        <cit:CI_Citation>
          <cit:title>
            <gco:CharacterString>ISO 19115-3 / ISO 19110</gco:CharacterString>
          </cit:title>
        </cit:CI_Citation>
      </mdb:metadataStandard>

      <xsl:call-template name="buildFeatureCatalogue"/>
    </mdb:MD_Metadata>
  </xsl:template>

  <xsl:template name="buildFeatureCatalogue">

    <!--
    For one dataset, various feature catalogues with minor changes:
    * new columns
    * or mb > Mb
    Define if one feature catalogue must be created for each cases?
    How to link it with a distribution?

    = ID,MS,VFN,MP,Mh,MAN,MMS,TAN,T,Va,Ve,Mk,Cn,Ct,Cr,r,M (kg),Mt (kg),Mb (kg),TPMLM (kg),Dam (kg),Mf (kg),Enedc (g/km),Ewltp (g/km),At1 (mm),At2 (mm),W (mm),Ft,Fm,Ec (cm3),Ep (KW),Z (Wh/km),IT,Ernedc (g/km),Erwltp (g/km),De,Vf,Zr
  = ID,MS,VFN,MP,Mh,MAN,MMS,TAN,T,Va,Ve,Mk,Cn,Ct,Cr,r,M (kg),Mt (kg),Mb (kg),TPMLM (kg),Dam (kg),Mf (kg),Enedc (g/km),Ewltp (g/km),At1 (mm),At2 (mm),W (mm),Ft,Fm,Ec (cm3),Ep (KW),Z (Wh/km),IT,Ernedc (g/km),Erwltp (g/km),De,Vf
  = ID,MS,VFN,MP,Mh,MAN,MMS,TAN,T,Va,Ve,Mk,Cn,Ct,Cr,r,M (kg),Mb (kg),TPMLM (kg),Dam (kg),Mf (kg),Enedc (g/km),Ewltp (g/km),At1 (mm),At2 (mm),W (mm),Ft,Fm,Ec (cm3),Ep (KW),Z (Wh/km),IT,Ernedc (g/km),Erwltp (g/km),De,Vf
  = ID,MS,MP,Mh,MAN,MMS,TAN,T,Va,Ve,Mk,Cn,Ct,Cr,r,m (kg),mb (kg),TPMLM (kg),Dam (kg),mf (kg),e (g/km),w (mm),at1 (mm),at2 (mm),Ft,Fm,ec (cm3),ep (KW),z (Wh/km),IT,Er (g/km)
  = ID,MS,MP,Mh,MAN,MMS,T,Va,Ve,Mk,Cn,Ct,Cr,r,m (kg),mb (kg),TPMLM (kg),Dam (kg),mf (kg),e (g/km),w (mm),at1 (mm),at2 (mm),Ft,Fm,ec (cm3),z (Wh/km),IT,Er (g/km),TAN,ep (KW)
  = ID,MS,MP,Mh,MAN,MMS,T,Va,Ve,Mk,Cn,Ct,Cr,r,m (kg),mb (kg),TPMLM (kg),dam (kg),mf (kg),e (g/km),w (mm),at1 (mm),at2 (mm),Ft,Fm,ec (cm3),z (Wh/km),IT,Er (g/km),TAN,ep (KW)
  = ID,MS,MP,Mh,MAN,MMS,T,Va,Ve,Mk,Cn,Ct,Cr,r,m (kg),TPMLM (kg),e (g/km),w (mm),at1 (mm),at2 (mm),Ft,Fm,ec (cm3),z (Wh/km),IT,Er (g/km),TAN,ep (KW)

  = Emissions,Country_code,Country,Pollutant_name,Format_name,Sector_code,Parent_sector_code,Sector_name,Year,Unit,Notation
  = Emissions,Country_code,Country,Pollutant_name,Format_name,Sector_code,Parent_sector_code,Sector_name,Year,Unit,Notation
    -->
    <!--<xsl:variable name="definitions">
      <xsl:for-each select="$tableDefinitions[starts-with(., '&lt;table')]">
        <xsl:variable name="table"
                      select="replace(
                        replace(., '\n|\r\n', ''),
                        '(&lt;table.*table&gt;).*',
                        '$1')"/>
        <def>
          <xsl:copy-of select="saxon:parse($table)"/>
        </def>
      </xsl:for-each>
    </xsl:variable>

    <xsl:for-each-group select="$definitions/def"
                        group-by="string-join(.//tbody/tr/td[1], ',')">
      <xsl:message>= <xsl:value-of select="current-grouping-key()"/> </xsl:message>
    </xsl:for-each-group>-->

    <xsl:for-each-group select="fc/tableDefinition"
                        group-by=".">

      <mdb:contentInfo>
        <mrc:MD_FeatureCatalogue>
          <mrc:featureCatalogue>
            <gfc:FC_FeatureCatalogue>
              <cat:name>
                <gco:CharacterString>
                  <xsl:value-of select="../title"/>
                </gco:CharacterString>
              </cat:name>
              <cat:scope>
                <gco:CharacterString>
                  <xsl:value-of select="../description"/>
                </gco:CharacterString>
              </cat:scope>
              <gfc:producer>
                <cit:CI_Responsibility>
                  <cit:role>
                    <cit:CI_RoleCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#CI_RoleCode"
                                     codeListValue="author"/>
                  </cit:role>
                  <cit:party>
                    <cit:CI_Organisation>
                      <cit:name>
                        <gco:CharacterString>European Environment Agency</gco:CharacterString>
                      </cit:name>
                      <cit:contactInfo>
                        <cit:CI_Contact>
                          <cit:address>
                            <cit:CI_Address>
                              <cit:electronicMailAddress>
                                <gco:CharacterString>sdi@eea.europa.eu</gco:CharacterString>
                              </cit:electronicMailAddress>
                            </cit:CI_Address>
                          </cit:address>
                        </cit:CI_Contact>
                      </cit:contactInfo>
                    </cit:CI_Organisation>
                  </cit:party>
                </cit:CI_Responsibility>
              </gfc:producer>
              <xsl:choose>
                <xsl:when test="position() = 1">
                  <xsl:variable name="cdata"
                                select="concat('&lt;div&gt;', ., '&lt;/div&gt;')"/>
                  <xsl:variable name="isXMLLike"
                                select="xmlutil:isXMLLike($cdata)"/>
                  <xsl:choose>
                    <xsl:when test="true()">
                      <!--                    <xsl:when test="$isXMLLike">-->
                      <xsl:variable name="content"
                                    select="saxon:parse($cdata)"/>
                      <!--
                      <p><strong>title?
                      <p>desc
                      <thead>^M
                        <tr><th>Field name</th><th>Field Definition</th><th>Data type</th><th>Primary key</th></tr>^M
                        </thead>^M
                        <tbody>^M
                        <tr>^M
                        <td>ID</td>^M
                        <td>ID</td>^M
                        <td>integer</td>^M
                        <td>Yes</td>^M
                        </tr>^M
                      -->
                      <xsl:for-each select="$content//table">

                        <xsl:variable name="columns"
                                      select="."/>
                        <xsl:variable name="typeColumnPosition"
                                      select="$columns//thead/tr/th[lower-case(.) = 'data type']/count(preceding-sibling::th)"/>
                        <xsl:variable name="noteColumnPosition"
                                      select="$columns//thead/tr/th[lower-case(.) = 'note']/count(preceding-sibling::th)"/>
                        <xsl:variable name="cardinalityColumnPosition"
                                      select="$columns//thead/tr/th[lower-case(.) = 'primary key']/count(preceding-sibling::th)"/>

                        <xsl:variable name="tableTitle"
                                      select="if (preceding-sibling::p/strong[1]) then preceding-sibling::p/strong[1] else ''"/>
                        <xsl:variable name="tableDesc"
                                      select="if (preceding-sibling::p[not(strong)][1]) then preceding-sibling::p[not(strong)][1] else ''"/>
                        <gfc:featureType>
                          <gfc:FC_FeatureType>
                            <gfc:typeName><xsl:value-of select="$tableTitle[last()]"/></gfc:typeName>
                            <gfc:definition>
                              <gco:CharacterString>
                                <xsl:value-of select="$tableDesc"/>
                              </gco:CharacterString>
                            </gfc:definition>
                            <gfc:isAbstract>
                              <gco:Boolean>false</gco:Boolean>
                            </gfc:isAbstract>

                            <xsl:choose>
                              <xsl:when test="$columns//tbody">
                                <xsl:for-each select="$columns//tbody/tr">
                                  <gfc:carrierOfCharacteristics>
                                    <gfc:FC_FeatureAttribute>
                                      <gfc:memberName>
                                        <xsl:value-of select="td[1]"/>
                                      </gfc:memberName>
                                      <gfc:definition>
                                        <gco:CharacterString>
                                          <xsl:value-of select="td[2]"/>.
                                          <xsl:if test="$noteColumnPosition and td[$noteColumnPosition + 1] != ''">
                                            <xsl:text> Note: </xsl:text>
                                            <xsl:value-of select="td[$noteColumnPosition + 1]"/>
                                          </xsl:if>
                                        </gco:CharacterString>
                                      </gfc:definition>
                                      <gfc:cardinality>
                                        <gco:CharacterString>
                                          <xsl:value-of
                                            select="if (td[$cardinalityColumnPosition + 1] = 'Yes') then '1..1' else '0..1'"/>
                                        </gco:CharacterString>
                                      </gfc:cardinality>
                                      <!--<gfc:valueMeasurementUnit>
                                        <gco:UomIdentifier/>
                                      </gfc:valueMeasurementUnit>-->
                                      <gfc:valueType>
                                        <gco:TypeName>
                                          <gco:aName>
                                            <gco:CharacterString>
                                              <xsl:value-of select="td[$typeColumnPosition + 1]"/>
                                            </gco:CharacterString>
                                          </gco:aName>
                                        </gco:TypeName>
                                      </gfc:valueType>
                                    </gfc:FC_FeatureAttribute>
                                  </gfc:carrierOfCharacteristics>
                                </xsl:for-each>
                              </xsl:when>
                              <xsl:otherwise>
                                <xsl:for-each select="$columns//tr">
                                  <gfc:carrierOfCharacteristics>
                                    <gfc:FC_FeatureAttribute>
                                      <gfc:memberName>
                                        <xsl:value-of select="td[1]"/>
                                      </gfc:memberName>
                                      <gfc:definition>
                                        <gco:CharacterString>
                                          <xsl:value-of select="td[2]"/>.
                                        </gco:CharacterString>
                                      </gfc:definition>
                                      <gfc:cardinality>
                                        <gco:CharacterString>

                                        </gco:CharacterString>
                                      </gfc:cardinality>
                                      <gfc:valueType>
                                        <gco:TypeName>
                                          <gco:aName>
                                            <gco:CharacterString>
                                              <xsl:value-of select="td[4]"/>
                                            </gco:CharacterString>
                                          </gco:aName>
                                        </gco:TypeName>
                                      </gfc:valueType>
                                    </gfc:FC_FeatureAttribute>
                                  </gfc:carrierOfCharacteristics>
                                </xsl:for-each>
                              </xsl:otherwise>
                            </xsl:choose>
                          </gfc:FC_FeatureType>
                        </gfc:featureType>
                      </xsl:for-each>

                    </xsl:when>
                    <xsl:otherwise>
                      <xsl:message>Not well formed feature catalogue:
                        <xsl:copy-of select="."/>
                      </xsl:message>
                    </xsl:otherwise>
                  </xsl:choose>
                </xsl:when>
              </xsl:choose>

            </gfc:FC_FeatureCatalogue>
          </mrc:featureCatalogue>
        </mrc:MD_FeatureCatalogue>
      </mdb:contentInfo>
    </xsl:for-each-group>
  </xsl:template>
</xsl:stylesheet>
