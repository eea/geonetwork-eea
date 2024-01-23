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
#FIELD="th_httpinspireeceuropaeutheme-theme_tree.default"
#FIELD_DIR="INSPIRE themes"
#FIELD="th_rod-eionet-europa-eu.default"
#FIELD_DIR="Reporting obligations"
#FIELD="th_regions_tree.default"
#FIELD_DIR="Regions"
#FIELD_AGG_OPTIONS=", \"include\": \"Europe.*|EEA.*|EU.*\""
#hits.hits[0]._source["th_httpinspireeceuropaeumetadatacodelistSpatialScope-SpatialScope"]
#hits.hits[0]._source["th_rod-eionet-europa-eu"]

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
  "aggregations":{
    "by": {
      "terms": {"field": "$FIELD", "size": 100, "missing": "_missing_" $FIELD_AGG_OPTIONS}
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

    if [ "$key" == "_missing_" ]; then
      QUERY="-_exists_:$FIELD"
    else
      QUERY="$FIELD:\\\"$key\\\""
    fi
    echo "  Query $QUERY"

    rm /tmp/byagg_records.json
    curl "$SERVER/srv/api/search/records/_search?bucket=s101" \
      -H 'accept: application/json, text/plain, */*' \
      -H 'accept-language: eng' \
      -H "X-XSRF-TOKEN: $TOKEN" -s \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      -H 'content-type: application/json;charset=UTF-8' \
      --compressed \
      -o /tmp/byagg_records.json \
      --data-binary @- << EOF
{
  "from":0,
  "size":1600,
  "sort": ["_score"],
  "query": {
    "query_string": {
      "query": "$QUERY -isHarvested:true"
    }
  },
  "_source": {
    "includes": ["uuid", "resourceTitleObject*", "resourceIdentifier.code"]
  },
  "track_total_hits": true
}
EOF

    for hit in $(jq -r '.hits.hits[] | @base64' /tmp/byagg_records.json); do
         _jq() {
           echo "${hit}" | base64 --decode | jq -r "${1}"
          }

        title=$(_jq '._source.resourceTitleObject.default')
        resourceIdentifier=$(_jq '._source.resourceIdentifier[0].code')
        uuid=$(_jq '._id')
        echo $title $uuid $resourceIdentifier
        if [[ "$resourceIdentifier" =~ .*_i_.* ]]; then
          ACCESSFOLDER="internal"
        else
          ACCESSFOLDER="public"
        fi


        #mkdir -p "$BY_DIR/$FIELD_DIR/$key/$resourceIdentifier"
        ln -s "$BY_DIR/$FIELD_DIR/$key/$resourceIdentifier" "/catalogue_data/$ACCESSFOLDER/$resourceIdentifier"
    done
done
