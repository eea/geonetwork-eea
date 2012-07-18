<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE document [ 
<!ENTITY mdash  "&#8212;">
<!ENTITY  head SYSTEM 'http://www.eea.europa.eu/templates/v2/getRequiredHead'> 
<!ENTITY  footer SYSTEM 'http://www.eea.europa.eu/templates/v2/getFooter'> 
<!ENTITY  header SYSTEM 'http://www.eea.europa.eu/templates/v2/getHeader'> 
]>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:exslt="http://exslt.org/common">
  
  <xsl:template name="eea-head">
      <xsl:variable name="xhtml">&head;</xsl:variable>
      <xsl:variable name="head" select="exslt:node-set($xhtml)"/>
      <xsl:copy-of select="$xhtml/head/*[name()!='base']"/>
  </xsl:template>

  <xsl:template name="eea-footer">
      &footer;
  </xsl:template>

  <xsl:template name="eea-header">
      &header;
  </xsl:template>

</xsl:stylesheet>
