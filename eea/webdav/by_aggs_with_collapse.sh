#!/usr/bin/bash

SERVER=https://sdi.eea.europa.eu/catalogue
CATALOGUSER=
CATALOGPASS=

rm /tmp/byagg_aggs.json
rm /tmp/byagg_records.json
rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

echo "Using session with $TOKEN and id $JSESSIONID"

FIELD="th_eea-topics.default"
FIELD_DIR="Topics"
FIELD="th_httpinspireeceuropaeutheme-theme_tree.default"
FIELD_DIR="INSPIRE themes"
FIELD="th_regions_tree.default"
FIELD_DIR="Regions"
FIELD_AGG_OPTIONS=", \"include\": \"Europe.*|EEA.*|EU.*\""



curl "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" -s \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --compressed \
  -o /tmp/byagg_aggs.json \
  --data-binary @- << EOF
{
  "from":0,
  "size":0,
  "sort": ["_score"],
  "collapse": {
    "field": "$FIELD",
    "inner_hits": {
      "name": "by_location",
      "collapse": { "field": "user.id" },
      "size": 3
    }
  }
  "aggregations":{
    "by": {
      "terms": {"field": "$FIELD", "size": 100$FIELD_AGG_OPTIONS}
    }
  },
  "track_total_hits":true
}
EOF


BY_DIR=by
mkdir -p "$BY_DIR/$FIELD_DIR"
for bucket in $(jq -r '.aggregations.by.buckets[] | @base64' /tmp/byagg_aggs.json); do
     _jq() {
       echo "${bucket}" | base64 --decode | jq -r "${1}"
      }
    key=$(_jq '.key')
    docCount=$(_jq '.doc_count')
    echo "Processing bucket $key ($docCount)"
    mkdir -p "$BY_DIR/$FIELD_DIR/$key"

    rm /tmp/byagg_records.json
    curl "$SERVER/srv/api/search/records/_search?bucket=s101" \
      -H 'accept: application/json, text/plain, */*' \
      -H 'accept-language: eng' \
      -H "X-XSRF-TOKEN: $TOKEN" -s \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      -H 'content-type: application/json;charset=UTF-8' \
      --data-raw "{\"from\":0,\"size\":1600,\"sort\":[\"_score\"],\"query\":{\"query_string\": {\"query\": \"$FIELD:\\\"$key\\\"\"}},\"_source\":{\"includes\":[\"uuid\",\"resourceTitleObject*\", \"resourceIdentifier.code\"]},\"track_total_hits\":true}" \
      --compressed \
      -o /tmp/byagg_records.json

    for hit in $(jq -r '.hits.hits[] | @base64' /tmp/byagg_records.json); do
         _jq() {
           echo "${hit}" | base64 --decode | jq -r "${1}"
          }

        title=$(_jq '._source.resourceTitleObject.default')
        resourceIdentifier=$(_jq '._source.resourceIdentifier[0].code')
        uuid=$(_jq '._id')
        echo $title $uuid $resourceIdentifier
        mkdir -p "$BY_DIR/$FIELD_DIR/$key/$resourceIdentifier"
        # TODO: create symlink to
    done
done
