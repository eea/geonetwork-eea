#!/bin/bash

source ../connect.sh

i=0
while IFS="|" read -r uuid abstract lineage; do
  echo "____________________________________"
  echo "Processing #$i = $uuid)";

  abstract=${abstract//\"/\'}
  abstract=${abstract//&/&amp;}
  lineage=${lineage//\"/\'}
  lineage=${lineage//&/&amp;}

  curl $AUTH "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
    --data-raw "[
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:abstract/gco:CharacterString\",\"value\":\"<gn_replace>${abstract//#/\\n}</gn_replace>\"},
    {\"xpath\":\"/gmd:dataQualityInfo/*/gmd:lineage/*/gmd:statement/gco:CharacterString\",\"value\":\"<gn_replace>${lineage//#/\\n}</gn_replace>\"}
    ]" \
    --compressed

    ((i=i+1))
done < changes.csv


