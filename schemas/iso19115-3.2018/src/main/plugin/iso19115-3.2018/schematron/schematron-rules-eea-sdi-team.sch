<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron"
            xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!--
  Guideline
  https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines
  -->

  <sch:title xmlns="http://www.w3.org/2001/XMLSchema">EEA SDI team checks</sch:title>
  <sch:ns prefix="gml" uri="http://www.opengis.net/gml/3.2"/>
  <sch:ns prefix="srv" uri="http://standards.iso.org/iso/19115/-3/srv/2.0"/>
  <sch:ns prefix="cit" uri="http://standards.iso.org/iso/19115/-3/cit/2.0"/>
  <sch:ns prefix="gex" uri="http://standards.iso.org/iso/19115/-3/gex/1.0"/>
  <sch:ns prefix="mco" uri="http://standards.iso.org/iso/19115/-3/mco/1.0"/>
  <sch:ns prefix="mdb" uri="http://standards.iso.org/iso/19115/-3/mdb/2.0"/>
  <sch:ns prefix="mex" uri="http://standards.iso.org/iso/19115/-3/mex/1.0"/>
  <sch:ns prefix="mmi" uri="http://standards.iso.org/iso/19115/-3/mmi/1.0"/>
  <sch:ns prefix="gmw" uri="http://standards.iso.org/iso/19115/-3/gmw/1.0"/>
  <sch:ns prefix="mrc" uri="http://standards.iso.org/iso/19115/-3/mrc/2.0"/>
  <sch:ns prefix="mrd" uri="http://standards.iso.org/iso/19115/-3/mrd/1.0"/>
  <sch:ns prefix="mri" uri="http://standards.iso.org/iso/19115/-3/mri/1.0"/>
  <sch:ns prefix="mrl" uri="http://standards.iso.org/iso/19115/-3/mrl/2.0"/>
  <sch:ns prefix="mrs" uri="http://standards.iso.org/iso/19115/-3/mrs/1.0"/>
  <sch:ns prefix="mcc" uri="http://standards.iso.org/iso/19115/-3/mcc/1.0"/>
  <sch:ns prefix="lan" uri="http://standards.iso.org/iso/19115/-3/lan/1.0"/>
  <sch:ns prefix="gco" uri="http://standards.iso.org/iso/19115/-3/gco/1.0"/>
  <sch:ns prefix="gcx" uri="http://standards.iso.org/iso/19115/-3/gcx/1.0"/>
  <sch:ns prefix="geonet" uri="http://www.fao.org/geonetwork"/>
  <sch:ns prefix="xlink" uri="http://www.w3.org/1999/xlink"/>
  <sch:ns prefix="xsi" uri="http://www.w3.org/2001/XMLSchema"/>


  <sch:pattern>
    <sch:title>$loc/strings/EEAmetadata.title</sch:title>
    <sch:rule context="//mdb:MD_Metadata">

      <!-- MD_Metadata/fileIdentifier. Is mandatory for EEA.
      This element is populated when a record is created and
      can not be removed in GeoNetwork and as such is mandatory by default.
      -->
      <sch:let name="id"
               value="mdb:metadataIdentifier/*/mcc:code/gco:CharacterString"/>

      <!-- Not empty check. -->
      <sch:assert test="normalize-space($id) != ''"><sch:value-of
        select="$loc/strings/EEAfileIdentifier.error"/></sch:assert>
      <sch:report test="normalize-space($id) != ''"><sch:value-of
        select="$loc/strings/EEAfileIdentifier.report"/> "<sch:value-of
        select="normalize-space($id)"/>"</sch:report>


      <!-- MD_Metadata/language. Is mandatory for EEA (ISO and INSPIRE).
        Check is done for ISO https://github.com/eea/geonetwork-eea/blob/eea-3.4.3/schemas/iso19139/src/main/plugin/iso19139/schematron/schematron-rules-iso.sch#L538
        and for INSPIRE (one of EU language) https://github.com/eea/geonetwork-eea/blob/eea-3.4.3/schemas/iso19139/src/main/plugin/iso19139/schematron/schematron-rules-inspire.disabled.sch#L675
        -->
      <sch:let name="lang"
               value="mdb:defaultLocale/*/lan:language/*/@codeListValue"/>

      <!-- Not empty check. -->
      <sch:assert test="normalize-space($lang) != ''"><sch:value-of
        select="$loc/strings/EEAmdLanguage.error"/></sch:assert>
      <sch:report test="normalize-space($lang) != ''"><sch:value-of
        select="$loc/strings/EEAmdLanguage.report"/> "<sch:value-of
        select="normalize-space($lang)"/>"</sch:report>



      <!-- MD_Metadata/characterSet. Is mandatory for EEA.
      https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatacharacterSet

      No validation rule defined for that because the template
      define a default value and the EEA editor does not allow
      to remove it.
      -->
      <sch:let name="cset"
               value="mdb:defaultLocale/*/lan:characterEncoding/*/@codeListValue"/>

      <!-- Not empty check. -->
      <sch:assert test="normalize-space($cset) != ''"><sch:value-of
        select="$loc/strings/EEAmdCharacterSet.error"/></sch:assert>
      <sch:report test="normalize-space($cset) != ''"><sch:value-of
        select="$loc/strings/EEAmdCharacterSet.report"/> "<sch:value-of
        select="normalize-space($cset)"/>"</sch:report>




      <!-- MD_Metadata/parentIdentifier. Is conditional for EEA.
      https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataparentIdentifier

      Wiki to be updated to reflect the change of using the aggregationInfo
      instead of parentIdentifier (see https://taskman.eionet.europa.eu/issues/96303).
      No validation rule to implement as the creation of the link can only be
      defined by the metadata author.
      -->
      <sch:let name="parentIdentifier"
               value="mdb:parentIdentifier/gco:CharacterString"/>

      <sch:report test="normalize-space($parentIdentifier) = ''"><sch:value-of
        select="$loc/strings/EEAparentIdentifier.report"/></sch:report>



      <!-- MD_Metadata/dateStamp. Is mandatory for EEA.
      This element is populated when a record is updated and
      can not be removed in GeoNetwork and as such is mandatory by default.
      -->
      <sch:let name="ds"
               value="mdb:dateInfo/*[cit:dateType/*/@codeListValue = 'revision']/cit:date/gco:DateTime"/>

      <sch:report test="normalize-space($ds) != ''"><sch:value-of
        select="$loc/strings/EEAdateStamp.report"/> "<sch:value-of
        select="normalize-space($ds)"/>"</sch:report>

      <!-- MD_Metadata/metadataStandardName. Is mandatory for EEA.
           MD_Metadata/metadataStandardVersion. Is mandatory for EEA.

      No validation rule defined for that because the template
      define a default value and the EEA editor does not allow
      to remove it.
      -->
      <sch:let name="sn"
               value="mdb:metadataStandard/*/cit:title/gco:CharacterString"/>

      <sch:let name="snv"
               value="mdb:metadataStandard/*/cit:edition/gco:CharacterString"/>

      <sch:assert test="normalize-space($sn) != '' and normalize-space($snv) != ''"><sch:value-of
        select="$loc/strings/EEAstandardName.error"/></sch:assert>

      <sch:report test="normalize-space($sn) != '' and normalize-space($snv) != ''"><sch:value-of
        select="$loc/strings/EEAstandardName.report"/> "<sch:value-of
        select="normalize-space(concat($sn, ' ', $snv))"/>"</sch:report>

    </sch:rule>
  </sch:pattern>



  <sch:pattern>
    <sch:title>$loc/strings/EEACitation</sch:title>
      <sch:rule context="//mri:MD_DataIdentification">

        <sch:let name="identifier"
                 value="mri:citation/*/cit:identifier/
                */mcc:code/gco:CharacterString[not(starts-with(., 'DAT'))]"/>

        <sch:let name="eeaFilePath"
                 value="ancestor::mdb:MD_Metadata
                            //mrd:onLine/*[cit:protocol/gco:CharacterString = ('EEA:FILEPATH', 'EEA:FOLDERPATH')]"/>

        <sch:let name="filePathCount"
                 value="count($eeaFilePath)"/>
        <sch:let name="filePathWithoutIdentifierCount"
                 value="count($eeaFilePath/cit:linkage/*[contains(., concat('/', $identifier))])"/>

        <sch:let name="identifierIsInAllFilePath"
                 value="string-join($identifier, ',') != ''
                          and $filePathCount > 0
                          and $filePathCount = $filePathWithoutIdentifierCount"/>
        <sch:assert test="$identifierIsInAllFilePath"><sch:value-of
          select="$loc/strings/EEA.identifierInFilePath.alert"/></sch:assert>
        <sch:report test="$identifierIsInAllFilePath"><sch:value-of
          select="$loc/strings/EEA.identifierInFilePath.report"/></sch:report>


        <!-- MD_Metadata/identificationInfo/*/citation/*/edition
           https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationedition

           Conditional: only for datasets with a revision number (directory name ending in _revXX)

           Current rule checks that when an edition is provided, a link to a file or folder
           containing the _rev{editionNumber} is present.

           The version and revision numbers of the dataset should be consistent with this element,
            separated by a point (VersionNumber.RevisionNumber). Example in the wiki is maybe wrong? TODO?
                                <gco:CharacterString>15-0</gco:CharacterString>
        <sch:let name="edition"
                 value="gmd:citation/*/gmd:edition/gco:CharacterString"/>
        <sch:let name="editionInDataLink"
                 value="count(../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*
                          [(gmd:protocol/gco:CharacterString = 'EEA:FILEPATH' or
                            gmd:protocol/gco:CharacterString = 'EEA:FOLDERPATH')
                            and contains(gmd:linkage/gmd:URL, concat('_rev', $edition))]) > 0"/>

        <sch:assert test="$editionInDataLink and normalize-space($edition) != ''"><sch:value-of
          select="$loc/strings/EEAEDITION.alert"/>
        </sch:assert>
        <sch:report test="normalize-space($edition) != ''"><sch:value-of
          select="$loc/strings/EEAEDITION.report"/> "<sch:value-of
          select="normalize-space($edition)"/>"</sch:report>
           -->


      <!-- MD_Metadata/identificationInfo/*/status. Conditional.

           TODO? We could at least check that if one value is provided it is one of the four allowed.
      -->
      <sch:let name="status"
               value="mri:status/*/@codeListValue"/>

      <sch:assert test="normalize-space(string-join($status, '')) != ''"
      ><sch:value-of
        select="$loc/strings/EEAStatus.alert"/></sch:assert>
      <sch:report test="normalize-space(string-join($status, '')) != ''"><sch:value-of
        select="$loc/strings/EEAStatus.report"/> "<sch:value-of select="normalize-space(string-join($status, ', '))"/>"</sch:report>



        <!-- MD_Metadata/identificationInfo/*/descriptiveKeywords (EEA data categories)
             https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfodescriptiveKeywords-EEA-data-categories
             Check was disblaed in the past.-->
        <sch:let name="atLeastOneCategoryFromEEA"
                 value="count(mri:descriptiveKeywords/*[contains(mri:thesaurusName/*/cit:title/(gco:CharacterString|gcx:Anchor), 'EEA categories')]
                /mri:keyword[gco:CharacterString!=''])"/>

        <!--
        <sch:assert test="$atLeastOneCategoryFromEEA > 0"
            ><sch:value-of
                select="$loc/strings/EEA_CATEGORY.alert"/></sch:assert>
        <sch:report test="$atLeastOneCategoryFromEEA > 0"><sch:value-of select="$atLeastOneCategoryFromEEA"/> <sch:value-of
            select="$loc/strings/EEA_CATEGORY.report"/> </sch:report>
        -->
        <sch:assert test="$atLeastOneCategoryFromEEA != 0"><sch:value-of
          select="$loc/strings/EEA_CATEGORY.error"/></sch:assert>
        <sch:report test="$atLeastOneCategoryFromEEA != 0"><sch:value-of
          select="$loc/strings/EEA_CATEGORY.report"/></sch:report>



      <!-- MD_Metadata/identificationInfo/*/graphicOverview (Dataset thumbnail). Is mandatory for EEA.
           https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfographicOverview-Dataset-thumbnail
      -->
      <sch:let name="graphicOverview"
               value="mri:graphicOverview/*/mcc:fileName/gco:CharacterString[. != '']"/>

      <sch:assert test="count($graphicOverview) &gt; 0"
      >$loc/strings/EEAGraphicOverview.alert
      </sch:assert>
      <sch:report test="count($graphicOverview) &gt; 0">
        <sch:value-of
          select="$loc/strings/EEAGraphicOverview.report"/>
        "<sch:value-of
        select="normalize-space($graphicOverview[1])"/>"
      </sch:report>

      </sch:rule>
  </sch:pattern>




  <sch:pattern>
    <sch:title>$loc/strings/EEAQuality</sch:title>
    <sch:rule context="//mrl:LI_Lineage">
    <!-- MD_Metadata/dataQualityInfo/*/lineage
         https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatadataQualityInfolineage

         Check done in ISO.
    -->

    <!-- MD_Metadata/dataQualityInfo/*/lineage/*/source. Is optional.
         https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatadataQualityInfolineagesource
    -->

    <sch:let name="numberOfSource"
             value="count(mrl:source/@uuidref[. != ''])"/>

    <sch:report test="$numberOfSource = 0"><sch:value-of
      select="$loc/strings/EEAsource.report"/></sch:report>

    </sch:rule>
  </sch:pattern>

  <!-- MD_Metadata/distributionInfo/*/distributionFormat
       https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatadistributionInfodistributionFormat

       Distribution format is checked by ISO.

       No check on wiki values TODO?
       -->

  <!-- MD_Metadata/distributionInfo/*/transferOptions. Is mandatory for EEA.
       https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatadistributionInfotransferOptions


  -->
</sch:schema>
