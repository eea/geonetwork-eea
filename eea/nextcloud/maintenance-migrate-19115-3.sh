#!/bin/bash

source ../connect.sh

QUERY='+documentStandard:iso19139 +isHarvested:false +isTemplate:(y OR n)'
#QUERY='+documentStandard:iso19139 +isHarvested:false +isTemplate:(y OR n) +uuid:\"d5948b24-0a46-4946-b1eb-1f96440c5685\"'

TOKEN=fa464e21-6e10-4612-a84f-fb924464928a
GNSESSIONID=ABF3DD633F49137680B5A587BC1271BB
JSESSIONID=node01bw3cs7048hp93maetbfbmwmd97.node0


curl -v $AUTH "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --data-raw "{\"from\":0,\"size\":10000,\"sort\":[\"uuid\"],\"query\":{\"query_string\":{\"query\":\"$QUERY\"}},\"_source\":{\"includes\":[\"uuid\",\"resourceTitleObject*\"]},\"track_total_hits\":true}" \
  -o results.json


read -p "Press enter to continue"


for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  echo ""
  echo ""
  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id' | jq -sRr @uri)
  echo "$uuid / $title\n"

  curl $AUTH "$SERVER/srv/api/processes/iso19115-3.2018-schemaupgrade?uuids=$uuid&updateDateStamp=true&index=true" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
    --compressed
done


