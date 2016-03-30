<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:geonet="http://www.fao.org/geonetwork"
                xmlns:gco="http://www.isotc211.org/2005/gco"
                xmlns:gmd="http://www.isotc211.org/2005/gmd"
                xmlns:srv="http://www.isotc211.org/2005/srv"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:gn-fn-iso19139="http://geonetwork-opensource.org/xsl/functions/profiles/iso19139"
                version="2.0" exclude-result-prefixes="#all">

  <xsl:import href="../../iso19139/process/process-utility.xsl"/>

  <!-- i18n information -->
  <xsl:variable name="add-thumbnail-based-on-uuid-loc">
    <msg id="a" xml:lang="eng">Current record does not have overview. Add the
      following as overview URL:
    </msg>
    <msg id="a" xml:lang="fre">Cette fiche ne contient pas d'aperçu pour la
      ressource. Ajouter l'URL suivante :
    </msg>
  </xsl:variable>

  <xsl:param name="thumbnail-base-url"
             select="'http://sdi.eea.europa.eu/public/catalogue-graphic-overview/'"/>


  <xsl:template name="list-add-thumbnail-based-on-uuid">
    <suggestion process="add-thumbnail-based-on-uuid"/>
  </xsl:template>


  <!-- Analyze the metadata record and return available suggestion
    for that process -->
  <xsl:template name="analyze-add-thumbnail-based-on-uuid">
    <xsl:param name="root"/>
    <xsl:variable name="hasOverview"
                  select="count($root//gmd:identificationInfo/*/
                            gmd:graphicOverview[
                                normalize-space(gmd:fileName/gco:CharacterString) != ''])
                                 > 0"/>

    <xsl:variable name="code"
                  select="gn-fn-iso19139:thumbnail-based-on-uuid-generate($root/*/gmd:fileIdentifier/gco:CharacterString)"/>
    <xsl:if test="not($hasOverview)">
      <suggestion process="add-thumbnail-based-on-uuid" id="{generate-id()}"
                  category="identification" target="identification">
        <name>
          <xsl:value-of
                  select="geonet:i18n($add-thumbnail-based-on-uuid-loc, 'a', $guiLang)"/><xsl:text> </xsl:text><xsl:value-of
                select="$code"/>.
        </name>
        <operational>true</operational>
        <params>{ thumbnail-base-url:{type:'string', defaultValue:'<xsl:value-of select="$thumbnail-base-url"/>'}}</params>
      </suggestion>
    </xsl:if>

  </xsl:template>


  <!-- Do a copy of every nodes and attributes -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Remove geonet:* elements. -->
  <xsl:template match="geonet:*" priority="2"/>

  <xsl:function name="gn-fn-iso19139:thumbnail-based-on-uuid-generate"
                as="xs:string">
    <xsl:param name="fileIdentifier" as="xs:string"/>
    <xsl:value-of
            select="concat($thumbnail-base-url, $fileIdentifier, '.png')"/>
  </xsl:function>

  <xsl:template
          match="gmd:identificationInfo/*"
          priority="2">

    <xsl:copy>
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates select="gmd:citation"/>
      <xsl:apply-templates select="gmd:abstract"/>
      <xsl:apply-templates select="gmd:purpose"/>
      <xsl:apply-templates select="gmd:credit"/>
      <xsl:apply-templates select="gmd:status"/>
      <xsl:apply-templates select="gmd:pointOfContact"/>
      <xsl:apply-templates select="gmd:resourceMaintenance"/>
      <xsl:apply-templates
              select="gmd:graphicOverview[not(gmd:MD_BrowseGraphic/gmd:fileDescription) or gmd:MD_BrowseGraphic/gmd:fileDescription/gco:CharacterString != /root/env/type]"/>

      <gmd:graphicOverview>
        <gmd:MD_BrowseGraphic>
          <gmd:fileName>
            <gco:CharacterString>
              <xsl:value-of select="gn-fn-iso19139:thumbnail-based-on-uuid-generate(
                                        ../../gmd:fileIdentifier/gco:CharacterString)"/>
            </gco:CharacterString>
          </gmd:fileName>
        </gmd:MD_BrowseGraphic>
      </gmd:graphicOverview>

      <xsl:apply-templates select="gmd:resourceFormat"/>
      <xsl:apply-templates select="gmd:descriptiveKeywords"/>
      <xsl:apply-templates select="gmd:resourceSpecificUsage"/>
      <xsl:apply-templates select="gmd:resourceConstraints"/>
      <xsl:apply-templates select="gmd:aggregationInfo"/>
      <xsl:apply-templates select="gmd:spatialRepresentationType"/>
      <xsl:apply-templates select="gmd:spatialResolution"/>
      <xsl:apply-templates select="gmd:language"/>
      <xsl:apply-templates select="gmd:characterSet"/>
      <xsl:apply-templates select="gmd:topicCategory"/>
      <xsl:apply-templates select="gmd:environmentDescription"/>
      <xsl:apply-templates select="gmd:extent"/>
      <xsl:apply-templates select="gmd:supplementalInformation"/>
      <xsl:apply-templates select="srv:*"/>
    </xsl:copy>
  </xsl:template>

</xsl:stylesheet>
