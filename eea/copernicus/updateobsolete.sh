#SERVER=http://localhost:8080/geonetwork
SERVER=https://galliwasp.eea.europa.eu/catalogue
CATALOGUSER=
CATALOGPASS=
AUTH="-u $CATALOGUSER:$CATALOGPASS"

from=0
size=1000
echo $AUTH

rm results.json
rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET -v \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;
export TOKEN="9ab46ed8-b98c-4a96-97b1-33ae87b9d6d6";
export JSESSIONID="node0zc7h7tpzn0ej5jaasp7by4673000.node0";

echo "Using session with $TOKEN and id $JSESSIONID"

curl $AUTH "$SERVER/srv/api/search/records/_search" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw "{\"query\":{\"query_string\":{\"query\": \"+isHarvested:false  +linkUrl:/.*land.copernicus.eu.*/ +cl_status.key:obsolete\"}},\"from\":$from, \"size\":$size, \"_source\": {\"include\": [\"resourceTitleObject.default\"]}, \"sort\": [{\"resourceTitleObject.default.keyword\": \"asc\"}]}" \
    -H "X-XSRF-TOKEN: $TOKEN" -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed \
    -o results.json

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id')
  echo "\n__________"
  echo "### $uuid - $title"

  echo "Clean selection:"
  curl $AUTH "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed


  read -r -d '' xmlSnippet << EOF
  <gn_add><gmd:distributor xmlns:gmd="http://www.isotc211.org/2005/gmd"
                                  xmlns:gco="http://www.isotc211.org/2005/gco">
                             <gmd:MD_Distributor>
                                <gmd:distributorContact>
                                   <gmd:CI_ResponsibleParty>
                                      <gmd:organisationName>
                                         <gco:CharacterString>Copernicus Land Monitoring Service</gco:CharacterString>
                                      </gmd:organisationName>
                                      <gmd:contactInfo>
                                         <gmd:CI_Contact>
                                            <gmd:address>
                                               <gmd:CI_Address>
                                                  <gmd:electronicMailAddress>
                                                     <gco:CharacterString>copernicus@eea.europa.eu</gco:CharacterString>
                                                  </gmd:electronicMailAddress>
                                               </gmd:CI_Address>
                                            </gmd:address>
                                         </gmd:CI_Contact>
                                      </gmd:contactInfo>
                                      <gmd:role>
                                         <gmd:CI_RoleCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_RoleCode"
                                                          codeListValue="distributor"/>
                                      </gmd:role>
                                   </gmd:CI_ResponsibleParty>
                                </gmd:distributorContact>
                                <gmd:distributionOrderProcess>
                                   <gmd:MD_StandardOrderProcess>
                                      <gmd:orderingInstructions>
                                         <gco:CharacterString>This dataset is no longer accessible from the website of the Copernicus Land Monitoring Service.
                 You can request access to this dataset by contacting the service desk of the Copernicus Land Monitoring Service at copernicus@eea.europa.eu.</gco:CharacterString>
                                      </gmd:orderingInstructions>
                                   </gmd:MD_StandardOrderProcess>
                                </gmd:distributionOrderProcess>
                             </gmd:MD_Distributor>
                          </gmd:distributor></gn_add>
EOF
  xmlSnippetWithNoNewLine="${xmlSnippet//$'\n'/}"
  read -r -d '' batchEditConfig << EOF
    {
      "xpath":"/gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine[starts-with(*/gmd:linkage/gmd:URL, 'https://land.copernicus.eu/')]",
      "value":"<gn_delete/>"
    },
    {
      "xpath":"/gmd:distributionInfo[1]/*",
      "value":"${xmlSnippetWithNoNewLine//\"/\\\"}"
    }
EOF

  curl -v $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[${batchEditConfig//\\n/}]" \
    --compressed
done;

