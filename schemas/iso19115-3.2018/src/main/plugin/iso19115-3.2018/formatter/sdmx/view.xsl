<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:gco="http://standards.iso.org/iso/19115/-3/gco/1.0"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:message="http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message"
                xmlns:metadata="http://www.SDMX.org/resources/SDMXML/schemas/v2_0/genericmetadata"
                xmlns:util="java:org.fao.geonet.util.XslUtil"
                xmlns:saxon="http://saxon.sf.net/"
                version="2.0"
                exclude-result-prefixes="#all">


  <xsl:output omit-xml-declaration="yes"
              method="xml"
              indent="yes"
              saxon:indent-spaces="2"
              encoding="UTF-8"/>

  <xsl:param name="withSchemaLocation"
             as="xs:string"
             select="'false'"/>

  <xsl:variable name="metadata"
                select="/root/*:MD_Metadata"/>

  <xsl:variable name="metadataUuid"
                as="xs:string"
                select="$metadata/*:metadataIdentifier/*/*:code/*/text()"/>

  <xsl:variable name="language"
                as="xs:string"
                select="'eng'"/>
  <xsl:variable name="dateFormat"
                as="xs:string"
                select="'[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01][ZN]'"/>


  <xsl:template match="/">

    <xsl:variable name="dataProvider"
                  select="($metadata/*:identificationInfo/*/*:pointOfContact/*[*:role/*/@codeListValue = 'pointOfContact'])[1]"/>

    <message:GenericMetadata
      xmlns:message="http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message"
      xmlns:metadata="http://www.SDMX.org/resources/SDMXML/schemas/v2_0/genericmetadata"
      xmlns:common="http://www.SDMX.org/resources/SDMXML/schemas/v2_0/common"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <xsl:if test="$withSchemaLocation = 'true'">
        <xsl:attribute name="xsi:schemaLocation"
                       select="'http://www.SDMX.org/resources/SDMXML/schemas/v2_0/genericmetadata schemas/SDMXGenericMetadata.xsd http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message schemas/SDMXMessage.xsd'"/>
      </xsl:if>

      <message:Header>
        <message:ID>
          <xsl:value-of select="$metadataUuid"/>
        </message:ID>
        <message:Test>false</message:Test>
        <message:Name>
          <xsl:value-of select="$metadata/*:identificationInfo/*/*:citation/*/*:title/gco:CharacterString"/>
        </message:Name>
        <message:Prepared>
          <xsl:value-of select="format-dateTime(current-dateTime(), $dateFormat)"/>
        </message:Prepared>
        <message:Sender id="{util:getNodeId()}">
          <message:Contact>
            <message:Name>
              <xsl:value-of select="util:getNodeName('', $language, true())"/>
            </message:Name>
            <message:URI>
              <xsl:value-of select="util:getSiteUrl()"/>
            </message:URI>
          </message:Contact>
        </message:Sender>
        <message:DataSetID>
          <xsl:variable name="resourceId"
                        as="xs:string*"
                        select="$metadata/*:identificationInfo/*/*:citation/*/*:identifier/*/*:code/gco:CharacterString"/>
          <xsl:value-of select="($resourceId, $metadataUuid)[1]"/>
        </message:DataSetID>
        <message:DataSetAction>
          Replace
        </message:DataSetAction>
        <message:Extracted>
          <xsl:value-of select="format-dateTime(current-dateTime(), $dateFormat)"/>
        </message:Extracted>
        <message:ReportingBegin>
          <xsl:value-of select="format-dateTime(current-dateTime(), $dateFormat)"/>
        </message:ReportingBegin>
        <message:ReportingEnd>
          <xsl:value-of select="format-dateTime(current-dateTime(), $dateFormat)"/>
        </message:ReportingEnd>
        <message:Source>
          <xsl:value-of
            select="($dataProvider/*:party/*:CI_Organisation/*:name/gco:CharacterString/text(), util:getNodeName('', $language, true()))[1]"/>
        </message:Source>
      </message:Header>
      <metadata:MetadataSet>
        <metadata:MetadataStructureRef>ESMSIP2_MSD</metadata:MetadataStructureRef>
        <metadata:MetadataStructureAgencyRef>ESTAT</metadata:MetadataStructureAgencyRef>
        <metadata:ReportRef>ESMSIP_REPORT_V2</metadata:ReportRef>
        <metadata:AttributeValueSet>
          <metadata:TargetRef>FULL_ESMS</metadata:TargetRef>
          <metadata:TargetValues>
            <metadata:ComponentValue component="TIME_PERIOD" object="TimeDimension">
              2024-A0
            </metadata:ComponentValue>
            <metadata:ComponentValue component="DATA_PROVIDER" object="DataProvider">
              <xsl:value-of
                select="($dataProvider/*:party/*:CI_Organisation/*:name/gco:CharacterString/text(), util:getNodeName('', $language, true()))[1]"/>
            </metadata:ComponentValue>
            <metadata:ComponentValue component="DATAFLOW" object="DataFlow">
              SDG_0110IP_A:1.0
            </metadata:ComponentValue>
          </metadata:TargetValues>
          <metadata:ReportedAttribute conceptID="CONTACT">
            <metadata:Value>
              <xsl:value-of select="$dataProvider/*:party/*:CI_Organisation/*:name/gco:CharacterString/text()"/>
            </metadata:Value>
            <metadata:ReportedAttribute conceptID="CONTACT_ORGANISATION">
              <metadata:Value>
                <xsl:value-of select="$dataProvider/*:party/*:CI_Organisation/*:name/gco:CharacterString/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
            <!--<metadata:ReportedAttribute conceptID="ORGANISATION_UNIT">
                <metadata:Value>
                    <xsl:value-of select="$dataProvider/*:organisationName/gco:CharacterString/text()"/>
                </metadata:Value>
            </metadata:ReportedAttribute>-->
            <xsl:for-each select="$dataProvider/*:party/*:CI_Organisation/*:individual/*/*:name">
              <metadata:ReportedAttribute conceptID="CONTACT_NAME">
                <metadata:Value>
                  <xsl:value-of select="gco:CharacterString/text()"/>
                </metadata:Value>
                <metadata:Annotations>
                  <common:Annotation>
                    <common:AnnotationType>RESTRICTED_FOR_PUBLICATION</common:AnnotationType>
                    <common:AnnotationText>YES</common:AnnotationText>
                  </common:Annotation>
                </metadata:Annotations>
              </metadata:ReportedAttribute>
            </xsl:for-each>

            <metadata:ReportedAttribute conceptID="CONTACT_FUNCT">
              <metadata:Value>
                <xsl:value-of select="*:role/*/@codeListValue"/>
              </metadata:Value>
              <metadata:Annotations>
                <common:Annotation>
                  <common:AnnotationType>RESTRICTED_FOR_PUBLICATION</common:AnnotationType>
                  <common:AnnotationText>YES</common:AnnotationText>
                </common:Annotation>
              </metadata:Annotations>
            </metadata:ReportedAttribute>

            <xsl:for-each select="$dataProvider/*:party/*:CI_Organisation/*:contactInfo/*/*:address/*">
              <metadata:ReportedAttribute conceptID="CONTACT_MAIL">
                <metadata:Value>
                  <xsl:value-of select="string-join(*[local-name() != 'electronicMailAddress'], ' ')"/>
                </metadata:Value>
              </metadata:ReportedAttribute>
            </xsl:for-each>

            <xsl:for-each select="$dataProvider//*:electronicMailAddress">
              <metadata:ReportedAttribute conceptID="CONTACT_EMAIL">
                <metadata:Value>
                  <xsl:value-of select="gco:CharacterString/text()"/>
                </metadata:Value>
                <metadata:Annotations>
                  <common:Annotation>
                    <common:AnnotationType>RESTRICTED_FOR_PUBLICATION</common:AnnotationType>
                    <common:AnnotationText>YES</common:AnnotationText>
                  </common:Annotation>
                </metadata:Annotations>
              </metadata:ReportedAttribute>
            </xsl:for-each>
          </metadata:ReportedAttribute>
          <metadata:ReportedAttribute conceptID="META_UPDATE">
            <metadata:Value>
              <xsl:value-of select="$metadata/*:dateInfo/*[*:dateType/*/@codeListValue = 'revision']/*:date/*/text()"/>
            </metadata:Value>
            <metadata:ReportedAttribute conceptID="META_CERTIFIED">
              <metadata:Value>
                <xsl:value-of select="$metadata/*:dateInfo/*[*:dateType/*/@codeListValue = 'revision']/*:date/*/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
            <metadata:ReportedAttribute conceptID="META_POSTED">
              <metadata:Value>
                <xsl:value-of select="$metadata/*:dateInfo/*[*:dateType/*/@codeListValue = 'revision']/*:date/*/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
            <metadata:ReportedAttribute conceptID="META_LAST_UPDATE">
              <metadata:Value>
                <xsl:value-of select="$metadata/*:dateInfo/*[*:dateType/*/@codeListValue = 'revision']/*:date/*/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
          </metadata:ReportedAttribute>

          <xsl:for-each select="$metadata/*:identificationInfo/*/*:supplementalInformation">
            <metadata:ReportedAttribute conceptID="RELEVANCE">
              <metadata:Value>
                <xsl:value-of select="gco:CharacterString/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
          </xsl:for-each>

          <metadata:ReportedAttribute conceptID="INDICATOR">
            <metadata:Value>
              <xsl:value-of select="$metadata/*:identificationInfo/*/*:citation/*/*:title/gco:CharacterString"/>
            </metadata:Value>


            <metadata:ReportedAttribute conceptID="DATA_DESCR">
              <metadata:Value>
                <xsl:value-of select="$metadata/*:identificationInfo/*/*:abstract/gco:CharacterString"/>
              </metadata:Value>
            </metadata:ReportedAttribute>

            <xsl:for-each
              select="$metadata/*:identificationInfo/*/*:descriptiveKeywords[contains(*/*:thesaurusName/*/*:title/*/text(), 'Unit of measure')]/*/*:keyword">
              <metadata:ReportedAttribute conceptID="UNIT_MEASURE">
                <metadata:Value>
                  <xsl:value-of select="(gco:CharacterString|*:Anchor)/text()"/>
                </metadata:Value>
              </metadata:ReportedAttribute>
            </xsl:for-each>

            <xsl:for-each
              select="$metadata/*:identificationInfo/*/*:descriptiveKeywords[contains(*/*:thesaurusName/*/*:title/*/text(), 'Reference period')]/*/*:keyword">
              <metadata:ReportedAttribute conceptID="REF_PERIOD">
                <metadata:Value>
                  <xsl:value-of select="(gco:CharacterString|*:Anchor)/text()"/>
                </metadata:Value>
              </metadata:ReportedAttribute>
            </xsl:for-each>

            <xsl:for-each select="$metadata/*:resourceLineage/*/*:statement">
              <metadata:ReportedAttribute conceptID="ACCURACY_OVERALL">
                <metadata:Value>
                  <xsl:value-of select="gco:CharacterString/text()"/>
                </metadata:Value>
              </metadata:ReportedAttribute>
            </xsl:for-each>

            <xsl:for-each select="$metadata/*:resourceLineage/*/*:source[@xlink:href]">
              <metadata:ReportedAttribute conceptID="SOURCE_TYPE">
                <!-- <metadata:Value></metadata:Value>-->
                <!--<metadata:ReportedAttribute conceptID="SOURCE_TYPE_ORG">
                    <metadata:Value>&lt;p&gt;Filled[SOURCE_TYPE_ORG]&lt;/p&gt;
                    </metadata:Value>
                </metadata:ReportedAttribute>-->
                <metadata:ReportedAttribute conceptID="SOURCE_TYPE_COMMENT">
                  <metadata:Value>
                    <xsl:value-of select="@xlink:title"/>
                    (<xsl:value-of select="@xlink:href"/>)
                  </metadata:Value>
                </metadata:ReportedAttribute>
              </metadata:ReportedAttribute>
            </xsl:for-each>
          </metadata:ReportedAttribute>

          <metadata:ReportedAttribute conceptID="FREQ_TIMELINESS">
            <!-- <xsl:for-each select="$metadata/*:identificationInfo/*/*:resourceMaintenance/*">
                 <xsl:call-template name="sdmx-measure">
                     <xsl:with-param name="baseAttribute" select="'FREQ_DISS'"/>
                     <xsl:with-param name="value" select="*:maintenanceAndUpdateFrequency/*/@codeListValue"/>
                     <xsl:with-param name="description" select="*:maintenanceNote/gco:CharacterString/text()"/>
                 </xsl:call-template>
             </xsl:for-each>-->
            <xsl:variable name="maintenanceNote"
                          select="string-join($metadata/*:identificationInfo/*/*:resourceMaintenance/*/*:maintenanceAndUpdateFrequency/*/@codeListValue, ', ')"/>
            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Frequency of dissemination']">
              <xsl:variable name="frequencyOfDisseminationDesc"
                            select="if ($maintenanceNote)
                                            then concat($maintenanceNote, ' ', *:measure/*/*:measureDescription/gco:CharacterString/text())
                                            else *:measure/*/*:measureDescription/gco:CharacterString/text()"/>

              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'FREQ_DISS'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="$frequencyOfDisseminationDesc"/>
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Timeliness']">
              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'TIMELINESS'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="*:measure/*/*:measureDescription/gco:CharacterString/text()"/>
              </xsl:call-template>
            </xsl:for-each>
          </metadata:ReportedAttribute>


          <metadata:ReportedAttribute conceptID="COVERAGE_COMPARABILITY">
            <metadata:Value></metadata:Value>
            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Reference area']">
              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'REF_AREA'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="*:measure/*/*:measureDescription/gco:CharacterString/text()"/>
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Comparability - geographical']">
              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'COVERAGE_COMPARABILITY'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="*:measure/*/*:measureDescription/gco:CharacterString/text()"/>
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Time coverage']">
              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'COVERAGE_TIME'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="*:measure/*/*:measureDescription/gco:CharacterString/text()"/>
              </xsl:call-template>
            </xsl:for-each>

            <xsl:for-each
              select="$metadata/*:dataQualityInfo/*/*:report/*[*:measure/*/*:nameOfMeasure/gco:CharacterString = 'Comparability - over time']">
              <xsl:call-template name="sdmx-measure">
                <xsl:with-param name="baseAttribute" select="'COMPAR_TIME'"/>
                <xsl:with-param name="value" select="*:result/*/*:value/gco:Record/text()"/>
                <xsl:with-param name="description" select="*:measure/*/*:measureDescription/gco:CharacterString/text()"/>
              </xsl:call-template>
            </xsl:for-each>
          </metadata:ReportedAttribute>


          <xsl:for-each select="$metadata/*:distributionInfo/*/*:transferOptions/*/*:onLine/*">
            <xsl:variable name="protocol"
                          as="xs:string?"
                          select="*:protocol/*/text()"/>
            <metadata:ReportedAttribute conceptID="ACCESSIBILITY_CLARITY">
              <metadata:Value>
                <xsl:value-of select="*:name/*/text()"/>
              </metadata:Value>
              <metadata:ReportedAttribute conceptID="{if (starts-with($protocol, 'WWW-LINK'))
                            then 'PUBLICATIONS'
                            else if (starts-with($protocol, 'EEA:FOLDER') or starts-with($protocol, 'WWW:URL'))
                            then 'ONLINE_DB'
                             else 'COMMENT_DSET'}">
                <metadata:Value>
                  <xsl:value-of select="*:linkage/gco:CharacterString/text()"/>
                </metadata:Value>
              </metadata:ReportedAttribute>
            </metadata:ReportedAttribute>
          </xsl:for-each>

          <xsl:for-each
            select="$metadata/*:identificationInfo/*/*:resourceConstraints/*:MD_LegalConstraints[*:useConstraints]/*:otherConstraints">
            <metadata:ReportedAttribute conceptID="COMMENT_DSET">
              <metadata:Value>
                <xsl:value-of select="gco:CharacterString/text()"/>
              </metadata:Value>
            </metadata:ReportedAttribute>
          </xsl:for-each>
        </metadata:AttributeValueSet>
        <metadata:Annotations>
          <common:Annotation>
            <common:AnnotationType>FOR_PUBLICATION</common:AnnotationType>
            <common:AnnotationText>YES</common:AnnotationText>
          </common:Annotation>
        </metadata:Annotations>
      </metadata:MetadataSet>
    </message:GenericMetadata>
  </xsl:template>

  <xsl:template name="sdmx-measure">
    <xsl:param name="baseAttribute" as="xs:string" select="'TIMELINESS'"/>
    <xsl:param name="value" as="xs:string?"/>
    <xsl:param name="description" as="xs:string?"/>

    <metadata:ReportedAttribute conceptID="{$baseAttribute}">
      <metadata:Value></metadata:Value>
      <metadata:ReportedAttribute conceptID="{$baseAttribute}_GRADE">
        <metadata:Value>
          <xsl:value-of select="$value"/>
        </metadata:Value>
      </metadata:ReportedAttribute>
      <metadata:ReportedAttribute conceptID="{$baseAttribute}_COMMENT">
        <metadata:Value>
          <xsl:value-of select="$description"/>
        </metadata:Value>
      </metadata:ReportedAttribute>
    </metadata:ReportedAttribute>
  </xsl:template>
</xsl:stylesheet>
