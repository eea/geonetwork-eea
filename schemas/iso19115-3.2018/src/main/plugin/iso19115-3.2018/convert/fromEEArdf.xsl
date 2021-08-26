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
                xmlns:mrc="http://standards.iso.org/iso/19115/-3/mrc/1.0"
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
                version="2.0"
                exclude-result-prefixes="#all">

  <xsl:include href="../../iso19139/convert/fromEEArdf.xsl"/>
  <xsl:include href="ISO19139/fromISO19139.xsl"/>

  <xsl:template match="/">
    <xsl:variable name="iso19139">
      <xsl:apply-templates select="//data:Data"/>
    </xsl:variable>

    <xsl:for-each select="$iso19139/gmd:MD_Metadata">
      <xsl:variable name="nameSpacePrefix">
        <xsl:call-template name="getNamespacePrefix"/>
      </xsl:variable>

      <xsl:element name="mdb:MD_Metadata">
        <!-- new namespaces -->
        <xsl:call-template name="add-iso19115-3.2018-namespaces"/>

        <xsl:apply-templates select="gmd:fileIdentifier" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:language" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:characterSet" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:parentIdentifier" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:hierarchyLevel" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:contact" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:dateStamp" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:metadataStandardName" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:locale" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:spatialRepresentationInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:referenceSystemInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:metadataExtensionInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:identificationInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:contentInfo" mode="from19139to19115-3.2018"/>

        <xsl:call-template name="buildFeatureCatalogue">
          <xsl:with-param name="tableDefinitions"
                          select="$iso19139/gmd:MD_Metadata//datatable:tableDefinition"/>
        </xsl:call-template>

        <xsl:call-template name="onlineSourceDispatcher">
          <xsl:with-param name="type" select="'featureCatalogueCitation'"/>
        </xsl:call-template>

        <xsl:apply-templates select="gmd:distributionInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:dataQualityInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:portrayalCatalogueInfo" mode="from19139to19115-3.2018"/>
        <xsl:call-template name="onlineSourceDispatcher">
          <xsl:with-param name="type" select="'portrayalCatalogueCitation'"/>
        </xsl:call-template>

        <xsl:apply-templates select="gmd:metadataConstraints" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:applicationSchemaInfo" mode="from19139to19115-3.2018"/>
        <xsl:apply-templates select="gmd:metadataMaintenance" mode="from19139to19115-3.2018"/>
      </xsl:element>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="buildFeatureCatalogue">
    <xsl:param name="tableDefinitions"/>

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

    <xsl:for-each-group select="$tableDefinitions"
                      group-by=".">
      <xsl:choose>
        <xsl:when test="position() = 1">
          <xsl:variable name="columns"
                        select="saxon:parse(.)"/>
          <!--
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

          <xsl:variable name="typeColumnPosition"
                        select="$columns//thead/tr/th[lower-case(.) = 'data type']/count(preceding-sibling::th)"/>
          <xsl:variable name="noteColumnPosition"
                        select="$columns//thead/tr/th[lower-case(.) = 'note']/count(preceding-sibling::th)"/>
          <xsl:variable name="cardinalityColumnPosition"
                        select="$columns//thead/tr/th[lower-case(.) = 'primary key']/count(preceding-sibling::th)"/>

          <mdb:contentInfo>
            <mrc:MD_FeatureCatalogue>
              <mrc:featureCatalogue>
                <gfc:FC_FeatureCatalogue>
                  <gfc:producer/>
                  <gfc:featureType>
                    <gfc:FC_FeatureType>
                      <gfc:typeName>Table definition</gfc:typeName>
                      <gfc:isAbstract>
                        <gco:Boolean>false</gco:Boolean>
                      </gfc:isAbstract>
                      <xsl:for-each select="$columns//tbody/tr">
                        <gfc:carrierOfCharacteristics>
                          <gfc:FC_FeatureAttribute>
                            <gfc:memberName>
                              <xsl:value-of select="td[1]"/>
                            </gfc:memberName>
                            <gfc:definition>
                              <gco:CharacterString>
                                <xsl:value-of select="td[2]"/>
                              </gco:CharacterString>
                            </gfc:definition>
                            <gfc:cardinality>
                              <gco:CharacterString>
                                <xsl:value-of select="if (td[$cardinalityColumnPosition + 1] = 'Yes') then '1..1' else '0..1'"/>
                              </gco:CharacterString>
                            </gfc:cardinality>
                            <xsl:if test="$noteColumnPosition">
                              <gfc:designation>
                                <gco:CharacterString>
                                  <xsl:value-of select="td[$noteColumnPosition + 1]"/>
                                </gco:CharacterString>
                              </gfc:designation>
                            </xsl:if>
                            <gfc:valueMeasurementUnit>
                              <gco:UomIdentifier/>
                            </gfc:valueMeasurementUnit>
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
                    </gfc:FC_FeatureType>
                  </gfc:featureType>
                </gfc:FC_FeatureCatalogue>
              </mrc:featureCatalogue>
            </mrc:MD_FeatureCatalogue>
          </mdb:contentInfo>
        </xsl:when>
      </xsl:choose>

    </xsl:for-each-group>
  </xsl:template>


</xsl:stylesheet>
