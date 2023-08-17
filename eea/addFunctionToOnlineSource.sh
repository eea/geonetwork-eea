#!/bin/bash

SERVER=http://localhost:8080/geonetwork
CATALOGUSER=
CATALOGPASS=
#AUTH="-u $CATALOGUSER:$CATALOGPASS"
AUTH=""


rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET  \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

curl "$SERVER/srv/api/me" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID"


curl $AUTH "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --data-raw '{"from":0,"size":1800,"sort":["uuid"],"query":{"query_string":{"query":"+isHarvested:false +resourceType:(dataset OR nonGeographicDataset) +linkUrl:/.*sdi.eea.europa.eu.*/","default_operator":"AND"}},"_source":{"includes":["uuid","resourceTitleObject*"]},"track_total_hits":true}' \
  --compressed \
  -o results.json

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id')
  echo "$uuid / $title\n"
  functionXml=""

read -r -d '' functionXml << EOF
      <gmd:function xmlns:gmd="http://www.isotc211.org/2005/gmd">
        <gmd:CI_OnLineFunctionCode codeList="https://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                   codeListValue="download" />
      </gmd:function>
EOF

  functionXml="${functionXml//$'\n'/}"

  read -r -d '' functionXml << EOF
{
"condition": "count(gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*[(starts-with(gmd:linkage/*/text(), 'https://sdi.eea.europa.eu/webdav') or starts-with(gmd:linkage/*/text(), 'https://sdi.eea.europa.eu/data')) and not(gmd:function)]) > 0",
"xpath":"/gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine/*[(starts-with(gmd:linkage/*/text(), 'https://sdi.eea.europa.eu/webdav') or starts-with(gmd:linkage/*/text(), 'https://sdi.eea.europa.eu/data')) and not(gmd:function)]",
"value":"<gn_add>${functionXml//\"/\\\"}</gn_add>"
}
EOF

  echo $functionXml

  curl $AUTH "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[$functionXml]" \
    --compressed
done


