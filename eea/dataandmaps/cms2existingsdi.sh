TOKEN=8ad98c39-e5fc-487e-8f52-6b208a116caa
JSESSIONID=node0v4fumdznb3sacjgfcnmev9f71.node0
SERVER=http://localhost:8080/geonetwork
AUTH=""

i=0
while IFS=";" read -r cmsid sdiuuids; do
  echo ""
  echo "____________________________________"
  echo "Processing #$i"
  echo "$cmsid / $sdiuuids"

  filename=$(sed -E "s/eea-data-and-maps-data-(.*)/\1/g" <<<$cmsid)
  echo "Downloading CMS record from https://www.eea.europa.eu/data-and-maps/data/$filename/@@rdf"
  curl -L -s "https://www.eea.europa.eu/data-and-maps/data/$filename/@@rdf" -o tmp.xml

  rod=$(xmllint --xpath "//*[local-name() = 'reportingObligations']/text()[. != '0']" tmp.xml)
  mp=$(xmllint --xpath "//*[local-name() = 'eeaManagementPlan']/text()" tmp.xml)
  config=""

  if [ -z "$rod" ]; then
    rodBatchConfig=""
  else
    rodKeywords=""
    for code in ${rod// / } ; do
      curl $AUTH "$SERVER/srv/api/registries/vocabularies/search?type=CONTAINS&thesaurus=external.theme.rod-eionet-europa-eu&uri=http%3A%2F%2Frod.eionet.europa.eu%2Fobligations%2F$code&rows=50&q=450&pLang=eng" \
          -H 'Accept: application/json, text/plain, */*' \
          -H 'Content-Type: application/json;charset=UTF-8' \
          -H "X-XSRF-TOKEN: $TOKEN" \
          -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
        --compressed -s -o tmprod.json

      rodlabel=$(jq '.[0].value' tmprod.json)

      echo "$code: $rodlabel"
      read -r -d '' rodKeywords << EOF
      $rodKeywords
      <gmd:keyword>
         <gmx:Anchor xlink:href=\\"http://rod.eionet.europa.eu/obligations/$code\\">${rodlabel//\"/}</gmx:Anchor>
      </gmd:keyword>
EOF
    done

    read -r -d '' rodBatchConfig << EOF
{
"condition": "count(gmd:identificationInfo/*/gmd:descriptiveKeywords[*/gmd:thesaurusName/*/gmd:title/*/text() = 'Reporting obligations']) = 0",
"xpath":"/gmd:identificationInfo/*",
"value":"<gn_add><gmd:descriptiveKeywords xmlns:gmd=\\"http://www.isotc211.org/2005/gmd\\" xmlns:gmx=\\"http://www.isotc211.org/2005/gmx\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" xmlns:gco=\\"http://www.isotc211.org/2005/gco\\">
<gmd:MD_Keywords>
      $rodKeywords
      <gmd:type>
         <gmd:MD_KeywordTypeCode codeList=\\"http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode\\"
                                 codeListValue=\\"theme\\"/>
      </gmd:type>
      <gmd:thesaurusName>
         <gmd:CI_Citation>
            <gmd:title>
               <gco:CharacterString>Reporting obligations</gco:CharacterString>
            </gmd:title>
            <gmd:date>
               <gmd:CI_Date>
                  <gmd:date>
                     <gco:Date>2021-08-25</gco:Date>
                  </gmd:date>
                  <gmd:dateType>
                     <gmd:CI_DateTypeCode codeList=\\"http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode\\"
                                          codeListValue=\\"publication\\"/>
                  </gmd:dateType>
               </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
               <gmd:MD_Identifier>
                  <gmd:code>
                     <gmx:Anchor xlink:href=\\"https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.rod-eionet-europa-eu\\">geonetwork.thesaurus.external.theme.rod-eionet-europa-eu</gmx:Anchor>
                  </gmd:code>
               </gmd:MD_Identifier>
            </gmd:identifier>
         </gmd:CI_Citation>
      </gmd:thesaurusName>
   </gmd:MD_Keywords>
</gmd:descriptiveKeywords></gn_add>"
}
EOF

    config=$rodBatchConfig
  fi


  echo $mp

  if [ -z "$mp" ]; then
    mpBatchConfig=""
  else
    if [ ! -z "$rod" ]; then
        config="$config,"
    fi
    mpKeywords=""
#    for code in ${mp// / } ; do
      read -r -d '' mpKeywords << EOF
      $mpKeywords
      <gmd:keyword>
          <gco:CharacterString>$mp</gco:CharacterString>
      </gmd:keyword>
EOF
#    done

    read -r -d '' mpBatchConfig << EOF
{
"condition": "count(gmd:identificationInfo/*/gmd:descriptiveKeywords[*/gmd:thesaurusName/*/gmd:title/*/text() = 'EEA Management Plan']) = 0",
"xpath":"/gmd:identificationInfo/*",
"value":"<gn_add><gmd:descriptiveKeywords xmlns:gmd=\\"http://www.isotc211.org/2005/gmd\\" xmlns:gmx=\\"http://www.isotc211.org/2005/gmx\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" xmlns:gco=\\"http://www.isotc211.org/2005/gco\\">
   <gmd:MD_Keywords>
      $mpKeywords
      <gmd:type>
         <gmd:MD_KeywordTypeCode codeList=\\"http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_KeywordTypeCode\\"
                                 codeListValue=\\"theme\\"/>
      </gmd:type>
      <gmd:thesaurusName>
         <gmd:CI_Citation>
            <gmd:title>
               <gco:CharacterString>EEA Management Plan</gco:CharacterString>
            </gmd:title>
            <gmd:date>
               <gmd:CI_Date>
                  <gmd:date>
                     <gco:Date>2021-08-25</gco:Date>
                  </gmd:date>
                  <gmd:dateType>
                     <gmd:CI_DateTypeCode codeList=\\"http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_DateTypeCode\\"
                                          codeListValue=\\"publication\\"/>
                  </gmd:dateType>
               </gmd:CI_Date>
            </gmd:date>
            <gmd:identifier>
               <gmd:MD_Identifier>
                  <gmd:code>
                     <gmx:Anchor xlink:href=\\"https://sdi.eea.europa.eu/catalogue/srv/api/registries/vocabularies/external.theme.eea-mp\\">geonetwork.thesaurus.external.theme.eea-mp</gmx:Anchor>
                  </gmd:code>
               </gmd:MD_Identifier>
            </gmd:identifier>
         </gmd:CI_Citation>
      </gmd:thesaurusName>
   </gmd:MD_Keywords>
</gmd:descriptiveKeywords></gn_add>"
}
EOF

    config="$config$mpBatchConfig"
  fi


  config="[$config]"
  echo ${config//$'\n'/}
  for uuid in ${sdiuuids//#/ } ; do
    echo "  Updating record $uuid ..."
    curl $AUTH "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
      -X 'PUT' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "X-XSRF-TOKEN: $TOKEN" \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      --data-raw "${config//$'\n'/}"
  done
done <listSdiExisting.csv
