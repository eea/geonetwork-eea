<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <sch:title xmlns="http://www.w3.org/2001/XMLSchema">Schematron validation / EEA
        recommendations</sch:title>
    <sch:ns prefix="gml" uri="http://www.opengis.net/gml"/>
    <sch:ns prefix="gmd" uri="http://www.isotc211.org/2005/gmd"/>
    <sch:ns prefix="srv" uri="http://www.isotc211.org/2005/srv"/>
    <sch:ns prefix="gco" uri="http://www.isotc211.org/2005/gco"/>
    <sch:ns prefix="geonet" uri="http://www.fao.org/geonetwork"/>
    <sch:ns prefix="xlink" uri="http://www.w3.org/1999/xlink"/>

    <!-- The Coordinate Reference System shall be referred to with its EPSG  -->
    <sch:pattern>
        <sch:title>$loc/strings/EEASRS.alert</sch:title>
        <sch:rule context="//gmd:MD_Metadata|//*[@gco:isoType='gmd:MD_Metadata']">
            <sch:let name="srs"
                value="gmd:referenceSystemInfo/*/gmd:referenceSystemIdentifier/*/
                                gmd:code/gco:CharacterString"/>

            <sch:assert test="normalize-space($srs) != ''"
                >$loc/strings/EEASRS.alert</sch:assert>
            <sch:report test="normalize-space($srs) != ''"><sch:value-of
                    select="$loc/strings/EEASRS.report"/> "<sch:value-of
                    select="normalize-space($srs)"/>"</sch:report>
        </sch:rule>
    </sch:pattern>
    
    <sch:pattern>
        <sch:title>$loc/strings/EEATITLE</sch:title>
        <sch:rule context="//gmd:MD_DataIdentification|//*[@gco:isoType='MD_DataIdentification']">
            
            
            <!-- The title should be self-explanatory -->
            <sch:let name="title"
                value="gmd:citation/*/gmd:title/gco:CharacterString"/>
            
            <sch:assert test="normalize-space($title) != ''"
                >$loc/strings/EEATITLE.alert</sch:assert>
            <sch:report test="normalize-space($title) != ''"><sch:value-of
                select="$loc/strings/EEATITLE.report"/> "<sch:value-of
                    select="normalize-space($title)"/>"</sch:report>
            
            
            
            <!-- Conditional: only for datasets published on the EEA website ( http://www.eea.europa.eu/data-and-maps/data)
             -->
            <sch:let name="publicationDate"
                value="gmd:citation/*/gmd:date/
                *[gmd:dateType/gmd:CI_DateTypeCode/@codeListValue='publication']/gmd:date/gco:Date"/>
            <sch:let name="availableOnWebSite"
                value="count(../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*/gmd:linkage
                /gmd:URL[starts-with(., 'http://www.eea.europa.eu/data-and-maps/data')]) > 0"/>
            <sch:let name="url"
                value="../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*/gmd:linkage
                /gmd:URL[starts-with(., 'http://www.eea.europa.eu/data-and-maps/data')]"/>
            
            <sch:assert test="($availableOnWebSite and normalize-space($publicationDate) != '') or not($availableOnWebSite)"
                ><sch:value-of
                    select="$loc/strings/EEAPUBDATE.alert"/> "<sch:value-of select="$url"/>"</sch:assert>
            <sch:report test="$availableOnWebSite and normalize-space($publicationDate) != ''"><sch:value-of
                select="$loc/strings/EEAPUBDATE.report"/> "<sch:value-of
                    select="normalize-space($publicationDate)"/>"</sch:report>
            
            <!-- Mandatory creation date -->
            <sch:let name="creationDate"
                value="gmd:citation/*/gmd:date/
                *[gmd:dateType/gmd:CI_DateTypeCode/@codeListValue='creation']/gmd:date/gco:Date"/>
            
            <sch:assert test="normalize-space($creationDate[1]) != ''"
                ><sch:value-of
                    select="$loc/strings/EEACREATIONDATE.alert"/></sch:assert>
            <sch:report test="normalize-space($creationDate[1]) != ''"><sch:value-of
                select="$loc/strings/EEACREATIONDATE.report"/> "<sch:value-of
                    select="normalize-space($creationDate[1])"/>"</sch:report>
            
            
            <!-- Conditional: only for datasets with a revision number (directory name ending in _revXX) -->
            <sch:let name="edition"
                value="gmd:citation/*/gmd:edition/gco:CharacterString"/>
            <sch:let name="editionInDataLink"
                value="count(../../gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*
                [(gmd:protocol/gco:CharacterString = 'EEA:FILEPATH' or gmd:protocol/gco:CharacterString = 'EEA:FOLDERPATH')
                and contains(gmd:linkage/gmd:URL, concat('_rev', $edition))]) > 0"/>
            
            <sch:assert test="$editionInDataLink and normalize-space($edition) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAEDITION.alert"/>
            </sch:assert>
            <sch:report test="$editionInDataLink and normalize-space($edition) != ''"><sch:value-of
                select="$loc/strings/EEAEDITION.report"/> "<sch:value-of
                    select="normalize-space($edition)"/>"</sch:report>
            
            
            <!-- Mandatory identifier-->
            <sch:let name="identifier"
                value="gmd:citation/*/gmd:identifier/
                */gmd:code/gco:CharacterString"/>
            
            <sch:assert test="normalize-space($identifier) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAID.alert"/></sch:assert>
            <sch:report test="normalize-space($identifier) != ''"><sch:value-of
                select="$loc/strings/EEAID.report"/> "<sch:value-of
                    select="normalize-space($identifier)"/>"</sch:report>
            
            
            <!-- Mandatory abstract-->
            <sch:let name="abstract"
                value="gmd:abstract/gco:CharacterString"/>
            
            <sch:assert test="normalize-space($abstract) != ''"
                ><sch:value-of
                    select="$loc/strings/EEAABSTRACT.alert"/></sch:assert>
            <sch:report test="normalize-space($abstract) != ''"><sch:value-of
                select="$loc/strings/EEAABSTRACT.report"/></sch:report>
            
            
            
            <!-- Mandatory point of contact -->
            <sch:let name="aPointOfContact"
                value="count(gmd:pointOfContact[*/gmd:role/gmd:CI_RoleCode/@codeListValue='pointOfContact']) > 0"/>
            
            <sch:assert test="$aPointOfContact"
                ><sch:value-of
                    select="$loc/strings/EEAPOC.alert"/></sch:assert>
            <sch:report test="$aPointOfContact"><sch:value-of
                select="$loc/strings/EEAPOC.report"/></sch:report>
            
            
            
            <!-- Mandatory custodian required for EEA dataset - FIXME - only for EEA datasets ? -->
            <sch:let name="aCustodian"
                value="count(gmd:pointOfContact[*/gmd:role/gmd:CI_RoleCode/@codeListValue='custodian']) > 0"/>
            
            <sch:assert test="$aCustodian"
                ><sch:value-of
                    select="$loc/strings/EEACUSTODIAN.alert"/></sch:assert>
            <sch:report test="$aCustodian"><sch:value-of
                select="$loc/strings/EEACUSTODIAN.report"/></sch:report>
            
            
            <!-- Resource maintenance -->
            <sch:let name="resourceMaintenance"
                value="gmd:resourceMaintenance/*/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue"/>
            <sch:let name="hasEdition"
                value="gmd:citation/*/gmd:edition/gco:CharacterString != ''"/>
            
            <sch:assert test="$hasEdition and normalize-space($resourceMaintenance)!=''"
                ><sch:value-of
                    select="$loc/strings/EEA_UP_FREQ.alert"/></sch:assert>
            <sch:report test="$hasEdition and normalize-space($resourceMaintenance)!=''"><sch:value-of
                select="$loc/strings/EEA_UP_FREQ.report"/> <sch:value-of select="$resourceMaintenance/string()"/></sch:report>
            
            
            
            <!-- One keyword from GEMET -->
            <sch:let name="atLeastOneKeywordFromGEMET"
                value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString, 'GEMET - Concepts')]
                /gmd:keyword[gco:CharacterString!=''])"/>
            
            <sch:assert test="$atLeastOneKeywordFromGEMET > 0"
                ><sch:value-of
                    select="$loc/strings/EEA_KEYWORD_GEMET.alert"/></sch:assert>
            <sch:report test="$atLeastOneKeywordFromGEMET > 0"><sch:value-of select="$atLeastOneKeywordFromGEMET"/> <sch:value-of
                select="$loc/strings/EEA_KEYWORD_GEMET.report"/> </sch:report>
            
            
            <!-- EEA keyword list -->
            <sch:let name="atLeastOneKeywordFromEEA"
                value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString, 'EEA keyword list')]
                /gmd:keyword[gco:CharacterString!=''])"/>
            
            <sch:assert test="$atLeastOneKeywordFromEEA > 0"
                ><sch:value-of
                    select="$loc/strings/EEA_KEYWORD_EEA.alert"/></sch:assert>
            <sch:report test="$atLeastOneKeywordFromEEA > 0"><sch:value-of select="$atLeastOneKeywordFromEEA"/> <sch:value-of
                select="$loc/strings/EEA_KEYWORD_EEA.report"/> </sch:report>
            
            
            <!-- EEA category - no check ? FIXME -->
            <sch:let name="atLeastOneCategoryFromEEA"
                value="count(gmd:descriptiveKeywords/*[contains(gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString, 'EEA keyword list')]
                /gmd:keyword[gco:CharacterString!=''])"/>
            
            <sch:assert test="$atLeastOneCategoryFromEEA > 0"
                ><sch:value-of
                    select="$loc/strings/EEA_CATEGORY.alert"/></sch:assert>
            <sch:report test="$atLeastOneCategoryFromEEA > 0"><sch:value-of select="$atLeastOneCategoryFromEEA"/> <sch:value-of
                select="$loc/strings/EEA_CATEGORY.report"/> </sch:report>
            
            
            
            <!-- Resource constraint -->
            
            <sch:let name="resourceConstraints"
                value="gmd:resourceConstraints/*/gmd:useLimitation/gco:CharacterString[.!='']"/>
            
            <sch:assert test="$resourceConstraints"
                ><sch:value-of
                    select="$loc/strings/EEA_RESCONSTRAINT.alert"/></sch:assert>
            <sch:report test="$resourceConstraints"><sch:value-of
                select="$loc/strings/EEA_RESCONSTRAINT.report"/> <sch:value-of select="$resourceConstraints"/></sch:report>
            
            
            
            <!-- Spatial representation type -->
            <sch:let name="spatialRepresentationType"
                value="gmd:spatialRepresentationType/gmd:MD_SpatialRepresentationTypeCode/@codeListValue[.!='']"/>
            
            <sch:assert test="$spatialRepresentationType"
                ><sch:value-of
                    select="$loc/strings/EEA_SPATIAL_TYPE.alert"/></sch:assert>
            <sch:report test="$spatialRepresentationType"><sch:value-of
                select="$loc/strings/EEA_SPATIAL_TYPE.report"/> <sch:value-of select="$spatialRepresentationType/string()"/> </sch:report>
            
            
            <!-- Spatial resolution -->
            <sch:let name="spatialResolution"
                value="normalize-space(gmd:spatialResolution)"/>
            
            <sch:assert test="$spatialResolution!=''"
                ><sch:value-of
                    select="$loc/strings/EEA_SPATIAL_RESOLUTION.alert"/></sch:assert>
            <sch:report test="$spatialResolution!=''"><sch:value-of
                select="$loc/strings/EEA_SPATIAL_RESOLUTION.report"/> <sch:value-of select="$spatialResolution"/> </sch:report>
            
            
            <!-- Language is checked in INSPIRE -->
            
            
            <!-- Topic category is checked in INSPIRE and ISO and XSD -->
            
            
            <!-- Bouding box is checked in ISO -->
            
            
            <!-- Temporal element -->
            <sch:let name="temporalElement"
                value="normalize-space(gmd:extent/gmd:EX_Extent/gmd:temporalElement)"/>
            
            <sch:assert test="$temporalElement!=''"
                ><sch:value-of
                    select="$loc/strings/EEA_TEMPORAL.alert"/></sch:assert>
            <sch:report test="$temporalElement!=''"><sch:value-of
                select="$loc/strings/EEA_TEMPORAL.report"/></sch:report>
            
            
            <!-- Distribution format is checked by ISO -->
            
        </sch:rule>
    </sch:pattern>
    
</sch:schema>
