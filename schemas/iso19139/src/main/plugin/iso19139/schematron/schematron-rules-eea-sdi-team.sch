<?xml version="1.0" encoding="UTF-8"?>
<sch:schema xmlns:sch="http://purl.oclc.org/dsdl/schematron"
            xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!--
  Guideline
  https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines
  -->

  <sch:title xmlns="http://www.w3.org/2001/XMLSchema">EEA
    SDI team checks
  </sch:title>
  <sch:ns prefix="gml" uri="http://www.opengis.net/gml"/>
  <sch:ns prefix="gmd" uri="http://www.isotc211.org/2005/gmd"/>
  <sch:ns prefix="srv" uri="http://www.isotc211.org/2005/srv"/>
  <sch:ns prefix="gco" uri="http://www.isotc211.org/2005/gco"/>
  <sch:ns prefix="geonet" uri="http://www.fao.org/geonetwork"/>
  <sch:ns prefix="xlink" uri="http://www.w3.org/1999/xlink"/>


  <sch:pattern>
    <sch:title>$loc/strings/EEACitation</sch:title>
    <sch:rule context="//gmd:MD_DataIdentification|//*[@gco:isoType='MD_DataIdentification']">

      <!-- MD_Metadata/identificationInfo/*/graphicOverview (Dataset thumbnail). Is mandatory for EEA.
           https://taskman.eionet.europa.eu/projects/public-docs/wiki/Cataloguemetadata_guidelines#MD_MetadataidentificationInfographicOverview-Dataset-thumbnail
      -->
      <sch:let name="graphicOverview"
               value="gmd:graphicOverview/*/gmd:fileName/gco:CharacterString"/>

      <sch:assert test="normalize-space($graphicOverview) != ''"
      >$loc/strings/EEAGraphicOverview.alert
      </sch:assert>
      <sch:report test="normalize-space($graphicOverview) != ''">
        <sch:value-of
          select="$loc/strings/EEAGraphicOverview.report"/>
        "<sch:value-of
        select="normalize-space($graphicOverview)"/>"
      </sch:report>

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
