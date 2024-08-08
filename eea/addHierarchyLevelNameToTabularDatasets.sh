#!/bin/bash

source ./connect.sh

QUERY="+resourceType:nonGeographicDataset -_exists_:resourceTypeName"
#QUERY='+uuid:"e4784c16-75a2-4b14-a96e-83c5f19316ba"'
FROM=0
SIZE=1000

read -r -d '' ESQUERY << EOF
{
  "from":${FROM},
  "size":${SIZE},
  "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
  "_source":{"includes":["uuid", "resourceTitleObject*"]}
}
EOF

RAWQUERY=`echo ${ESQUERY}`

echo $RAWQUERY

curl $AUTH  "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --data-raw "$RAWQUERY" \
  --compressed \
  -o results.json

read -p "Press enter to continue"

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id')
  echo "$uuid / $title\n"
  functionXml=""

read -r -d '' functionXml << EOF
   <gmd:hierarchyLevelName xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco">
     <gco:CharacterString>Tabular dataset</gco:CharacterString>
   </gmd:hierarchyLevelName>
EOF

  functionXml="${functionXml//$'\n'/}"

  read -r -d '' functionXml << EOF
{
"condition": "count(gmd:hierarchyLevelName) = 0",
"xpath":"/",
"value":"<gn_add>${functionXml//\"/\\\"}</gn_add>"
}
EOF

  echo $functionXml

  curl $AUTH  "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[$functionXml]" \
    --compressed
done
