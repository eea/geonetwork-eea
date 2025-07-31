#!/bin/bash

source ./connect.sh

TOKEN=fa464e21-6e10-4612-a84f-fb924464928a
GNSESSIONID=8FA953A8CBDC51E5214457ADAA0C4543
JSESSIONID=node0jzcy6vodwy1p1da2yo32yav9c100912.node0

while IFS="," read -r uuid resourceId; do

  echo "Processing UUID: $uuid with Resource ID: $resourceId"
  QUERY="+uuid:\"$uuid\""
  FROM=0
  SIZE=2

  read -r -d '' ESQUERY << EOF
  {
    "from":${FROM},
    "size":${SIZE},
    "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
    "_source":{"includes":["uuid", "resourceTitleObject*", "resourceIdentifier"]}
  }
EOF

  RAWQUERY=`echo ${ESQUERY}`

  echo $RAWQUERY

  curl $AUTH  "$SERVER/srv/api/search/records/_search?bucket=s101" \
    -H 'accept: application/json, text/plain, */*' \
    -H 'accept-language: eng' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
    -H 'content-type: application/json;charset=UTF-8' \
    --data-raw "$RAWQUERY" \
    --compressed \
    -o results.json


  for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
     _jq() {
       echo "${hit}" | base64 --decode | jq -r "${1}"
      }

    title=$(_jq '._source.resourceTitleObject.default')
    uuid=$(_jq '._id')
    echo "$uuid / $title\n"
    xmlEdit=""

  read -r -d '' xmlEdit << EOF
      <gmd:identifier xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco">
      <gmd:MD_Identifier>
      <gmd:code>
      <gco:CharacterString>$resourceId</gco:CharacterString>
      </gmd:code>
      </gmd:MD_Identifier>
      </gmd:identifier>
EOF

    xmlEdit="${xmlEdit//$'\n'/}"

    read -r -d '' xmlEdit << EOF
  {
  "condition": "count(gmd:identificationInfo/*/gmd:citation/*/gmd:identifier/*[gmd:code/*/text() = '$resourceId']) = 0",
  "xpath":"/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier[1]",
  "value":"<gn_add>${xmlEdit//\"/\\\"}</gn_add>"
  }
EOF

    echo $xmlEdit

    curl $AUTH  "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
      -X 'PUT' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "X-XSRF-TOKEN: $TOKEN" \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
      --data-raw "[$xmlEdit]" \
      --compressed
  done
done < addResourceIdentifier.csv
