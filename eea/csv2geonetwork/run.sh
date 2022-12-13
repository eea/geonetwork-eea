
TOKEN=ddf6c822-1330-4d59-8ff6-f5f732a60cad
JSESSIONID=node01khn5z8yqafo51uosaptpvg8u31.node0
SERVER=http://localhost:8080/geonetwork
AUTH=""

GROUP=1069872

i=0
while IFS=";" read -r title abstract temporalextent resourceidentifier spatialresolution uuidtoclone parentuuid; do
  echo "____________________________________"
  echo "Processing #$i = $title ($resourceidentifier)";

  INTERNALID=$(curl $AUTH "$SERVER/srv/api/records/duplicate?metadataType=METADATA&sourceUuid=$uuidtoclone&isChildOfSource=false&group=$GROUP&allowEditGroupMembers=true&targetUuid=&hasCategoryOfSource=false" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw '{"headers":{"Accept":"application/json"}}' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed)
  echo "Id for new record is $INTERNALID"



  echo "Clean selection:"
  curl $AUTH "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Get XML to find UUID ..."
  curl $AUTH "$SERVER/srv/api/records/$INTERNALID/formatters/xml" \
    -X 'GET' \
    -o "tmp.xml" \
    -H 'Accept: application/xml' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  UUID=$(xmllint --xpath "//*[local-name() = 'fileIdentifier']/*[local-name() = 'CharacterString']/text()" tmp.xml)

  echo "UUID is $UUID"

  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=$UUID" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed



  echo ""
  echo "Update title, abstract and date..."
  abstract=${abstract//\"/\'}
  abstract=${abstract//&/&amp;}
  te=($temporalextent)
  OLDIFS="$IFS"
  IFS='-' begin=(${te[0]})
  IFS='-' end=(${te[1]})
  IFS="$OLDIFS"

  curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:title/gco:CharacterString\",\"value\":\"<gn_replace>$title</gn_replace>\"},{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier[1]/*/gmd:code/gco:CharacterString\",\"value\":\"<gn_replace>$resourceidentifier</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:abstract/gco:CharacterString\",\"value\":\"<gn_replace>${abstract//#/\\n}</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:extent/*/gmd:temporalElement/*/gmd:extent/*/gml:beginPosition\",\"value\":\"<gn_replace>${begin[2]}-${begin[1]}-${begin[0]}</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:extent/*/gmd:temporalElement/*/gmd:extent/*/gml:endPosition\",\"value\":\"<gn_replace>${end[2]}-${end[1]}-${end[0]}</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:spatialResolution/*/gmd:distance/gco:Distance\",\"value\":\"<gn_replace>${spatialresolution// km/}</gn_replace>\"}]" \
    --compressed


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
done < list.csv


