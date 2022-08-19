<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
                xmlns:owl="http://www.w3.org/2002/07/owl#"
                xmlns:data="http://www.eea.europa.eu/portal_types/Data#"
                xmlns:datatable="http://www.eea.europa.eu/portal_types/DataTable#"
                xmlns:datafilelink="http://www.eea.europa.eu/portal_types/DataFileLink#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:dcterms="http://purl.org/dc/terms/"
                xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
                xmlns:schema="http://schema.org/"
                xmlns:gml="http://www.opengis.net/gml/3.2"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:util="java:org.fao.geonet.util.XslUtil"
                version="2.0"
                exclude-result-prefixes="#all">

  <xsl:variable name="withFeatureCatalogue"
                select="false()"/>

  <xsl:variable name="uuidPrefix"
                select="'eea-data-and-maps-data-'"/>

  <xsl:template match="/">
    <xsl:apply-templates select="//data:Data"/>
  </xsl:template>

  <!--
  TODO
    <dcterms:description xml:lang="en">The Regulation (EU) No 2019/631 (and

    <data:dataOwner>http://ec.europa.eu/dgs/clima/mission/index_en.htm</data:dataOwner>


    <data:units xml:lang="en"><![CDATA[<p>Gg (1000 Tonnes)</p>]]></data:units>
    Could be mapped to in Feature Catalogue
     <gfc:valueMeasurementUnit>
        <gco:UomIdentifier/>
     </gfc:valueMeasurementUnit>

    <dcterms:expires xml:lang="en">None</dcterms:expires>

    <data:relatedItems rdf:resource="http://www.eea.europa.eu/data-and-maps/daviz/average-statistics-of-new-vans-1"/>

    <data:shortId xml:lang="en">1100</data:shortId>

    <data:pdfStatic xml:lang="en">None</data:pdfStatic>
    <data:pdfMaxBreadth xml:lang="en">None</data:pdfMaxBreadth>
    <data:pdfMaxDepth xml:lang="en">None</data:pdfMaxDepth>
    <data:pdfMaxItems xml:lang="en">None</data:pdfMaxItems>
    <data:tocdepth xml:lang="en">4</data:tocdepth>

    <eea:wordCount rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">3107</eea:wordCount>
    <eea:fleschReadingEaseScore rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">23</eea:fleschReadingEaseScore>
    <eea:readingTime rdf:datatype="http://www.w3.org/2001/XMLSchema#integer">2</eea:readingTime>

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
                     xmlns:gmx="http://www.isotc211.org/2005/gmx"
                     xmlns:mdb="http://standards.iso.org/iso/19115/-3/mdb/2.0"
                     xmlns:cit="http://standards.iso.org/iso/19115/-3/cit/2.0"
                     xmlns:gco2="http://standards.iso.org/iso/19115/-3/gco/1.0"
                     xmlns:gml="http://www.opengis.net/gml"
                     xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <xsl:variable name="cmsId" select="data:id"/>
      <gmd:fileIdentifier>
<!--        <dcterms:identifier>0a93718db6f541eaa565ba86d6f9ac85</dcterms:identifier>-->
        <!-- <data:id xml:lang="en">vans-16</data:id>-->
        <gco:CharacterString><xsl:value-of select="concat($uuidPrefix, data:id)"/></gco:CharacterString>
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
                    <!-- TODO: Check contact point email. -->
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

      <xsl:if test="dcterms:modified[. != '']">
        <gmd:dateStamp>
          <gco:DateTime><xsl:value-of select="dcterms:modified"/></gco:DateTime>
        </gmd:dateStamp>
      </xsl:if>

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

              <!--
                <dcterms:created rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-08-11T12:52:32+00:00</dcterms:created>

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
              </xsl:for-each> -->
              <!--
                <dcterms:issued rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2021-06-29T08:58:25+00:00</dcterms:issued>
              -->
              <xsl:for-each select="(data:issued[. != '']|dcterms:modified[. != ''])[1]">
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
                <data:lastUpload rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">2019-06-19T22:00:00+00:00</data:lastUpload>
                is ignored has it does not sounds relevant. Use dcterms:modified
              -->
              <xsl:for-each select="dcterms:modified[. != '']">
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

              <!--<gmd:edition gco:nilReason="missing">
                <gco:CharacterString/>
              </gmd:edition>-->

              <!--
                <data:Data rdf:about="http://www.eea.europa.eu/data-and-maps/data/vans-16">
              -->
              <xsl:for-each select="@rdf:about|data:id|schema:productID">
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
              <xsl:if test="dcterms:description != ''">
                <xsl:value-of select="util:html2text(dcterms:description)"/>
              </xsl:if>
            </gco:CharacterString>
          </gmd:abstract>

          <xsl:for-each select="data:units[. != '']">
            <gmd:purpose>
              <gco:CharacterString>
                <xsl:value-of select="util:html2text(.)"/>
              </gco:CharacterString>
            </gmd:purpose>
          </xsl:for-each>


          <!-- TODO
          <xsl:variable name="status"
                        select="if(false()) then 'superseded' else 'completed'"/>

          <gmd:status>
            <gmd:MD_ProgressCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ProgressCode"
                                 codeListValue="{$status}"/>
          </gmd:status> -->

          <!--
           <data:contact xml:lang="en">
            Inhouse contact: Cinzia Pastorello,
            cinzia.pastorello@eea.europa.eu&#13;
            Operator: Peter Kjeld, peter.kjeld@eea.europa.eu</data:contact>
          -->

          <xsl:variable name="orgs" as="node()*">
            <xsl:for-each select="data:contact">
              <xsl:choose>
                <xsl:when test="matches(., '([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)')">
                  <xsl:analyze-string select="." regex="([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)">
                    <xsl:matching-substring>
                      <xsl:variable name="isEEA"
                                    select="ends-with(., 'eea.europa.eu')"/>
                      <xsl:variable name="orgFromEmail"
                                    select="upper-case(replace(., '.*@([a-zA-Z0-9_-]+).*', '$1'))"/>
                      <org name="{if ($isEEA) then 'European Environment Agency' else $orgFromEmail}" mail="{.}"/>
                    </xsl:matching-substring>
                    <xsl:non-matching-substring>
                    </xsl:non-matching-substring>
                  </xsl:analyze-string>
                </xsl:when>
                <xsl:otherwise>
                  <!-- ignored -->
                </xsl:otherwise>
              </xsl:choose>
            </xsl:for-each>
          </xsl:variable>

          <xsl:for-each-group select="$orgs" group-by="@name">
            <gmd:pointOfContact>
              <gmd:CI_ResponsibleParty>
                <gmd:organisationName>
                  <gco:CharacterString>
                    <xsl:value-of select="current-grouping-key()"/>
                  </gco:CharacterString>
                </gmd:organisationName>
                <xsl:choose>
                  <xsl:when test="current-grouping-key() = 'European Environment Agency'">
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
                            <!--<xsl:for-each select="current-group()">
                              <gmd:electronicMailAddress>
                                <gco:CharacterString><xsl:value-of select="@mail"/> </gco:CharacterString>
                              </gmd:electronicMailAddress>
                            </xsl:for-each>-->
                          </gmd:CI_Address>
                        </gmd:address>
                      </gmd:CI_Contact>
                    </gmd:contactInfo>
                  </xsl:when>
                  <xsl:otherwise>
                    <!--<gmd:contactInfo>
                      <gmd:CI_Contact>
                        <gmd:address>
                          <gmd:CI_Address>
                            <xsl:for-each select="current-group()">
                              <gmd:electronicMailAddress>
                                <gco:CharacterString><xsl:value-of select="@mail"/> </gco:CharacterString>
                              </gmd:electronicMailAddress>
                            </xsl:for-each>
                          </gmd:CI_Address>
                        </gmd:address>
                      </gmd:CI_Contact>
                    </gmd:contactInfo>-->
                  </xsl:otherwise>
                </xsl:choose>
                <gmd:role>
                  <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                                   codeListValue="pointOfContact"/>
                </gmd:role>
              </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
          </xsl:for-each-group>

          <!--
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
          <xsl:for-each select="schema:publisher">
            <gmd:pointOfContact>
              <gmd:CI_ResponsibleParty>
                <gmd:organisationName>
                  <gco:CharacterString>
                    <xsl:value-of select="schema:Organization/schema:name"/>
                  </gco:CharacterString>
                </gmd:organisationName>
                <gmd:contactInfo>
                  <gmd:CI_Contact>
                    <gmd:onlineResource>
                      <gmd:CI_OnlineResource>
                        <gmd:linkage>
                          <gmd:URL><xsl:value-of select="schema:Organization/@rdf:about"/></gmd:URL>
                        </gmd:linkage>
                      </gmd:CI_OnlineResource>
                    </gmd:onlineResource>
                  </gmd:CI_Contact>
                </gmd:contactInfo>
                <gmd:role>
                  <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                                   codeListValue="publisher"/>
                </gmd:role>
              </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
          </xsl:for-each>

          <!--
          <data:processor>http://acm.eionet.europa.eu</data:processor>
          -->
          <xsl:variable name="eea-providers"
                        select="document('eea-providers.rdf')"/>

          <xsl:for-each select="data:processor">
            <xsl:variable name="url"
                          select="."/>
            <xsl:variable name="providerInfo"
                          select="$eea-providers//resources[Organisation_url = $url]"/>
            <xsl:variable name="isEEA"
                          select="contains(., 'www.eea.europa.eu')"/>
            <gmd:pointOfContact>
              <gmd:CI_ResponsibleParty>
                <gmd:organisationName>
                  <gco:CharacterString>
                    <xsl:value-of select="if ($isEEA)
                                          then 'European Environment Agency'
                                          else if ($providerInfo/name != '')
                                          then $providerInfo/name else ."/>
                  </gco:CharacterString>
                </gmd:organisationName>
                <gmd:contactInfo>
                  <gmd:CI_Contact>
                    <gmd:onlineResource>
                      <gmd:CI_OnlineResource>
                        <gmd:linkage>
                          <gmd:URL><xsl:value-of select="."/></gmd:URL>
                        </gmd:linkage>
                      </gmd:CI_OnlineResource>
                    </gmd:onlineResource>
                  </gmd:CI_Contact>
                </gmd:contactInfo>
                <gmd:role>
                  <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                                   codeListValue="processor"/>
                </gmd:role>
              </gmd:CI_ResponsibleParty>
            </gmd:pointOfContact>
          </xsl:for-each>

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
          <xsl:for-each select="foaf:depiction/schema:Image[rdfs:label != 'type_icon']">
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

<!--
          <data:reportingObligations>665</data:reportingObligations>
          <data:reportingObligations>141</data:reportingObligations>
          eg. https://rod.eionet.europa.eu/obligations/665
-->
          <gmd:descriptiveKeywords>
            <gmd:MD_Keywords>
              <xsl:for-each select="data:reportingObligations">
                <xsl:variable name="uri"
                              select="concat('http://rod.eionet.europa.eu/obligations/', .)"/>
                <xsl:variable name="keyword"
                              select="util:getKeywordValueByUri(
                              $uri,
                              'external.theme.rod-eionet-europa-eu',
                              'eng')"/>
                <gmd:keyword>
                  <gmx:Anchor xlink:href="{$uri}">
                    <xsl:value-of select="$keyword"/>
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
                    <gco:CharacterString>Reporting obligations</gco:CharacterString>
                  </gmd:title>
                  <gmd:date>
                    <gmd:CI_Date>
                      <gmd:date>
                        <gco:Date>2021-08-25</gco:Date>
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
                        <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.rod-eionet-europa-eu">geonetwork.thesaurus.external.theme.rod-eionet-europa-eu</gmx:Anchor>
                      </gmd:code>
                    </gmd:MD_Identifier>
                  </gmd:identifier>
                </gmd:CI_Citation>
              </gmd:thesaurusName>
            </gmd:MD_Keywords>
          </gmd:descriptiveKeywords>

          <!--
            <data:eeaManagementPlan xml:lang="en">2019 1.3.7</data:eeaManagementPlan>
          -->
          <xsl:if test="count(data:eeaManagementPlan[. != '']) > 0">
            <gmd:descriptiveKeywords>
              <gmd:MD_Keywords>
                <xsl:for-each select="data:eeaManagementPlan">
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
                      <gco:CharacterString>EEA Management Plan</gco:CharacterString>
                    </gmd:title>
                    <gmd:date>
                      <gmd:CI_Date>
                        <gmd:date>
                          <gco:Date>2021-08-25</gco:Date>
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
                          <gmx:Anchor xlink:href="https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.eea-mp">geonetwork.thesaurus.external.theme.eea-mp</gmx:Anchor>
                        </gmd:code>
                      </gmd:MD_Identifier>
                    </gmd:identifier>
                  </gmd:CI_Citation>
                </gmd:thesaurusName>
              </gmd:MD_Keywords>
            </gmd:descriptiveKeywords>
          </xsl:if>

          <!-- <data:themes>transport</data:themes>-->
          <gmd:descriptiveKeywords>
            <gmd:MD_Keywords>
              <xsl:for-each select="data:themes">
                <gmd:keyword>
                  <xsl:variable name="uri"
                                select="concat('https://www.eea.europa.eu/themes/', .)"/>
                  <xsl:variable name="keyword"
                                select="util:getKeywordValueByUri(
                                $uri,
                                'external.theme.eea-topics',
                                'eng')"/>
                  <gmx:Anchor xlink:href="https://www.eea.europa.eu/themes/{.}">
                    <xsl:value-of select="$keyword"/>
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
              <xsl:for-each select="dcterms:spatial/geo:SpatialThing[dcterms:type = 'independent political entity']/rdfs:label">
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
                <gco:CharacterString>
                  <xsl:value-of select="dcterms:rights"/>
                </gco:CharacterString>
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

              <!-- <data:temporalCoverage>2012</data:temporalCoverage> -->
              <xsl:variable name="start"
                            select="min(data:temporalCoverage)"/>
              <xsl:variable name="end"
                            select="max(data:temporalCoverage)"/>
              <gmd:temporalElement>
                <gmd:EX_TemporalExtent>
                  <gmd:extent>
                    <gml:TimePeriod gml:id="d17964e856a1052958">
                      <gml:beginPosition>
                        <xsl:value-of select="$start"/>
                      </gml:beginPosition>
                      <gml:endPosition>
                        <xsl:value-of select="$end"/>
                      </gml:endPosition>
                    </gml:TimePeriod>
                  </gmd:extent>
                </gmd:EX_TemporalExtent>
              </gmd:temporalElement>
            </gmd:EX_Extent>
          </gmd:extent>

          <!--
          <data:moreInfo xml:lang="en"><![CDATA[<p>Since 2013 the EEA ha
          -->
          <xsl:if test="data:moreInfo[. != ''] or data:geoAccuracy[. != '']">
            <gmd:supplementalInformation>
              <gco:CharacterString>
                <xsl:for-each select="data:moreInfo[. != '']">
                  <xsl:value-of select="util:html2text(., true())"/>
                </xsl:for-each>

                <xsl:for-each select="data:geoAccuracy[. != '']">
                  <xsl:value-of select="util:html2text(.)"/>
                </xsl:for-each>
              </gco:CharacterString>
            </gmd:supplementalInformation>
          </xsl:if>
        </gmd:MD_DataIdentification>
      </gmd:identificationInfo>

      <xsl:variable name="formats" as="node()*">
        <format fileWith=".gml" format="GML"/>
        <format fileWith=".csv" format="ascii (.csv, .txt, .sql)"/>
        <format fileWith="_csv" format="ascii (.csv, .txt, .sql)"/>
        <format fileWith="-csv" format="ascii (.csv, .txt, .sql)"/>
        <format fileWith=".xls" format="Microsoft Excel (.xls, .xlsx)"/>
        <format fileWith="db-excel" format="Microsoft Excel (.xls, .xlsx)"/>
        <format fileWith="xlsx" format="Microsoft Excel (.xls, .xlsx)"/>
        <format fileWith="-xls" format="Microsoft Excel (.xls, .xlsx)"/>
        <format fileWith="gpkg" format="GeoPackage"/>
        <format fileWith=".mdb" format="Microsoft Access (.mdb, .accdb)"/>
        <format fileWith="_mdb" format="Microsoft Access (.mdb, .accdb)"/>
        <format fileWith="access-database" format="Microsoft Access (.mdb, .accdb)"/>
        <format fileWith="microsoft-access-format" format="Microsoft Access (.mdb, .accdb)"/>
        <format fileWith=".dbf" format="dBASE (.dbf)"/>
        <format fileWith=".pdf" format="PDF"/>
        <format fileWith="sqlite" format="SpatiaLite"/>
        <format fileWith="spatialite" format="SpatiaLite"/>
        <format fileWith="tiff" format="GTiff"/>
        <format fileWith="tif-" format="GTiff"/>
        <format fileWith="in_json" format="JSON"/>
        <format fileWith="geodatabase" format="ESRI Personal Geodatabase"/>
        <format fileWith="shapefile" format="ESRI Shapefile"/>
        <format fileWith="shape-file" format="ESRI Shapefile"/>
        <format fileWith="_shp" format="ESRI Shapefile"/>
        <format fileWith="inspire-compliant" format="INSPIRE"/>
      </xsl:variable>

      <xsl:variable name="protocols" as="node()*">
        <protocol fileWith="wms-service" protocol="OGC:WMS"/>
      </xsl:variable>

      <!--
          <dcterms:hasPart rdf:resource="http://www.eea.europa.eu/data-and-maps/data/vans-16/monitoring-vans-co2-emissions_2013f"/>
          <dcterms:hasPart rdf:resource="http://www.eea.europa.eu/data-and-maps/data/vans-16/monitoring-of-co2-emissions-vans-2016-final"/>
      -->
      <xsl:variable name="listOfHasPart">
        <xsl:for-each select="dcterms:hasPart">
          <entry id="{@rdf:resource}">
            <xsl:variable name="part" as="node()">
              <xsl:copy-of select="document(concat(@rdf:resource, '/@@rdf'))"/>
            </xsl:variable>

            <xsl:copy-of select="$part"/>
            <xsl:for-each select="$part/rdf:RDF/datatable:DataTable/dcterms:hasPart">
              <xsl:variable name="file" as="node()">
                <xsl:copy-of select="document(concat(@rdf:resource, '/@@rdf'))"/>
              </xsl:variable>

              <xsl:for-each select="$file/rdf:RDF/datafilelink:DataFileLink">
                <remoteUrl>
                  <xsl:copy-of select="datafilelink:remoteUrl"/>
                  <xsl:copy-of select="dcterms:title"/>
                  <xsl:copy-of select="dcterms:description"/>
                </remoteUrl>
              </xsl:for-each>
            </xsl:for-each>
          </entry>
        </xsl:for-each>
      </xsl:variable>

      <xsl:variable name="transferOptions">

        <xsl:for-each select="$listOfHasPart/entry">
          <xsl:sort select="rdf:RDF/datatable:DataTable/dcterms:title"
                    order="descending"/>
          <xsl:variable name="entry"
                        select="current()"/>
          <xsl:choose>
            <xsl:when test="remoteUrl">
              <xsl:for-each select="remoteUrl">
                <xsl:message>REMOTE URL <xsl:value-of select="datafilelink:remoteUrl"/></xsl:message>
                <gmd:onLine>
                  <gmd:CI_OnlineResource>
                    <xsl:variable name="url"
                                  select="datafilelink:remoteUrl"/>
                    <xsl:variable name="protocol"
                                  select="($protocols[contains($url, @fileWith)]/@protocol)[1]"/>
                    <xsl:variable name="format"
                                  select="($formats[contains($url, @fileWith)]/@format)[1]"/>
                    <gmd:linkage>
                      <gmd:URL><xsl:value-of select="$url"/></gmd:URL>
                    </gmd:linkage>
                    <gmd:protocol>
                      <gco:CharacterString>WWW:LINK</gco:CharacterString>
                    </gmd:protocol>
                    <gmd:name>
                      <gco:CharacterString>
                        <xsl:value-of select="dcterms:title"/>
                      </gco:CharacterString>
                    </gmd:name>
                    <gmd:description>
                      <gco:CharacterString>
                        <xsl:value-of select="if (dcterms:description)
                                              then dcterms:description
                                              else $entry/rdf:RDF/datatable:DataTable/dcterms:description"/>
                      </gco:CharacterString>
                    </gmd:description>

                    <gmd:function>
                      <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                                 codeListValue="information"/>
                    </gmd:function>
                  </gmd:CI_OnlineResource>
                </gmd:onLine>
              </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
              <xsl:for-each select="rdf:RDF/datatable:DataTable/dcterms:hasPart">
                <gmd:onLine>
                  <gmd:CI_OnlineResource>
                    <xsl:message>Parts = <xsl:value-of select="@rdf:resource"/> </xsl:message>

                    <xsl:variable name="url"
                                  select="@rdf:resource"/>
                    <xsl:variable name="protocol"
                                  select="($protocols[contains($url, @fileWith)]/@protocol)[1]"/>
                    <xsl:variable name="format"
                                  select="($formats[contains($url, @fileWith)]/@format)[1]"/>
                    <gmd:linkage>
                      <gmd:URL><xsl:value-of select="$url"/></gmd:URL>
                    </gmd:linkage>
                    <gmd:protocol>
                      <gco:CharacterString><xsl:value-of select="
                        if ($protocol != '') then $protocol
                        else if ($format != '') then 'WWW:DOWNLOAD'
                        else 'WWW:LINK'"/><xsl:value-of select="
                        if ($format != '')
                        then concat(':', $format)
                        else ''"/></gco:CharacterString>
                    </gmd:protocol>
                    <gmd:name>
                      <gco:CharacterString>
                        <xsl:value-of select="$entry/rdf:RDF/datatable:DataTable/dcterms:title"/>
                      </gco:CharacterString>
                    </gmd:name>
                    <xsl:for-each select="$entry/rdf:RDF/datatable:DataTable/dcterms:description">
                      <gmd:description>
                        <gco:CharacterString>
                          <xsl:value-of select="$entry/rdf:RDF/datatable:DataTable/dcterms:description"/>
                        </gco:CharacterString>
                      </gmd:description>
                    </xsl:for-each>

                    <gmd:function>
                      <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                                 codeListValue="download"/>
                    </gmd:function>

                    <xsl:if test="$withFeatureCatalogue">
                      <xsl:copy-of select="$entry/rdf:RDF
                            /datatable:DataTable/datatable:tableDefinition"/>
                    </xsl:if>

                    <!--                <xsl:if test="$entry/rdf:RDF
                                                /datatable:DataTable/datatable:tableDefinition">
                                    <xsl:message><xsl:value-of select="$entry/rdf:RDF/datatable:DataTable/dcterms:title"/>;<xsl:value-of select="@rdf:resource"/>;<xsl:value-of select="$cmsId"/></xsl:message>
                                    </xsl:if>-->
                  </gmd:CI_OnlineResource>
                </gmd:onLine>
              </xsl:for-each>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:for-each>
      </xsl:variable>


      <gmd:distributionInfo>
        <gmd:MD_Distribution>
          <xsl:variable name="dataFormats"
                        select="distinct-values($transferOptions//gmd:protocol/gco:CharacterString[starts-with(., 'WWW:DOWNLOAD:')])"/>
          <xsl:for-each select="$dataFormats">
            <gmd:distributionFormat>
              <gmd:MD_Format>
                <gmd:name gco:nilReason="missing">
                  <gco:CharacterString>
                    <xsl:value-of select="replace(., 'WWW:DOWNLOAD:', '')"/>
                  </gco:CharacterString>
                </gmd:name>
                <gmd:version gco:nilReason="unknown">
                  <gco:CharacterString/>
                </gmd:version>
              </gmd:MD_Format>
            </gmd:distributionFormat>
          </xsl:for-each>
          <xsl:if test="count($dataFormats) = 0">
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
          </xsl:if>
          <gmd:transferOptions>
            <gmd:MD_DigitalTransferOptions>
              <xsl:copy-of select="$transferOptions"/>
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

          <!-- <data:dataSource xml:lang="en"><![CDATA[<p><span>Directorate-General for Climate Action, 2016.</span><br style="margin: 0px; padding: 0px; " /><span>Data are submitted by Member States at: http://cdr.eionet.europa.eu/</span></p>]]></data:dataSource>-->
          <gmd:lineage>
            <gmd:LI_Lineage>
              <gmd:statement>
                <gco:CharacterString>
                  <xsl:for-each select="data:dataSource[. != '']|data:methodology[. != '']">
                    <xsl:value-of select="util:html2text(., true())"/><xsl:text>
                  </xsl:text>
                  </xsl:for-each>
                </gco:CharacterString>
              </gmd:statement>
            </gmd:LI_Lineage>
          </gmd:lineage>
        </gmd:DQ_DataQuality>
      </gmd:dataQualityInfo>
    </gmd:MD_Metadata>
  </xsl:template>
</xsl:stylesheet>
