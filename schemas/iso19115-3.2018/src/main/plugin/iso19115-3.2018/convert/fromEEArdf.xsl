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



</xsl:stylesheet>
