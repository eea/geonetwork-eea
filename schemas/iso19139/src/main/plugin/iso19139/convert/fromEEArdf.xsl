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
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                version="2.0"
                exclude-result-prefixes="#all">

  <xsl:template match="/">
    <xsl:apply-templates select="//data:Data"/>
  </xsl:template>

  <!--
  TODO
    <dcterms:description xml:lang="en">The Regulation (EU) No 2019/631 (and

    <data:reportingObligations>665</data:reportingObligations>
    <data:reportingObligations>141</data:reportingObligations>
    eg. https://rod.eionet.europa.eu/obligations/665


    <data:dataOwner>http://ec.europa.eu/dgs/clima/mission/index_en.htm</data:dataOwner>

    <data:units xml:lang="en"><![CDATA[<p>Gg (1000 Tonnes)</p>]]></data:units>

    <dcterms:expires xml:lang="en">None</dcterms:expires>

    <data:relatedItems rdf:resource="http://www.eea.europa.eu/data-and-maps/daviz/average-statistics-of-new-vans-1"/>

    <data:shortId xml:lang="en">1100</data:shortId>
    <schema:productID>DAT-20-en</schema:productID>

    <data:pdfStatic xml:lang="en">None</data:pdfStatic>
    <data:pdfMaxBreadth xml:lang="en">None</data:pdfMaxBreadth>
    <data:pdfMaxDepth xml:lang="en">None</data:pdfMaxDepth>
    <data:pdfMaxItems xml:lang="en">None</data:pdfMaxItems>
    <data:tocdepth xml:lang="en">4</data:tocdepth>

    <eea:wordCount rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3107</eea:wordCount>
    <eea:fleschReadingEaseScore rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">23</eea:fleschReadingEaseScore>
    <eea:readingTime rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">2</eea:readingTime>

    <data:eeaManagementPlan xml:lang="en">2019 1.3.7</data:eeaManagementPlan>

    <dcterms:creator>kjeldpet</dcterms:creator>

    <data:forcedisableautolinks xml:lang="en">False</data:forcedisableautolinks>

    <wf:currentStatus>
      <wf:DetailedProgressStatus rdf:about="#workflow_state_progress">
        <wf:progressLevel rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">100</wf:progressLevel>
      </wf:DetailedProgressStatus>
    </wf:currentStatus>

      HTML in text is lost.
      CDATA support

  -->

  <xsl:template match="data:Data">
    <gmd:MD_Metadata xmlns:gmd="http://www.isotc211.org/2005/gmd"
                     xmlns:gco="http://www.isotc211.org/2005/gco"
                     xmlns:srv="http://www.isotc211.org/2005/srv"
                     xmlns:gmx="http://www.isotc211.org/2005/gmx"
                     xmlns:gts="http://www.isotc211.org/2005/gts"
                     xmlns:gsr="http://www.isotc211.org/2005/gsr"
                     xmlns:gmi="http://www.isotc211.org/2005/gmi"
                     xmlns:gml="http://www.opengis.net/gml"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://www.isotc211.org/2005/gmd http://schemas.opengis.net/csw/2.0.2/profiles/apiso/1.0.0/apiso.xsd">
      <gmd:fileIdentifier>
        <!-- <data:id xml:lang="en">vans-16</data:id>-->
        <gco:CharacterString>eea-data-and-maps-data-<xsl:value-of select="data:id"/></gco:CharacterString>
      </gmd:fileIdentifier>
      <gmd:language>
        <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
      </gmd:language>
      <gmd:characterSet>
        <gmd:MD_CharacterSetCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_CharacterSetCode"
                                 codeListValue="utf8"/>
      </gmd:characterSet>
      <gmd:hierarchyLevel>
        <gmd:MD_ScopeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode"
                          codeListValue="nonGeographicDataset"/>
      </gmd:hierarchyLevel>
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
      <gmd:dateStamp>
        <gco:DateTime>2019-07-31T18:18:18</gco:DateTime>
      </gmd:dateStamp>
      <gmd:metadataStandardName>
        <gco:CharacterString>ISO 19115:2003/19139</gco:CharacterString>
      </gmd:metadataStandardName>
      <gmd:metadataStandardVersion>
        <gco:CharacterString>1.0</gco:CharacterString>
      </gmd:metadataStandardVersion>
      <gmd:identificationInfo>
        <gmd:MD_DataIdentification>
          <gmd:citation>
            <gmd:CI_Citation>
              <!--
                <dcterms:title xml:lang="en">Monitoring of CO2 emissions from vans</dcterms:title>
              -->
              <gmd:title>
                <gco:CharacterString>
                  <xsl:value-of select="dcterms:title"/>
                </gco:CharacterString>
              </gmd:title>
              <!-- TODO
                <dcterms:modified rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-08-11T13:00:41+00:00</dcterms:modified>
              -->
              <!--
                <dcterms:created rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-08-11T12:52:32+00:00</dcterms:created>
              TODO: Data or metadata?
              -->
              <xsl:for-each select="dcterms:created">
                <gmd:date>
                  <gmd:CI_Date>
                    <gmd:date>
                      <gco:Date>
                        <xsl:value-of select="."/>
                      </gco:Date>
                    </gmd:date>
                    <gmd:dateType>
                      <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"
                                           codeListValue="creation"/>
                    </gmd:dateType>
                  </gmd:CI_Date>
                </gmd:date>
              </xsl:for-each>
              <!--
                <dcterms:issued rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-06-29T08:58:25+00:00</dcterms:issued>
              -->
              <xsl:for-each select="data:issued">
                <gmd:date>
                  <gmd:CI_Date>
                    <gmd:date>
                      <gco:Date>
                        <xsl:value-of select="."/>
                      </gco:Date>
                    </gmd:date>
                    <gmd:dateType>
                      <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"
                                           codeListValue="publication"/>
                    </gmd:dateType>
                  </gmd:CI_Date>
                </gmd:date>
              </xsl:for-each>
              <!--
                <data:lastUpload rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2019-06-19T22:00:00+00:00</data:lastUpload>
              -->
              <xsl:for-each select="data:lastUpload">
                <gmd:date>
                  <gmd:CI_Date>
                    <gmd:date>
                      <gco:Date>
                        <xsl:value-of select="."/>
                      </gco:Date>
                    </gmd:date>
                    <gmd:dateType>
                      <gmd:CI_DateTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode"
                                           codeListValue="publication"/>
                    </gmd:dateType>
                  </gmd:CI_Date>
                </gmd:date>
              </xsl:for-each>
              <gmd:edition gco:nilReason="missing">
                <gco:CharacterString/>
              </gmd:edition>

              <!--
                <data:Data rdf:about="http://www.eea.europa.eu/data-and-maps/data/vans-16">
              -->
              <xsl:for-each select="@rdf:about">
                <gmd:identifier>
                  <gmd:MD_Identifier>
                    <gmd:code>
                      <gco:CharacterString>
                        <xsl:value-of select="."/>
                      </gco:CharacterString>
                    </gmd:code>
                  </gmd:MD_Identifier>
                </gmd:identifier>
              </xsl:for-each>
            </gmd:CI_Citation>
          </gmd:citation>

          <gmd:abstract>
            <gco:CharacterString>
              <xsl:value-of select="dcterms:abstract"/>
            </gco:CharacterString>
          </gmd:abstract>

          <!-- <data:dataSource xml:lang="en"><![CDATA[<p><span>Directorate-General for Climate Action, 2016.</span><br style="margin: 0px; padding: 0px; " /><span>Data are submitted by Member States at: http://cdr.eionet.europa.eu/</span></p>]]></data:dataSource>-->
          <xsl:for-each select="data:dataSource">
            <gmd:credit>
              <xsl:value-of select="normalize-space(.)"/>
            </gmd:credit>
          </xsl:for-each>


          <!-- TODO -->
          <xsl:variable name="status"
                        select="if(false()) then 'superseded' else 'completed'"/>

          <gmd:status>
            <gmd:MD_ProgressCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode"
                                 codeListValue="{$status}"/>
          </gmd:status>

          <!--
           <data:contact xml:lang="en">
           Inhouse contact: Cinzia Pastorello,
            cinzia.pastorello@eea.europa.eu&#13;
           Operator: Peter Kjeld, peter.kjeld@eea.europa.eu</data:contact>
          -->
          <xsl:for-each select="data:contact">
            <gmd:pointOfContact>
              <gmd:CI_ResponsibleParty>
                <gmd:individualName gco:nilReason="missing">
                  <gco:CharacterString/>
                </gmd:individualName>
                <gmd:organisationName>
                  <gco:CharacterString>
                    <xsl:value-of select="."/>
                  </gco:CharacterString>
                </gmd:organisationName>
                <gmd:positionName gco:nilReason="missing">
                  <gco:CharacterString/>
                </gmd:positionName>
                <gmd:role>
                  <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                                   codeListValue="processor"/>
                </gmd:role>
              </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
          </xsl:for-each>

<!--
           TODO
           <schema:publisher>
            <schema:Organization rdf:about="http://www.eea.europa.eu#organization">
              <schema:logo rdf:resource="https://www.eea.europa.eu/logo-square.png#logo"/>
              <schema:name>European Environment Agency</schema:name>
              <schema:sameAs>https://www.facebook.com/European.Environment.Agency</schema:sameAs>
              <schema:sameAs>https://twitter.com/euenvironment</schema:sameAs>
              <schema:contactPoint rdf:resource="http://www.eea.europa.eu#contact-point-0"/>
              <schema:sameAs>https://www.youtube.com/user/EEAvideos</schema:sameAs>
            </schema:Organization>
          </schema:publisher>-->


          <gmd:resourceMaintenance>
            <gmd:MD_MaintenanceInformation>
              <gmd:maintenanceAndUpdateFrequency>
                <gmd:MD_MaintenanceFrequencyCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode"
                                                 codeListValue=""/>
              </gmd:maintenanceAndUpdateFrequency>
            </gmd:MD_MaintenanceInformation>
          </gmd:resourceMaintenance>

          <!--<foaf:depiction>
            <schema:Image rdf:about="http://www.eea.europa.eu/data-icon.png">
              <rdfs:label>type_icon</rdfs:label>
            </schema:Image>
          </foaf:depiction>-->
          <xsl:for-each select="foaf:depiction/schema:Image">
            <gmd:graphicOverview>
              <gmd:MD_BrowseGraphic>
                <gmd:fileName>
                  <gco:CharacterString>
                    <xsl:value-of select="@rdf:about"/>
                  </gco:CharacterString>
                </gmd:fileName>
              </gmd:MD_BrowseGraphic>
            </gmd:graphicOverview>
          </xsl:for-each>


          <!-- <data:themes>transport</data:themes>-->
          <gmd:descriptiveKeywords>
            <gmd:MD_Keywords>
              <xsl:for-each select="data:themes">
                <gmd:keyword>
                  <gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/{.}">
                    <!-- TODO translate ?-->
                    <xsl:value-of select="."/>
                  </gmx:Anchor>
                </gmd:keyword>
              </xsl:for-each>
              <gmd:type>
                <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode" codeListValue="theme"/>
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
              <!-- <dcterms:subject>co2 emissions</dcterms:subject> -->
              <xsl:for-each select="dcterms:subject">
                <xsl:sort select="."/>
                <gmd:keyword>
                  <gco:CharacterString>
                    <xsl:value-of select="."/>
                  </gco:CharacterString>
                </gmd:keyword>
              </xsl:for-each>
              <gmd:type>
                <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                        codeListValue="theme"/>
              </gmd:type>
              <gmd:thesaurusName>
                <gmd:CI_Citation>
                  <gmd:title>
                    <gco:CharacterString>EEA keyword list</gco:CharacterString>
                  </gmd:title>
                  <gmd:date>
                    <gmd:CI_Date>
                      <gmd:date>
                        <gco:Date>2002-03-01</gco:Date>
                      </gmd:date>
                      <gmd:dateType>
                        <gmd:CI_DateTypeCode codeList="https://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/codelist/ML_gmxCodelists.xml#CI_DateTypeCode"
                                             codeListValue="publication"/>
                      </gmd:dateType>
                    </gmd:CI_Date>
                  </gmd:date>
                </gmd:CI_Citation>
              </gmd:thesaurusName>
            </gmd:MD_Keywords>
          </gmd:descriptiveKeywords>


          <gmd:descriptiveKeywords gco:nilReason="withheld">
            <gmd:MD_Keywords>
              <gmd:keyword>
                <gco:CharacterString>tabular data</gco:CharacterString>
              </gmd:keyword>
              <gmd:type>
                <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                        codeListValue="theme"/>
              </gmd:type>
              <gmd:thesaurusName>
                <gmd:CI_Citation>
                  <gmd:title>
                    <gco:CharacterString>EEA categories</gco:CharacterString>
                  </gmd:title>
                  <gmd:date>
                    <gmd:CI_Date>
                      <gmd:date>
                        <gco:Date>2010-07-06</gco:Date>
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
                        <gmx:Anchor xlink:href="http://sdi.eea.europa.eu/geonetwork/srv/eng/thesaurus.download?ref=local.theme.eea-categories">geonetwork.thesaurus.local.theme.eea-categories</gmx:Anchor>
                      </gmd:code>
                    </gmd:MD_Identifier>
                  </gmd:identifier>
                </gmd:CI_Citation>
              </gmd:thesaurusName>
            </gmd:MD_Keywords>
          </gmd:descriptiveKeywords>


          <gmd:descriptiveKeywords>
            <gmd:MD_Keywords>
              <gmd:keyword gco:nilReason="missing">
                <gco:CharacterString/>
              </gmd:keyword>
              <gmd:type>
                <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
                                        codeListValue="theme"/>
              </gmd:type>
              <gmd:thesaurusName>
                <gmd:CI_Citation>
                  <gmd:title>
                    <gco:CharacterString>GEMET</gco:CharacterString>
                  </gmd:title>
                  <gmd:date>
                    <gmd:CI_Date>
                      <gmd:date>
                        <gco:Date>2018-08-16</gco:Date>
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
                        <gmx:Anchor xlink:href="http://sdi.eea.europa.eu/geonetwork/srv/eng/thesaurus.download?ref=external.theme.gemet">geonetwork.thesaurus.external.theme.gemet</gmx:Anchor>
                      </gmd:code>
                    </gmd:MD_Identifier>
                  </gmd:identifier>
                </gmd:CI_Citation>
              </gmd:thesaurusName>
            </gmd:MD_Keywords>
          </gmd:descriptiveKeywords>


          <gmd:descriptiveKeywords>
            <gmd:MD_Keywords>
              <!--  <dcterms:spatial>
                    <geo:SpatialThing rdf:about="#geotag35">
                      <rdfs:label>EU (European Union)</rdfs:label>
                      <owl:sameAs rdf:resource="http://rdfdata.eionet.europa.eu/eea/countries/EU"/>
                      <skos:notation>EU</skos:notation>
                      <dcterms:type>countries_group</dcterms:type>
                      <rdfs:comment>European Union: Cyprus, Portugal, Spain, Malta, Denmark, United Kingdom, Sweden, Netherlands, Austria, Belgium, Germany, Luxembourg, Ireland, France, Slovakia, Czechia, Italy, Slovenia, Greece, Croatia, Estonia, Latvia, Lithuania, Finland, Hungary, Bulgaria, Poland, Romania</rdfs:comment>
                      <dcterms:title>EU (European Union)</dcterms:title>
                    </geo:SpatialThing>
                  </dcterms:spatial>
              -->
              <xsl:for-each select="dcterms:spatial/geo:SpatialThing/rdfs:label">
                <xsl:sort select="."/>
                <gmd:keyword gco:nilReason="missing">
                  <xsl:choose>
                    <xsl:when test="../owl:sameAs">
                      <gmx:Anchor xlink:href="{../owl:sameAs}">
                        <xsl:value-of select="."/>
                      </gmx:Anchor>
                    </xsl:when>
                    <xsl:otherwise>
                      <gco:CharacterString>
                        <xsl:value-of select="."/>
                      </gco:CharacterString>
                    </xsl:otherwise>
                  </xsl:choose>
                </gmd:keyword>
              </xsl:for-each>
              <gmd:type>
                <gmd:MD_KeywordTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode"
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
                        <gco:Date>2015-07-17</gco:Date>
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
                        <gmx:Anchor xlink:href="http://sdi.eea.europa.eu/geonetwork/srv/eng/thesaurus.download?ref=external.place.regions">geonetwork.thesaurus.external.place.regions</gmx:Anchor>
                      </gmd:code>
                    </gmd:MD_Identifier>
                  </gmd:identifier>
                </gmd:CI_Citation>
              </gmd:thesaurusName>
            </gmd:MD_Keywords>
          </gmd:descriptiveKeywords>

          <gmd:resourceConstraints>
            <gmd:MD_Constraints>
              <gmd:useLimitation>
<!--                <dcterms:rights xml:lang="en">EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (https://www.eea.europa.eu/legal/copyright). Copyright holder: Directorate-General for Climate Action (DG-CLIMA).</dcterms:rights>
TODO
-->
                <gco:CharacterString>EEA standard re-use policy: unless otherwise indicated, re-use of content on the EEA website for commercial or non-commercial purposes is permitted free of charge, provided that the source is acknowledged (http://www.eea.europa.eu/legal/copyright). Copyright holder: European Environment Agency (EEA).</gco:CharacterString>
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
                <gmx:Anchor xlink:href="http://inspire.ec.europa.eu/metadata-codelist/LimitationsOnPublicAccess/noLimitations">No limitations to public access</gmx:Anchor>
              </gmd:otherConstraints>
            </gmd:MD_LegalConstraints>
          </gmd:resourceConstraints>


          <!--
            <dcterms:replaces rdf:resource="http://www.eea.europa.eu/data-and-maps/data/vans-1"/>
          -->
          <xsl:for-each select="dcterms:replaces">
            <gmd:aggregationInfo>
              <gmd:MD_AggregateInformation>
                <gmd:aggregateDataSetIdentifier>
                  <gmd:MD_Identifier>
                    <gmd:code>
                      <gmx:Anchor xlink:href="{@rdf:resource}">
                        <xsl:value-of select="@rdf:resource"/>
                      </gmx:Anchor>
                    </gmd:code>
                  </gmd:MD_Identifier>
                </gmd:aggregateDataSetIdentifier>
                <gmd:associationType>
                  <gmd:DS_AssociationTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#DS_AssociationTypeCode" codeListValue="revisionOf"/>
                </gmd:associationType>
              </gmd:MD_AggregateInformation>
            </gmd:aggregationInfo>
          </xsl:for-each>

          <!--
              <dcterms:references rdf:resource="http://www.eea.europa.eu/data-and-maps/daviz/average-carbon-dioxide-emissions-from-2"/>
          -->
          <xsl:for-each select="dcterms:references">
            <gmd:aggregationInfo>
              <gmd:MD_AggregateInformation>
                <gmd:aggregateDataSetIdentifier>
                  <gmd:MD_Identifier>
                    <gmd:code>
                      <gmx:Anchor xlink:href="{@rdf:resource}">
                        <xsl:value-of select="@rdf:resource"/>
                      </gmx:Anchor>
                    </gmd:code>
                  </gmd:MD_Identifier>
                </gmd:aggregateDataSetIdentifier>
                <gmd:associationType>
                  <gmd:DS_AssociationTypeCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#DS_AssociationTypeCode" codeListValue="crossReference"/>
                </gmd:associationType>
              </gmd:MD_AggregateInformation>
            </gmd:aggregationInfo>
          </xsl:for-each>


          <!-- <data:scale xml:lang="en">None</data:scale>-->
          <xsl:for-each select="data:scale[. castable as xs:double]">
            <gmd:spatialResolution>
              <gmd:MD_Resolution>
                <gmd:equivalentScale>
                  <gmd:MD_RepresentativeFraction>
                    <gmd:denominator>
                      <gco:Integer>
                        <xsl:value-of select="."/>
                      </gco:Integer>
                    </gmd:denominator>
                  </gmd:MD_RepresentativeFraction>
                </gmd:equivalentScale>
              </gmd:MD_Resolution>
            </gmd:spatialResolution>
          </xsl:for-each>

          <gmd:spatialResolution>
            <gmd:MD_Resolution>
              <gmd:distance>
                <gco:Distance uom="m"/>
              </gmd:distance>
            </gmd:MD_Resolution>
          </gmd:spatialResolution>

          <gmd:language>
            <gmd:LanguageCode codeList="http://www.loc.gov/standards/iso639-2/" codeListValue="eng"/>
          </gmd:language>
          <gmd:topicCategory>
            <gmd:MD_TopicCategoryCode>environment</gmd:MD_TopicCategoryCode>
          </gmd:topicCategory>
          <gmd:extent>
            <gmd:EX_Extent>
              <gmd:geographicElement>
                <gmd:EX_GeographicBoundingBox>
                  <gmd:westBoundLongitude>
                    <gco:Decimal/>
                  </gmd:westBoundLongitude>
                  <gmd:eastBoundLongitude>
                    <gco:Decimal/>
                  </gmd:eastBoundLongitude>
                  <gmd:southBoundLatitude>
                    <gco:Decimal/>
                  </gmd:southBoundLatitude>
                  <gmd:northBoundLatitude>
                    <gco:Decimal/>
                  </gmd:northBoundLatitude>
                </gmd:EX_GeographicBoundingBox>
              </gmd:geographicElement>

              <!-- <data:temporalCoverage>2012</data:temporalCoverage> -->
              <xsl:for-each select="data:temporalCoverage">
                <gmd:temporalElement>
                  <gmd:EX_TemporalExtent>
                    <gmd:extent>
                      <gml:TimePeriod gml:id="d17964e856a1052958">
                        <gml:beginPosition>
                          <xsl:value-of select="."/>
                        </gml:beginPosition>
                        <gml:endPosition>
                          <xsl:value-of select="."/>
                        </gml:endPosition>
                      </gml:TimePeriod>
                    </gmd:extent>
                  </gmd:EX_TemporalExtent>
                </gmd:temporalElement>
              </xsl:for-each>
            </gmd:EX_Extent>
          </gmd:extent>

          <!--
          <data:moreInfo xml:lang="en"><![CDATA[<p>Since 2013 the EEA ha
          -->
          <xsl:for-each select="data:moreInfo">
            <gmd:supplementalInformation>
              <gco:CharacterString>
                <xsl:value-of select="."/>
              </gco:CharacterString>
            </gmd:supplementalInformation>
          </xsl:for-each>
        </gmd:MD_DataIdentification>
      </gmd:identificationInfo>
      <gmd:distributionInfo>
        <gmd:MD_Distribution>
          <gmd:distributionFormat>
            <gmd:MD_Format>
              <gmd:name gco:nilReason="missing">
                <gco:CharacterString/>
              </gmd:name>
              <gmd:version gco:nilReason="unknown">
                <gco:CharacterString/>
              </gmd:version>
            </gmd:MD_Format>
          </gmd:distributionFormat>
          <gmd:transferOptions>
            <gmd:MD_DigitalTransferOptions>
              <!--
                  <dcterms:hasPart rdf:resource="http://www.eea.europa.eu/data-and-maps/data/vans-16/monitoring-vans-co2-emissions_2013f"/>
                  <dcterms:hasPart rdf:resource="http://www.eea.europa.eu/data-and-maps/data/vans-16/monitoring-of-co2-emissions-vans-2016-final"/>
              -->
              <xsl:for-each select="dcterms:hasPart">
                <xsl:variable name="partDetails"
                              select="document(concat(@rdf:resource, '/@@rdf'))"/>
                <xsl:for-each select="$partDetails//datatable:DataTable/dcterms:hasPart">
                  <gmd:onLine>
                    <gmd:CI_OnlineResource>
                      <gmd:linkage>
                        <gmd:URL><xsl:value-of select="@rdf:resource"/></gmd:URL>
                      </gmd:linkage>
                      <gmd:name>
                        <gco:CharacterString>
                          <xsl:value-of select="$partDetails//datatable:DataTable/dcterms:title"/>
                        </gco:CharacterString>
                      </gmd:name>
                      <gmd:protocol>
                        <gco:CharacterString>WWW:DOWNLOAD</gco:CharacterString>
                      </gmd:protocol>
                      <gmd:function>
                        <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                                   codeListValue="download"/>
                      </gmd:function>
                    </gmd:CI_OnlineResource>
                  </gmd:onLine>
                </xsl:for-each>
              </xsl:for-each>
            </gmd:MD_DigitalTransferOptions>
          </gmd:transferOptions>
        </gmd:MD_Distribution>
      </gmd:distributionInfo>
      <gmd:dataQualityInfo>
        <gmd:DQ_DataQuality>
          <gmd:scope>
            <gmd:DQ_Scope>
              <gmd:level>
                <gmd:MD_ScopeCode codeListValue="dataset"
                                  codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode"/>
              </gmd:level>
            </gmd:DQ_Scope>
          </gmd:scope>
          <gmd:lineage>
            <gmd:LI_Lineage>
              <gmd:statement gco:nilReason="missing">
                <gco:CharacterString/>
              </gmd:statement>
            </gmd:LI_Lineage>
          </gmd:lineage>
        </gmd:DQ_DataQuality>
      </gmd:dataQualityInfo>
    </gmd:MD_Metadata>
  </xsl:template>
</xsl:stylesheet>
