#!/bin/bash

source ./connect.sh

QUERY='+resourceIdentifier.code:*_p_*'
FROM=0
SIZE=13000

read -r -d '' ESQUERY << EOF
{
"from":${FROM},
"size":${SIZE},
"sort":["uuid"],
"query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
"_source":{"includes":[""]},
"track_total_hits":true
}
EOF

rm results.json

RAWQUERY=`echo ${ESQUERY}`

curl "$SERVER/srv/api/search/records/_search" \
  $AUTH -X 'POST' \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json;charset=UTF-8' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
  -d "$RAWQUERY" \
  --compressed \
  -o results.json

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
  _jq() {
  echo "${hit}" | base64 --decode | jq -r "${1}"
  }

  uuid=$(_jq '._id')
  echo "### $uuid"
  encodeduuid=`echo $uuid|jq -Rr @uri`
  curl "$SERVER/srv/api/processes/empty?uuids=$encodeduuid&updateDateStamp=false" \
        $AUTH -X 'POST' \
        -H 'Accept: application/json, text/plain, */*' \
        -H 'Content-Type: application/json;charset=UTF-8' \
        -H "X-XSRF-TOKEN: $TOKEN" \
        -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
        --compressed
done;
