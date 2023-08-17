<xsl:stylesheet version="1.1"
                xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                xmlns:skos="http://www.w3.org/2004/02/skos/core#"
                xmlns:dcterms="http://purl.org/dc/terms/"
                xmlns:dc="http://purl.org/dc/terms/"
                xmlns:eea="http://intranet.eea.europa.eu/"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output encoding="UTF-8" indent="yes" method="xml"/>

  <xsl:template match="/">
    <rdf:RDF xmlns:dc="http://purl.org/dc/elements/1.1/"
             xmlns:dcterms="http://purl.org/dc/terms/"
             xmlns:skos="http://www.w3.org/2004/02/skos/core#"
             xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    >

      <skos:ConceptScheme rdf:about="https://applications.eea.europa.eu/ManagementPlan/default.aspx#">
        <dc:title>EEA Management Plan</dc:title>
        <dc:description />
        <dcterms:issued>2021-08-25</dcterms:issued>
        <dcterms:modified>2023-07-12</dcterms:modified>
      </skos:ConceptScheme>
      <xsl:for-each select=".//Table">
        <xsl:sort select="concat(project_year, ' ', project_code)"
                  order="descending"/>
        <xsl:apply-templates select="."/>
      </xsl:for-each>
    </rdf:RDF>
  </xsl:template>

  <xsl:template match="Table" priority="2">
    <skos:Concept rdf:about="{project_url}">
      <skos:prefLabel xml:lang="en"><xsl:value-of select="concat(project_year, ' ', project_code)"/></skos:prefLabel>
      <skos:definition xml:lang="en">
        <xsl:value-of select="project"/>
      </skos:definition>
    </skos:Concept>
  </xsl:template>
</xsl:stylesheet>
