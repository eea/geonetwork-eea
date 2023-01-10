TOKEN=ddf6c822-1330-4d59-8ff6-f5f732a60cad
JSESSIONID=node01uv7xse4uk75cqdr0faboapet3.node0
SERVER=http://localhost:8080/geonetwork
AUTH=""

# uuid	cmsid	type	action	resourceid	links	year	yearmax	final
i=0
while IFS=";" read -r uuid cmsid type action resourceid title links year yearmax final; do
  echo ""
  echo "____________________________________"
  dataUrl="https://sdi.eea.europa.eu/webdav/continental/tabular/$resourceid/"

  echo "Adding datashare link $dataUrl for $uuid ..."

  read -r -d '' xmlSnippet << EOF
               <gmd:onLine xmlns:gmd="http://www.isotc211.org/2005/gmd"
                           xmlns:gco="http://www.isotc211.org/2005/gco">
                  <gmd:CI_OnlineResource>
                     <gmd:linkage>
                        <gmd:URL>$dataUrl</gmd:URL>
                     </gmd:linkage>
                     <gmd:protocol>
                        <gco:CharacterString>EEA:FOLDERPATH</gco:CharacterString>
                     </gmd:protocol>
                     <gmd:function>
                        <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                                   codeListValue="download"/>
                     </gmd:function>
                  </gmd:CI_OnlineResource>
               </gmd:onLine>
EOF

  xmlSnippetWithNoNewLine="${xmlSnippet//$'\n'/}"
  read -r -d '' batchEditConfig << EOF
  {
    "xpath":"/gmd:distributionInfo/*/gmd:transferOptions/*",
    "value":"<gn_add>${xmlSnippetWithNoNewLine//\"/\\\"}</gn_add>"
  }
EOF

  echo "${batchEditConfig}"
  curl $AUTH "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
      -X 'PUT' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "X-XSRF-TOKEN: $TOKEN" \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      --data-raw "[${batchEditConfig}]" \
      --compressed

done < listsimple.csv
