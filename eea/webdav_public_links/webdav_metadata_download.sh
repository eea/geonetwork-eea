#!/usr/bin/bash

SERVER=https://sdi.eea.europa.eu/catalogue
CATALOGUSER=
CATALOGPASS=

rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

echo "Using session with $TOKEN and id $JSESSIONID"


function download_metadata () {
        RESOURCE_ID=$1
        TARGET_DIR=$2
        rm /tmp/results.json
        curl -s "$SERVER/srv/api/search/records/_search?bucket=s101" \
          -H 'accept: application/json, text/plain, */*' \
          -H 'accept-language: eng' \
          -H "X-XSRF-TOKEN: $TOKEN" \
          -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
          -H 'content-type: application/json;charset=UTF-8' \
          --data-raw "{\"from\":0,\"size\":1600,\"sort\":[\"_score\"],\"query\":{\"query_string\": {\"query\": \"resourceIdentifier.code:$RESOURCE_ID\"}},\"_source\":{\"includes\":[\"uuid\",\"resourceTitleObject*\"]},\"track_total_hits\":true}" \
          --compressed \
          -o /tmp/results.json

        count=$(jq -r '.hits.total.value' /tmp/results.json)

        if [ $count = "1" ]; then
          for hit in $(jq -r '.hits.hits[] | @base64' /tmp/results.json); do
               _jq() {
                 echo "${hit}" | base64 --decode | jq -r "${1}"
                }

              title=$(_jq '._source.resourceTitleObject.default')
              uuid=$(_jq '._id')
              echo $title $uuid
              curl -s  "$SERVER/srv/api/records/$uuid/formatters/xml" \
                -H 'accept: application/xml' \
                -H "X-XSRF-TOKEN: $TOKEN" \
                -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" -o "${TARGET_DIR}/$uuid.xml"
          done
        else
          echo "Record not found in the catalogue. ResourceId=$RESOURCE_ID"
          echo "$RESOURCE_ID" >> /tmp/not_known_resources.txt
        fi
}

echo "" > /tmp/not_known_resources.txt
for resource_id in $(find /var/local/gis_sdi/datastore/public -maxdepth 1); do
        download_metadata "$(basename $resource_id)" "${resource_id}"
done


for resource_id in $(find /var/local/gis_sdi/datastore/internal -maxdepth 1); do
        download_metadata "$(basename $resource_id)" "${resource_id}"
done