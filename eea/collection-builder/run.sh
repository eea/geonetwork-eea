#
#rm -f /tmp/cookie;
#curl -s -c /tmp/cookie -o /dev/null -X POST "$CATALOG/srv/eng/info?type=me";
#export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
#
#curl -X POST -H "X-XSRF-TOKEN: $TOKEN" --user $CATALOGUSER:$CATALOGPASS -b /tmp/cookie \
#  "$CATALOG/srv/eng/info?type=me"
#
#curl -X POST -H "X-XSRF-TOKEN: $TOKEN" --user $CATALOGUSER:$CATALOGPASS -b /tmp/cookie \
#  -H "accept: application/json" -H "Content-Type: application/json"  -d "string" \
#  "$CATALOG/srv/api/search/records/_search?bucket=metadata"
#

TOKEN=8ad98c39-e5fc-487e-8f52-6b208a116caa
JSESSIONID=node0fh7km7bzwk3r1jtbcpecvgt3a3.node0
SERVER=http://localhost:8080/geonetwork
GROUP=1069871
AUTH=""
TPL=af56ba04-a514-4cdb-b7e4-1ebc4237f46b
#SERVER=https://galliwasp.eea.europa.eu/catalogue
#GROUP=1069869
#AUTH="-u test:test"

declare -A uuidMap

while IFS=";" read -r uuid cmsid unused; do
  if [[ -v "uuidMap["$cmsid"]" ]] ; then
    uuidMap["$cmsid"]="${uuidMap["$cmsid"]},$uuid"
  else
    uuidMap["$cmsid"]="$uuid"
  fi
done < "../dataandmaps/list.csv"



i=0
#while IFS=";" read -r title rid abstract uuids creation publication; do
while IFS=";" read -r title rid abstract uuids; do
  echo "____________________________________"
  echo "Processing #$i = $title ($rid) $uuids";

  uuidCsv=""

  IFS=', ' read -r -a listOfUuid <<< "$uuids"
  for uuid in "${listOfUuid[@]}"
  do
    if [[ -v "uuidMap["$uuid"]" ]] ; then
      uuidCsv="${uuidMap["$uuid"]},$uuidCsv"
    else
      uuidCsv="$uuid,$uuidCsv"
    fi
  done
  echo $uuidCsv


  echo "Clean selection:"
  curl $AUTH "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed


  UUID=$(curl $AUTH "$SERVER/srv/api/records/duplicate?metadataType=METADATA&sourceUuid=$TPL&isChildOfSource=false&group=$GROUP&allowEditGroupMembers=true&targetUuid=&hasCategoryOfSource=false" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw '{"headers":{"Accept":"application/json"}}' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed)
  echo "Id for serie is $UUID"

#  echo ${uuidMap[@]}
#  echo ${uuidMap["eea-data-and-maps-data-digital-elevation-model-of-europe"]}

  echo "Adding members to selection ..."
  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=${uuidCsv//,/&uuid=}" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Update series from member information ..."
  curl $AUTH "$SERVER/srv/api/records/$UUID/processes/collection-updater?newProductMemberUuids=$uuidCsv" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo "Clean selection:"
  curl $AUTH "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Get XML to find UUID ..."
  curl $AUTH "$SERVER/srv/api/records/$UUID/formatters/xml" \
    -X 'GET' \
    -o "tmp.xml" \
    -H 'Accept: application/xml' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  SERIEUUID=$(xmllint --xpath "//*[local-name() = 'fileIdentifier']/*[local-name() = 'CharacterString']/text()" tmp.xml)

  echo "UUID for serie is $SERIEUUID"

  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=$SERIEUUID" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Update title, abstract and date..."
  abstract=${abstract//\"/\'}
  abstract=${abstract//&/&amp;}
  echo "title: $title"
  echo "abstract: $abstract"
  curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:title/gco:CharacterString\",\"value\":\"<gn_replace>$title</gn_replace>\"},{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier/*/gmd:code/gco:CharacterString\",\"value\":\"<gn_replace>$rid</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:abstract/gco:CharacterString\",\"value\":\"<gn_replace>${abstract//#/\\n}</gn_replace>\"}]" \
    --compressed
# With creation and publication date
#--data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:title/gco:CharacterString\",\"value\":\"<gn_replace>$title</gn_replace>\"},{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:data/*[gmd:dateType/*/@codeListValue = 'creation']/gmd:date/gco:Date\",\"value\":\"<gn_replace>$creation</gn_replace>\"},{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:data/*[gmd:dateType/*/@codeListValue = 'publication']/gmd:date/gco:Date\",\"value\":\"<gn_replace>$publication</gn_replace>\"},
#    {\"xpath\":\"/gmd:identificationInfo/*/gmd:abstract/gco:CharacterString\",\"value\":\"<gn_replace>${abstract//#/\\n}</gn_replace>\"}]" \

  curl $AUTH "$SERVER/srv/api/records/sharing?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Accept-Language: eng' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "{\"clear\":false,\"privileges\":[{\"group\":1,\"operations\":{\"view\":true}},{\"group\":0,\"operations\":{}},{\"group\":$GROUP,\"operations\":{\"view\":true,\"download\":true,\"dynamic\":true,\"notify\":true,\"editing\":true}}]}" \
    --compressed

    ((i=i+1))
done < listsimple.csv


