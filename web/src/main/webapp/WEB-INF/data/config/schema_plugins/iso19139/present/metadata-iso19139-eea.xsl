<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gts="http://www.isotc211.org/2005/gts"
  xmlns:gco="http://www.isotc211.org/2005/gco" xmlns:gmx="http://www.isotc211.org/2005/gmx"
  xmlns:srv="http://www.isotc211.org/2005/srv" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:gml="http://www.opengis.net/gml" xmlns:xlink="http://www.w3.org/1999/xlink"
  xmlns:geonet="http://www.fao.org/geonetwork" xmlns:exslt="http://exslt.org/common"
  exclude-result-prefixes="#all">

  <xsl:variable name="eea-mapviewer"
    >https://sdi.eea.europa.eu/eea/databrowser/?uuid=</xsl:variable>
  <xsl:variable name="eea-webdav">https://sdi.eea.europa.eu/data</xsl:variable>
  <xsl:variable name="eea-cifs">\\sdi.eea.europa.eu\data</xsl:variable>
  <xsl:variable name="eea-ftps">ftps://sdi.eea.europa.eu/data</xsl:variable>
  <xsl:variable name="max-length">20</xsl:variable>

  <!--
		Overrides template to control simple view mode relation block
		having EEA:FILETYPE protocol.
		Display WEBDAV, CIFS and MapViewer links.
	-->
  <xsl:template mode="relatedResources" match="gmd:distributionInfo" priority="2">
    <table class="related">
      <tbody>
        <tr style="display:none;">
          <!-- FIXME needed by JS to append other type of relation from xml.relation service -->
          <td class="main"/>
          <td/>
        </tr>
        <xsl:for-each-group
          select="descendant::gmd:onLine[gmd:CI_OnlineResource/gmd:linkage/gmd:URL!='']"
          group-by="gmd:CI_OnlineResource/gmd:protocol">
          <tr>
            <td class="main">
              <!-- Usually, protocole format is OGC:WMS-version-blahblah, remove ':' and get
								prefix of the protocol to set the CSS icon class-->
              <span class="{translate(substring-before(current-grouping-key(), '-'), ':', '')} icon">
                <xsl:value-of
                  select="/root/gui/strings/protocolChoice[@value=normalize-space(current-grouping-key())]"
                />
              </span>
            </td>
            <td>
              <ul>
                  <xsl:for-each select="current-group()">
                    <xsl:variable name="desc">
                      <xsl:apply-templates mode="localised"
                        select="gmd:CI_OnlineResource/gmd:description">
                        <xsl:with-param name="langId" select="$langId"/>
                      </xsl:apply-templates>
                    </xsl:variable>

                    <xsl:choose>
                      <xsl:when
                        test="contains(current-grouping-key(), 'EEA:FILEPATH') 
                              or contains(current-grouping-key(), 'EEA:FOLDERPATH')
                              or contains(current-grouping-key(), 'EEA:DBPG')">
                        <xsl:variable name="label">
                          <xsl:choose>
                            <xsl:when test="normalize-space($desc)!=''">
                              <xsl:value-of select="$desc"/>
                            </xsl:when>
                            <xsl:when
                              test="normalize-space(gmd:CI_OnlineResource/gmd:name/gco:CharacterString)!=''">
                              <xsl:value-of
                                select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString"/>
                            </xsl:when>
                            <xsl:otherwise>
                              <xsl:value-of select="if (string-length(gmd:CI_OnlineResource/gmd:linkage/gmd:URL) > $max-length and not(contains(current-grouping-key(), 'EEA:DBPG'))) 
                                                    then concat(substring(gmd:CI_OnlineResource/gmd:linkage/gmd:URL, 0, $max-length), '...') 
                                                    else gmd:CI_OnlineResource/gmd:linkage/gmd:URL"/>
                            </xsl:otherwise>
                          </xsl:choose>
                        </xsl:variable>

                        <!-- Do not display mapviewer link when mdb or gdb files -->
                        <xsl:if
                          test="not(ends-with(gmd:CI_OnlineResource/gmd:linkage/gmd:URL, '.mdb'))
                          and not(ends-with(gmd:CI_OnlineResource/gmd:linkage/gmd:URL, '.gdb'))
                          and not(contains(current-grouping-key(), 'EEA:FOLDERPATH'))">
                            <li>
                              <a target="_blank" class="md-mn addLayer" href="{concat($eea-mapviewer, //geonet:info/uuid)}"><xsl:value-of
                                  select="$label"/> (mapviewer)</a>
                            </li>
                        </xsl:if>
                        
                        <xsl:if test="contains(current-grouping-key(), 'EEA:FILEPATH') or
                          contains(current-grouping-key(), 'EEA:FOLDERPATH')">
                          <li>
                            <a target="_blank" class="md-mn md-mn-webdav with-tooltip"
                              href="{concat($eea-webdav, gmd:CI_OnlineResource/gmd:linkage/gmd:URL)}"
                                ><xsl:value-of select="$label"/> (webdav)</a>
                          </li>
                          <li>
                            <a target="_blank" class="md-mn md-mn-cifs with-tooltip" href="{concat($eea-cifs, gmd:CI_OnlineResource/gmd:linkage/gmd:URL)}"
                                ><xsl:value-of select="$label"/> (cifs)</a>
                          </li>
                          <li>
                            <a target="_blank" class="md-mn md-mn-ftps with-tooltip" href="{concat($eea-ftps, gmd:CI_OnlineResource/gmd:linkage/gmd:URL)}"
                              ><xsl:value-of select="$label"/> (ftps)</a>
                          </li>
                        </xsl:if>

                      </xsl:when>
                      <xsl:otherwise>
                        <li>
                          <a href="{gmd:CI_OnlineResource/gmd:linkage/gmd:URL}">
                            <xsl:choose>
                              <xsl:when
                                test="contains(current-grouping-key(), 'OGC') 
  															or contains(current-grouping-key(), 'DOWNLOAD')">
                                <!-- Name contains layer, feature type, coverage ... -->
                                <xsl:choose>
                                  <xsl:when test="normalize-space($desc)!=''">
                                    <xsl:value-of select="$desc"/>
                                    <xsl:if
                                      test="gmd:CI_OnlineResource/gmd:name/gmx:MimeFileType/@type">
                                        (<xsl:value-of
                                        select="gmd:CI_OnlineResource/gmd:name/gmx:MimeFileType/@type"
                                      />) </xsl:if>
                                  </xsl:when>
                                  <xsl:when
                                    test="normalize-space(gmd:CI_OnlineResource/gmd:name/gco:CharacterString)!=''">
                                    <xsl:value-of
                                      select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString"/>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:value-of select="gmd:CI_OnlineResource/gmd:linkage/gmd:URL"
                                    />
                                  </xsl:otherwise>
                                </xsl:choose>
                              </xsl:when>
                              <xsl:otherwise>
                                <xsl:if test="normalize-space($desc)!=''">
                                  <xsl:attribute name="title">
                                    <xsl:value-of select="$desc"/>
                                  </xsl:attribute>
                                </xsl:if>
                                <xsl:choose>
                                  <xsl:when
                                    test="normalize-space(gmd:CI_OnlineResource/gmd:name/gco:CharacterString)!=''">
                                    <xsl:value-of
                                      select="gmd:CI_OnlineResource/gmd:name/gco:CharacterString"/>
                                  </xsl:when>
                                  <xsl:otherwise>
                                    <xsl:value-of select="gmd:CI_OnlineResource/gmd:linkage/gmd:URL"
                                    />
                                  </xsl:otherwise>
                                </xsl:choose>
                              </xsl:otherwise>
                            </xsl:choose>
                          </a>

                          <!-- Display add to map action for WMS -->
                          <xsl:if test="contains(current-grouping-key(), 'WMS')"> &#160; <a href="#"
                              class="md-mn addLayer"
                              onclick="app.switchMode('1', true);app.getIMap().addWMSLayer([[
  														'{gmd:CI_OnlineResource/gmd:description/gco:CharacterString}', 
  														'{gmd:CI_OnlineResource/gmd:linkage/gmd:URL}', 
  														'{gmd:CI_OnlineResource/gmd:name/gco:CharacterString}', '{generate-id()}']]);"
                              >&#160;</a>
                          </xsl:if>
                        </li>
                      </xsl:otherwise>
                    </xsl:choose>
                  </xsl:for-each>
              </ul>
            </td>
          </tr>
        </xsl:for-each-group>
      </tbody>
    </table>
  </xsl:template>


  <!--
		Template to control view mode / distribution section / element onlineResource
		having EEA:FILETYPE protocol.
		Display WEBDAV, CIFS and MapViewer links.
		-->
  <xsl:template mode="iso19139"
    match="gmd:CI_OnlineResource[gmd:protocol/gco:CharacterString='EEA:FILEPATH'
		          or gmd:protocol/gco:CharacterString='EEA:DBPG']"
    priority="3">
    <xsl:param name="schema"/>
    <xsl:param name="edit"/>
    <xsl:choose>
      <xsl:when test="$edit = true()">
        <xsl:apply-templates mode="iso19139EditOnlineRes" select=".">
          <xsl:with-param name="schema" select="$schema"/>
        </xsl:apply-templates>
      </xsl:when>
      <xsl:otherwise>

        <xsl:variable name="linkage" select="gmd:linkage/gmd:URL"/>
        <xsl:variable name="name" select="normalize-space(gmd:name/gco:CharacterString)"/>
        <xsl:variable name="desc" select="normalize-space(gmd:description/gco:CharacterString)"/>
        <xsl:variable name="label">
          <xsl:choose>
            <xsl:when test="normalize-space($desc)!=''">
              <xsl:value-of select="$desc"/>
            </xsl:when>
            <xsl:when test="normalize-space($name)!=''">
              <xsl:value-of select="$name"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="$linkage"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:variable>

        <xsl:apply-templates mode="simpleElement" select=".">
          <xsl:with-param name="schema" select="$schema"/>
          <xsl:with-param name="title"
            select="/root/gui/schemas/iso19139/labels/element[@name = 'gmd:CI_OnlineResource']/label"/>
          <xsl:with-param name="text">
            <xsl:if
              test="not(ends-with($linkage, '.mdb'))
              and not(ends-with($linkage, '.gdb'))">
              <a href="{concat($eea-mapviewer, //geonet:info/uuid)}" title="mapviewer">
                <xsl:value-of select="$label"/> (mapviewer) </a>
            </xsl:if>
            
            <xsl:if test="gmd:protocol/gco:CharacterString='EEA:FILEPATH'">
              <br/>
              <a href="{concat($eea-webdav, $linkage)}" title="webdav">
                <xsl:value-of select="$label"/> (webdav) </a>
              <br/>
              <a href="{concat($eea-cifs, $linkage)}" title="cifs">
                <xsl:value-of select="$label"/> (cifs) </a>
              <br/>
            </xsl:if>
          </xsl:with-param>
        </xsl:apply-templates>

      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
