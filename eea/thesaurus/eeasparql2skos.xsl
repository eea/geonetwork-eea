<xsl:stylesheet version="1.1"
                xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#"
                xmlns:cc="http://creativecommons.org/ns#"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:owl="http://www.w3.org/2002/07/owl#"
                xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
                xmlns:skos="http://www.w3.org/2004/02/skos/core#"
                xmlns:dcterms="http://purl.org/dc/terms/"
                xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
                xmlns:foaf="http://xmlns.com/foaf/0.1/"
                xmlns:sioc="http://rdfs.org/sioc/ns#"
                xmlns:rod="http://rod.eionet.europa.eu/schema.rdf#"
                xmlns:dc="http://purl.org/dc/terms/"
                xmlns:grg="http://www.isotc211.org/schemas/grg/"
                xmlns:void="http://rdfs.org/ns/void#"
                xmlns:gml="http://www.opengis.net/gml#"
                xmlns:sparql="http://www.w3.org/2005/sparql-results#"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output encoding="UTF-8" indent="yes" method="xml"/>

  <xsl:variable name="thesaurusId" select="'http://rdfdata.eionet.europa.eu/amp/ontology/managementPlan'"/>
  <xsl:template match="/">

    <rdf:RDF xmlns:dc="http://purl.org/dc/elements/1.1/"
             xmlns:foaf="http://xmlns.com/foaf/0.1/"
             xmlns:dcterms="http://purl.org/dc/terms/"
             xmlns:skos="http://www.w3.org/2004/02/skos/core#"
             xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">

      <skos:ConceptScheme rdf:about="{$thesaurusId}">
        <dc:title>EEA Management Plan</dc:title>
        <dc:description></dc:description>
        <dcterms:issued>2021-08-25</dcterms:issued>
        <dcterms:modified>2021-08-25</dcterms:modified>
      </skos:ConceptScheme>

      <xsl:for-each select="//sparql:literal">
        <xsl:sort select="." order="descending"/>
        <xsl:apply-templates select="."/>
      </xsl:for-each>
    </rdf:RDF>
  </xsl:template>

  <xsl:template match="sparql:literal" priority="2">
    <skos:Concept rdf:about="http://rdfdata.eionet.europa.eu/amp/ontology/managementPlan/{.}">
      <skos:prefLabel xml:lang="en"><xsl:value-of select="."/></skos:prefLabel>
      <skos:definition xml:lang="en"/>
    </skos:Concept>
  </xsl:template>
</xsl:stylesheet>
