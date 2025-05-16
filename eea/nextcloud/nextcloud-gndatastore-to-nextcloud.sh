#!/bin/bash
# Move GeoNetwork datastore content to Nextcloud
# Base directories
OLDCATALOGUE_DIR="/tmp/metadata_data"
NEWCATALOGUE_DIR="/tmp/cataloguestore/metadata_data"

source ../connect.sh

QUERY="+isHarvested:false"
FROM=0
SIZE=5000

# Function to pad a number with leading zeros
pad() {
  printf "%03d" "$1"
}

read -r -d '' ESQUERY << EOF
{
  "from":${FROM},
  "size":${SIZE},
  "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
  "_source":{"includes":["uuid", "id"]}
}
EOF

RAWQUERY=`echo ${ESQUERY}`

curl $AUTH  "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --data-raw "$RAWQUERY" \
  --compressed \
  -o results.json

rm nextcloud-gndatastore-to-nextcloud.log

read -p "Press enter to continue"

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  id=$(_jq '._source.id')
  uuid=$(_jq '._id')

  group=$(pad $((id / 100)))
  groupDir="${group}00-${group}99"

  echo "$uuid;$id;$groupDir" >> nextcloud-gndatastore-to-nextcloud.log
  echo "Create metadata folder /cataloguestore/metadata_data/$uuid\n"
  if [ ! -d "$NEWCATALOGUE_DIR/$uuid" ]; then
    mkdir -p "$NEWCATALOGUE_DIR/$uuid"
  fi
  echo "Moving content from $groupDir/$id\n"
  if [ -d "$OLDCATALOGUE_DIR/$groupDir/$id" ]; then
    mv $OLDCATALOGUE_DIR/$groupDir/$id/* $NEWCATALOGUE_DIR/$uuid/.
  else
    echo "Source folder $OLDCATALOGUE_DIR/$groupDir/$id does not exist. Skipping."
  fi
done
