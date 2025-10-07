<xsl:stylesheet version="2.0"
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
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                exclude-result-prefixes="#all">

  <xsl:output encoding="UTF-8" indent="yes" method="xml"/>

  <xsl:variable name="thesaurusId" select="'https://rod.eionet.europa.eu/obligations'"/>
  <xsl:template match="/">

    <rdf:RDF xmlns:dc="http://purl.org/dc/elements/1.1/"
             xmlns:foaf="http://xmlns.com/foaf/0.1/"
             xmlns:dcterms="http://purl.org/dc/terms/"
             xmlns:skos="http://www.w3.org/2004/02/skos/core#"
             xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
             xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">

      <skos:ConceptScheme rdf:about="http://data.europa.eu/r5r/applicableLegislation">
        <dc:title xml:lang="en">EU applicable legislations</dc:title>
        <dc:title xml:lang="fr">Législations applicables dans l'UE</dc:title>
        <dcterms:issued>2025-10-01</dcterms:issued>
        <dcterms:modified>2025-10-01</dcterms:modified>
      </skos:ConceptScheme>


      <skos:Concept rdf:about="http://data.europa.eu/eli/reg_impl/2023/138/oj">
        <skos:scopeNote xml:lang="en">Commission Implementing Regulation (EU) 2023/138 of 21 December 2022 laying down a list of specific high-value datasets and the arrangements for their publication and re-use</skos:scopeNote>
        <skos:scopeNote xml:lang="fr">Règlement d’exécution (UE) 2023/138 de la Commission du 21 décembre 2022 établissant une liste d’ensembles de données de forte valeur spécifiques et les modalités de leur publication et de leur réutilisation</skos:scopeNote>
      </skos:Concept>
      <xsl:apply-templates select=".//rod:Instrument"/>
    </rdf:RDF>
  </xsl:template>

  <xsl:template match="rod:Instrument" priority="2">
  <!--    <instrumentURL rdf:resource="http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=CELEX:32001D0839:EN:NOT"/>-->

    <xsl:variable name="url" select="rod:instrumentURL/@rdf:resource"/>
    <xsl:variable name="celex" select="replace($url,
            '.*uri=CELEX(:|%3A)(\d{5}[A-Z]\d{4}).*',
            '$2', 'i')"/>

    <xsl:variable name="year" select="substring($celex, 2, 4)"/>
    <xsl:variable name="type-code" select="substring($celex, 6, 1)"/>
    <xsl:variable name="number" select="substring($celex, 7, 4)"/>

    <xsl:variable name="eli-type">
      <xsl:choose>
        <xsl:when test="$type-code = 'R'">reg</xsl:when>
        <xsl:when test="$type-code = 'L'">dir</xsl:when>
        <xsl:when test="$type-code = 'D'">dec</xsl:when>
        <xsl:otherwise>act</xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="eli-url" select="concat(
                'http://data.europa.eu/eli/',
                $eli-type,
                '/',
                $year,
                '/',
                number($number),
                '/oj'
            )"/>

    <xsl:message>=<xsl:value-of select="$url"/> = <xsl:value-of select="$celex"/> = <xsl:value-of select="$eli-url"/></xsl:message>

    <skos:Concept>
      <xsl:attribute name="rdf:about">
        <xsl:choose>
          <xsl:when test="not(starts-with($celex, 'http'))"><xsl:value-of select="$eli-url"/></xsl:when>
          <xsl:otherwise><xsl:value-of select="$url"/></xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <skos:prefLabel xml:lang="en"><xsl:value-of select="dcterms:title"/></skos:prefLabel>
      <skos:definition xml:lang="en">
        <xsl:value-of select="dcterms:abstract"/>
      </skos:definition>
    </skos:Concept>
  </xsl:template>
</xsl:stylesheet>
