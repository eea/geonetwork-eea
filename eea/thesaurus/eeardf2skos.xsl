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
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output encoding="UTF-8" indent="yes" method="xml"/>

  <xsl:variable name="thesaurusId" select="'https://rod.eionet.europa.eu/obligations'"/>
  <xsl:template match="/">

    <rdf:RDF xmlns:dc="http://purl.org/dc/elements/1.1/"
             xmlns:foaf="http://xmlns.com/foaf/0.1/"
             xmlns:dcterms="http://purl.org/dc/terms/"
             xmlns:skos="http://www.w3.org/2004/02/skos/core#"
             xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">

      <skos:ConceptScheme rdf:about="{$thesaurusId}">
        <dc:title>Reporting obligations</dc:title>
        <dc:description></dc:description>
        <dcterms:issued>2023-02-06</dcterms:issued>
        <dcterms:modified>2023-02-06</dcterms:modified>
      </skos:ConceptScheme>

      <xsl:apply-templates select=".//rod:Obligation"/>
    </rdf:RDF>
  </xsl:template>

  <xsl:template match="rod:Obligation" priority="2">
    <skos:Concept rdf:about="http://rod.eionet.europa.eu/{@rdf:about}">
      <skos:prefLabel xml:lang="en"><xsl:value-of select="dcterms:title"/></skos:prefLabel>
      <skos:definition xml:lang="en">
        <xsl:value-of select="rod:guidelines"/>
        <xsl:value-of select="rod:comment"/>
      </skos:definition>
    </skos:Concept>
  </xsl:template>
</xsl:stylesheet>
