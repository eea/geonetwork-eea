
TOKEN=8ad98c39-e5fc-487e-8f52-6b208a116caa
TOKEN=9ab46ed8-b98c-4a96-97b1-33ae87b9d6d6
JSESSIONID=node0cvd3cb6d0rr2vuv59fpv2nik1.node0
JSESSIONID=node01iz4xt7ow9mfr1jjhw7tkjc7tr9.node0
GROUP=1069870
GROUP=1069869
TPL=af56ba04-a514-4cdb-b7e4-1ebc4237f46b
SERVER=http://localhost:8080/geonetwork
SERVER=https://galliwasp.eea.europa.eu/catalogue
i=0
AUTH=
while IFS=";" read -r title uuids abstract; do
  echo "____________________________________"
  echo "Processing #$i = $title  $uuids";

  echo "Clean selection:"
  curl -u "$AUTH" "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed


  UUID=$(curl -u "$AUTH" "$SERVER/srv/api/records/duplicate?metadataType=METADATA&sourceUuid=$TPL&isChildOfSource=false&group=1069869&allowEditGroupMembers=true&targetUuid=&hasCategoryOfSource=false" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw '{"headers":{"Accept":"application/json"}}' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed)
  echo "Id for serie is $UUID"

  echo "Adding members to selection ..."
  curl -u "$AUTH" "$SERVER/srv/api/selections/s101?uuid=${uuids//,/&uuid=}" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Update series from member information ..."
  curl -u "$AUTH" "$SERVER/srv/api/records/$UUID/processes/collection-updater?newProductMemberUuids=$uuids" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo "Clean selection:"
  curl -u "$AUTH" "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Get XML to find UUID ..."
  curl -u "$AUTH" "$SERVER/srv/api/records/$UUID/formatters/xml" \
    -X 'GET' \
    -o "tmp.xml" \
    -H 'Accept: application/xml' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  SERIEUUID=$(xmllint --xpath "//*[local-name() = 'fileIdentifier']/*[local-name() = 'CharacterString']/text()" tmp.xml)

  echo "UUID for serie is $SERIEUUID"

  curl -u "$AUTH" "$SERVER/srv/api/selections/s101?uuid=$SERIEUUID" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo "Update title..."
  curl -u "$AUTH" "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:title/gco:CharacterString\",\"value\":\"<gn_replace>$title</gn_replace>\"},
    {\"xpath\":\"/gmd:identificationInfo/*/gmd:abstract/gco:CharacterString\",\"value\":\"<gn_replace>${abstract//#/\\n}</gn_replace>\"}]" \
    --compressed

  curl -u "$AUTH" "$SERVER/srv/api/records/sharing?bucket=s101" \
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


