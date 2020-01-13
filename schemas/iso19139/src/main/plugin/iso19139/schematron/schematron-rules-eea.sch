<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!--
    Guideline
    https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines
    -->

    <sch:title xmlns="http://www.w3.org/2001/XMLSchema">EEA editor checks</sch:title>
    <sch:ns prefix="gml" uri="http://www.opengis.net/gml"/>
    <sch:ns prefix="gmd" uri="http://www.isotc211.org/2005/gmd"/>
    <sch:ns prefix="srv" uri="http://www.isotc211.org/2005/srv"/>
    <sch:ns prefix="gmx" uri="http://www.isotc211.org/2005/gmx"/>
    <sch:ns prefix="gco" uri="http://www.isotc211.org/2005/gco"/>
    <sch:ns prefix="geonet" uri="http://www.fao.org/geonetwork"/>
    <sch:ns prefix="xlink" uri="http://www.w3.org/1999/xlink"/>

    <sch:pattern>
      <sch:title>$loc/strings/EEAmetadata.title</sch:title>
      <sch:rule context="//gmd:MD_Metadata|//*[@gco:isoType='gmd:MD_Metadata']">



        <!-- MD_Metadata/hierarchyLevel. Is mandatory for EEA.
        https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatahierarchyLevel

        No validation rule defined for that because the template
        define a default value and the EEA editor does not allow
        to remove it. TODO?
        -->
        <sch:let name="hl"
                 value="gmd:hierarchyLevel/*/@codeListValue"/>

        <sch:report test="normalize-space($hl) != ''"><sch:value-of
          select="$loc/strings/EEAhierarchyLevel.report"/> "<sch:value-of
          select="normalize-space($hl)"/>"</sch:report>


        <!-- MD_Metadata/contact. Is mandatory for EEA (and INSPIRE).
        https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_Metadatacontact


        Check is done for INSPIRE https://github.com/eea/geonetwork-eea/blob/eea-3.4.3/schemas/iso19139/src/main/plugin/iso19139/schematron/schematron-rules-inspire.disabled.sch#L691-L698
        -->

        <!-- MD_Metadata/referenceSystemInfo/*/referenceSystemIdentifier. Is mandatory for EEA.
        https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatareferenceSystemInforeferenceSystemIdentifier

        The Coordinate Reference System shall be referred to with its EPSG.

        Current rule is xlink:href attribute starts with http://www.opengis.net/def/crs/EPSG/0/EPSG
        -->
        <sch:let name="srs"
                 value="string-join(gmd:referenceSystemInfo/*/gmd:referenceSystemIdentifier/*/
                                gmd:code/*, ',')"/>
        <sch:let name="countSrs"
                 value="count(gmd:referenceSystemInfo/*/gmd:referenceSystemIdentifier/*/
                                gmd:code/gmx:Anchor[starts-with(@xlink:href, 'http://www.opengis.net/def/crs/EPSG/0/')])"/>

        <!-- Not empty check. -->
        <sch:assert test="$countSrs > 0"
        >$loc/strings/EEASRS.alert</sch:assert>
        <sch:report test="$countSrs > 0"><sch:value-of
          select="$loc/strings/EEASRS.report"/> "<sch:value-of
          select="$srs"/>"</sch:report>
      </sch:rule>
    </sch:pattern>




    <sch:pattern>
        <sch:title>$loc/strings/EEATITLE</sch:title>
        <sch:rule context="//gmd:MD_DataIdentification|//*[@gco:isoType='MD_DataIdentification']">

          <!-- MD_Metadata/identificationInfo/*/citation/*/title. Is mandatory for EEA.
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationtitle

               The title should be self-explanatory.
               Check non empty title.
            -->
            <sch:let name="title"
                value="gmd:citation/*/gmd:title/gco:CharacterString"/>

            <sch:assert test="normalize-space($title) != ''"
                >$loc/strings/EEATITLE.alert</sch:assert>
            <sch:report test="normalize-space($title) != ''"><sch:value-of
                select="$loc/strings/EEATITLE.report"/> "<sch:value-of
                    select="normalize-space($title)"/>"</sch:report>


          <!-- MD_Metadata/identificationInfo/*/citation/*/date (creation)
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationdate-creation

               Not empty check is done.
                -->
          <sch:let name="creationDate"
                   value="gmd:citation/*/gmd:date/
                *[gmd:dateType/gmd:CI_DateTypeCode/@codeListValue='creation']/gmd:date/gco:Date"/>

          <sch:assert test="normalize-space($creationDate[1]) != ''"
          ><sch:value-of
            select="$loc/strings/EEACREATIONDATE.alert"/></sch:assert>
          <sch:report test="normalize-space($creationDate[1]) != ''"><sch:value-of
            select="$loc/strings/EEACREATIONDATE.report"/> "<sch:value-of
            select="normalize-space($creationDate[1])"/>"</sch:report>


            <!-- MD_Metadata/identificationInfo/*/citation/*/date (publication)
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationdate-publication

                 Conditional: only for datasets published on the EEA website
                 (http://www.eea.europa.eu/data-and-maps/data)

                 Current rule checks for not empty date and with a link to //www.eea.europa.eu/data-and-maps/data
             -->
            <sch:let name="publicationDate"
                value="gmd:citation/*/gmd:date/
                *[gmd:dateType/gmd:CI_DateTypeCode/@codeListValue='publication']/gmd:date/gco:Date"/>
            <sch:let name="availableOnWebSite"
                value="count(../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*/gmd:linkage
                /gmd:URL[contains(., '://www.eea.europa.eu/data-and-maps/data')]) > 0"/>
            <sch:let name="url"
                value="../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*/gmd:linkage
                /gmd:URL[contains(., '://www.eea.europa.eu/data-and-maps/data')]"/>


            <sch:report test="normalize-space($publicationDate) = ''"><sch:value-of
              select="$loc/strings/EEAPUBLICATIONDATE.report"/></sch:report>


            <sch:assert test="($availableOnWebSite and normalize-space($publicationDate) != '') or not($availableOnWebSite)"
                ><sch:value-of
                    select="$loc/strings/EEAPUBDATE.alert"/> "<sch:value-of select="$url"/>"</sch:assert>
            <sch:report test="$availableOnWebSite and normalize-space($publicationDate) != ''"><sch:value-of
                select="$loc/strings/EEAPUBDATE.report"/> "<sch:value-of
                    select="normalize-space($publicationDate)"/>"</sch:report>


            <sch:assert test="normalize-space($publicationDate) = '' or (
                                normalize-space($publicationDate) != ''
                                and normalize-space($creationDate[1]) != ''
                                and compare($publicationDate, $creationDate[1]) &gt; -1)"
            ><sch:value-of
              select="$loc/strings/EEAPublicationDateMustBeEqualOrAfterCreationDate.alert"/></sch:assert>

            <sch:report test="normalize-space($publicationDate) != ''
                                  and normalize-space($creationDate[1]) != ''
                                  and compare($publicationDate, $creationDate[1]) &gt; -1"
            ><sch:value-of
              select="$loc/strings/EEAPublicationDateIsEqualOrAfterCreationDate.alert"/></sch:report>

            <!-- MD_Metadata/identificationInfo/*/citation/*/edition
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationedition

               Conditional: only for datasets with a revision number (directory name ending in _revXX)

               Current rule checks that when an edition is provided, a link to a file or folder
               containing the _rev{editionNumber} is present.

               The version and revision numbers of the dataset should be consistent with this element,
                separated by a point (VersionNumber.RevisionNumber). Example in the wiki is maybe wrong? TODO?
                                    <gco:CharacterString>15-0</gco:CharacterString>
               -->
            <sch:let name="edition"
                value="gmd:citation/*/gmd:edition/gco:CharacterString"/>
            <!--<sch:let name="editionInDataLink"
                value="count(../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*
                              [(gmd:protocol/gco:CharacterString = 'EEA:FILEPATH' or
                                gmd:protocol/gco:CharacterString = 'EEA:FOLDERPATH')
                               and contains(gmd:linkage/gmd:URL, concat('_rev', $edition))]) > 0"/>-->

            <!--<sch:assert test="$editionInDataLink and normalize-space($edition) != ''"-->
            <sch:assert test="normalize-space($edition) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAEDITION.alert"/>
            </sch:assert>
            <sch:report test="normalize-space($edition) != ''"><sch:value-of
                select="$loc/strings/EEAEDITION.report"/> "<sch:value-of
                    select="normalize-space($edition)"/>"</sch:report>


            <!-- MD_Metadata/identificationInfo/*/citation/*/identifier. Is mandatory for EEA.
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfocitationidentifier

                 Current rule checks non empty.

                 Should we add more checks related to unicity and
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Naming_conventions ? TODO?
                 -->
            <sch:let name="identifier"
                value="gmd:citation/*/gmd:identifier/
                */gmd:code/gco:CharacterString"/>

            <sch:assert test="normalize-space($identifier) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAID.alert"/></sch:assert>
            <sch:report test="normalize-space($identifier) != ''"><sch:value-of
                select="$loc/strings/EEAID.report"/> "<sch:value-of
                    select="normalize-space($identifier)"/>"</sch:report>


            <!-- MD_Metadata/identificationInfo/*/abstract. Is mandatory for EEA
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfoabstract

                 Current rule checks non empty.
            -->
            <sch:let name="abstract"
                value="gmd:abstract/gco:CharacterString"/>

            <sch:assert test="normalize-space($abstract) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAABSTRACT.alert"/></sch:assert>
            <sch:report test="normalize-space($abstract) != ''"><sch:value-of
                select="$loc/strings/EEAABSTRACT.report"/></sch:report>



            <!-- MD_Metadata/identificationInfo/*/pointOfContact (point of contact). Mandatory for EEA.
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfopointOfContact-point-of-contact

                 Current rule check one contact is defined. INSPIRE rules check for organisation name and email is defined.
            -->
            <sch:let name="aPointOfContact"
                value="count(gmd:pointOfContact[*/gmd:role/gmd:CI_RoleCode/@codeListValue='pointOfContact']) > 0"/>

            <sch:assert test="$aPointOfContact"
                ><sch:value-of
                    select="$loc/strings/EEAPOC.alert"/></sch:assert>
            <sch:report test="$aPointOfContact"><sch:value-of
                select="$loc/strings/EEAPOC.report"/></sch:report>



            <!-- MD_Metadata/identificationInfo/*/pointOfContact (custodian)
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfopointOfContact-custodian

                 Mandatory custodian required for EEA dataset - TODO? - only for EEA datasets - how to define
            -->
            <sch:let name="aCustodian"
                value="count(gmd:pointOfContact[*/gmd:role/gmd:CI_RoleCode/@codeListValue='custodian']) > 0"/>

            <sch:assert test="$aCustodian"
                ><sch:value-of
                    select="$loc/strings/EEACUSTODIAN.alert"/></sch:assert>
            <sch:report test="$aCustodian"><sch:value-of
                select="$loc/strings/EEACUSTODIAN.report"/></sch:report>


            <!-- MD_Metadata/identificationInfo/*/resourceMaintenance.
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInforesourceMaintenance

              Conditional: required for all datasets which have versions
              (i.e. regularly or irregularly updated)
            -->
            <sch:let name="resourceMaintenance"
                value="gmd:resourceMaintenance/*/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue"/>
            <sch:let name="hasEdition"
                value="gmd:citation/*/gmd:edition/gco:CharacterString != ''"/>

            <sch:assert test="$hasEdition and normalize-space($resourceMaintenance)!=''"
                ><sch:value-of
                    select="$loc/strings/EEA_UP_FREQ.alert"/></sch:assert>
            <sch:report test="$hasEdition and normalize-space($resourceMaintenance)!=''"><sch:value-of
                select="$loc/strings/EEA_UP_FREQ.report"/> <sch:value-of select="$resourceMaintenance/string()"/></sch:report>


            <!-- MD_Metadata/identificationInfo/*/descriptiveKeywords (INSPIRE themes)
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfodescriptiveKeywords-INSPIRE-themes

                 Done in INSPIRE checks.

                 To be updated for Anchor usage in TODO TGv2
                 -->

            <!-- MD_Metadata/identificationInfo/*/descriptiveKeywords (EEA keywords list)
                 https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfodescriptiveKeywords-EEA-keywords-list
                 Check was disblaed in the past.
            -->
            <sch:let name="atLeastOneKeywordFromEEA"
                value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString, 'EEA keyword list')]
                /gmd:keyword[gco:CharacterString!=''])"/>

            <!--<sch:assert test="$atLeastOneKeywordFromEEA > 0"
                ><sch:value-of
                    select="$loc/strings/EEA_KEYWORD_EEA.alert"/></sch:assert>
            <sch:report test="$atLeastOneKeywordFromEEA > 0"><sch:value-of select="$atLeastOneKeywordFromEEA"/> <sch:value-of
                select="$loc/strings/EEA_KEYWORD_EEA.report"/> </sch:report>-->
            <sch:assert test="$atLeastOneKeywordFromEEA != 0"><sch:value-of
                        select="$loc/strings/EEA_KEYWORD_EEA.error"/> </sch:assert>
            <sch:report test="$atLeastOneKeywordFromEEA != 0"><sch:value-of
                                    select="$loc/strings/EEA_KEYWORD_EEA.report"/> </sch:report>


          <sch:let name="atLeastOneSpatialScope"
                   value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:title/(gmd:CharacterString|gmx:Anchor), 'Spatial scope')]
                /gmd:keyword[* != ''])"/>

          <sch:assert test="$atLeastOneSpatialScope != 0"><sch:value-of
            select="$loc/strings/EEA_KEYWORD_SPATIALSCOPE.error"/> </sch:assert>
          <sch:report test="$atLeastOneSpatialScope != 0"><sch:value-of
            select="$loc/strings/EEA_KEYWORD_SPATIALSCOPE.report"/> </sch:report>


          <!-- MD_Metadata/identificationInfo/*/descriptiveKeywords (GEMET concepts). Is mandatory for EEA.
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfodescriptiveKeywords-GEMET-concepts

               There should be at least 3-4 GEMET concepts per dataset.

               Current check is at least one.
          -->
          <sch:let name="atLeastOneKeywordFromGEMET"
                   value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:identifier/*/gmd:code/*:Anchor/text(), 'external.theme.gemet')]
                /gmd:keyword[gco:CharacterString!=''])"/>

          <sch:assert test="$atLeastOneKeywordFromGEMET > 1"
          ><sch:value-of
            select="$loc/strings/EEA_KEYWORD_GEMET.alert"/></sch:assert>
          <sch:report test="$atLeastOneKeywordFromGEMET > 1"><sch:value-of select="$atLeastOneKeywordFromGEMET"/> <sch:value-of
            select="$loc/strings/EEA_KEYWORD_GEMET.report"/> </sch:report>


          <!-- Check spatial coverage description -->
          <sch:let name="atLeastOneKeywordFromRegions"
                   value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:identifier/*/gmd:code/*:Anchor/text(), 'external.place.regions')]
                /gmd:keyword[gco:CharacterString!=''])"/>

          <sch:assert test="$atLeastOneKeywordFromRegions > 0"
          ><sch:value-of
            select="$loc/strings/EEA_KEYWORD_Regions.alert"/></sch:assert>
          <sch:report test="$atLeastOneKeywordFromRegions > 0"><sch:value-of select="$atLeastOneKeywordFromRegions"/> <sch:value-of
            select="$loc/strings/EEA_KEYWORD_Regions.report"/> </sch:report>


          <!-- MD_Metadata/identificationInfo/*/descriptiveKeywords (Temporal resolution of the dataset)
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfodescriptiveKeywords-Temporal-resolution-of-the-dataset

               Conditional: only for those datasets which belong to a time series
          -->
          <sch:let name="temporalResolutionKeyword"
                   value="gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:identifier/*/gmd:code/*:Anchor/text(), 'local.temporal.temporal-update')]
                /gmd:keyword/gco:CharacterString[.!='']"/>


          <sch:report test="normalize-space($temporalResolutionKeyword[1]) = ''"><sch:value-of
            select="$loc/strings/EEA_TEMPORAL_RESOLUTION.alert"/></sch:report>
          <sch:report test="normalize-space($temporalResolutionKeyword[1]) != ''"><sch:value-of
            select="$loc/strings/EEA_TEMPORAL_RESOLUTION.report"/> "<sch:value-of select="normalize-space($temporalResolutionKeyword[1])"/>"</sch:report>



          <!-- MD_Metadata/identificationInfo/*/resourceConstraints/*/useLimitation and */accessConstraints¶
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInforesourceConstraintsuseLimitation-and-accessConstraints

               Current rule checks non empty.
           -->

          <sch:let name="resourceAConstraints"
              value="gmd:resourceConstraints/gmd:MD_LegalConstraints[gmd:accessConstraints]/gmd:otherConstraints/*[.!='']"/>

          <sch:assert test="$resourceAConstraints"
              ><sch:value-of
                  select="$loc/strings/EEA_RESACONSTRAINT.alert"/></sch:assert>
          <sch:report test="$resourceAConstraints"><sch:value-of
              select="$loc/strings/EEA_RESACONSTRAINT.report"/> <sch:value-of select="$resourceAConstraints"/></sch:report>

          <sch:let name="resourceUConstraints"
                   value="gmd:resourceConstraints/gmd:MD_LegalConstraints[gmd:useConstraints]/gmd:otherConstraints/*[.!='']"/>

          <sch:assert test="$resourceUConstraints"
          ><sch:value-of
            select="$loc/strings/EEA_RESUCONSTRAINT.alert"/></sch:assert>
          <sch:report test="$resourceUConstraints"><sch:value-of
            select="$loc/strings/EEA_RESUCONSTRAINT.report"/> <sch:value-of select="$resourceUConstraints"/></sch:report>
          <!-- MD_Metadata/identificationInfo/*/aggregationInfo (revision of an existing resource)¶
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfoaggregationInfo-revision-of-an-existing-resource
          -->



          <!-- MD_Metadata/identificationInfo/*/spatialRepresentationType. Is mandatory for EEA
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfospatialRepresentationType

          -->
          <sch:let name="spatialRepresentationType"
                   value="gmd:spatialRepresentationType/gmd:MD_SpatialRepresentationTypeCode/@codeListValue[.!='']"/>

          <sch:assert test="$spatialRepresentationType"
              ><sch:value-of
                  select="$loc/strings/EEA_SPATIAL_TYPE.alert"/></sch:assert>
          <sch:report test="$spatialRepresentationType"><sch:value-of
              select="$loc/strings/EEA_SPATIAL_TYPE.report"/> <sch:value-of select="$spatialRepresentationType/string()"/> </sch:report>


          <!-- MD_Metadata/identificationInfo/*/spatialResolution. Is mandatory for EEA.
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfospatialResolution

               Current rule checks non empty.
          -->

          <sch:let name="spatialResolutionConcat"
                   value="string-join(gmd:spatialResolution/*[. != ''], '')"/>
          <sch:let name="spatialResolution"
                   value="string-join(gmd:spatialResolution/*[. != ''], ',')"/>

          <sch:assert test="$spatialResolutionConcat != ''"
              ><sch:value-of
                  select="$loc/strings/EEA_SPATIAL_RESOLUTION.alert"/></sch:assert>
          <sch:report test="$spatialResolution!=''"><sch:value-of
              select="$loc/strings/EEA_SPATIAL_RESOLUTION.report"/> <sch:value-of select="$spatialResolution"/> </sch:report>


          <!-- MD_Metadata/identificationInfo/*/language
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfolanguage

               Language is checked in INSPIRE -->


          <!-- MD_Metadata/identificationInfo/*/topicCategory
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfotopicCategory

               Topic category is checked in INSPIRE and ISO and XSD -->


          <!-- MD_Metadata/identificationInfo/*/extent (spatial)
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfoextent-spatial

               Bouding box is checked in ISO -->


          <!-- MD_Metadata/identificationInfo/*/extent (temporal)
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfoextent-temporal

               Temporal element -->
          <sch:let name="temporalElement"
              value="normalize-space(string-join(gmd:extent/gmd:EX_Extent/gmd:temporalElement, ''))"/>

          <sch:assert test="$temporalElement!=''"
              ><sch:value-of
                  select="$loc/strings/EEA_TEMPORAL.alert"/></sch:assert>
          <sch:report test="$temporalElement!=''"><sch:value-of
              select="$loc/strings/EEA_TEMPORAL.report"/></sch:report>


          <!-- MD_Metadata/identificationInfo/*/supplementalInformation. Is optional.
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfosupplementalInformation
          -->


          <!-- MD_Metadata/dataQualityInfo/*/DQ_ConformanceResult (INSPIRE IR conformity statement).
               https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadatadataQualityInfoDQ_ConformanceResult-INSPIRE-IR-conformity-statement

               Current INSPIRE v1.3 schematron check that a report exist.
          -->

        </sch:rule>
    </sch:pattern>

</sch:schema>
