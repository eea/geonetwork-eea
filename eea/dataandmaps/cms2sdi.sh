curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+DISTINCT+%3Fs%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Fo+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FData%23Data%3E+.%0D%0A++FILTER+NOT+EXISTS+%7B+%3Fs+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FisReplacedBy%3E+%3FisReplacedBy+.+%7D%0D%0A%7D&format=application%2Fsparql-results%2Bjson&nrOfHits=20&execute=Execute' --output eea-data.json

TOKEN=8ad98c39-e5fc-487e-8f52-6b208a116caa
JSESSIONID=node0fh7km7bzwk3r1jtbcpecvgt3a3.node0
SERVER=http://localhost:8080/geonetwork
AUTH=""
#GROUP=1069870
GROUP=1069869
TMPGROUP=1069871

mkdir data
cd data
mkdir tmp

readarray -t existingRecords < ../existing.csv

# Create one SDI entry per CMS entry
for url in $(jq '.results.bindings[].s.value' ../eea-data.json); do
  #"http://www.eea.europa.eu/data-and-maps/data/beat-integrated-classification-of-biodiversity"
  echo "____________________________________"
  echo $url
  uuid=$(sed -E "s/.*data-and-maps\/data\/(.*)\"/\1/g" <<< $url)
  echo $uuid

  if [[ " ${existingRecords[*]} " =~ " ${uuid} " ]]; then
    echo "Skip existing record $uuid"
  else
    url=$(sed -E "s/\"(.*)\"/\1/g" <<< $url)
    echo "Download data from $url with uuid $uuid ..."
#    curl "$url/@@rdf" --output "$uuid.rdf"
  fi
done


i=0
while IFS=";" read -r uuid cmsid type action resourceid year final; do
  echo ""
  echo "____________________________________"
  echo "Processing #$i = $cmsid > $uuid ($type), $action, $year";

  filename=$(sed -E "s/eea-data-and-maps-data-(.*)/\1/g" <<< $cmsid)
  echo "Importing CMS record from file $filename.rdf"
  curl "$SERVER/srv/api/records" -X POST \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H 'Content-Type: multipart/form-data' \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    -F "metadataType=METADATA" -F "uuidProcessing=OVERWRITE" \
    -F "transformWith=EEARDF-to-ISO19139" -F "group=$TMPGROUP" -F "file=@$filename.rdf"

  curl "$SERVER/srv/api/records/$cmsid/formatters/xml"  \
         -H 'Accept: application/xml' \
         -H "X-XSRF-TOKEN: $TOKEN" \
         -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
         --output tmp/$cmsid.xml

  echo ""
  echo "Create new record with random UUID"
  sed -i "s/$cmsid/$uuid/g" tmp/$cmsid.xml

  echo "Importing new record"
  curl "$SERVER/srv/api/records" -X POST \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H 'Content-Type: multipart/form-data' \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    -F "metadataType=METADATA" -F "uuidProcessing=OVERWRITE" \
    -F "group=$TMPGROUP" -F "file=@tmp/$cmsid.xml"


  curl $AUTH "$SERVER/srv/api/selections/s101" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed
  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed


  if [ "$type" == "Geospatial" ]; then
    echo ""
    echo "Set type as dataset (not tabular) ..."
    curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
      -X 'PUT' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "X-XSRF-TOKEN: $TOKEN" \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      --data-raw "[{\"xpath\":\"/gmd:hierarchyLevel\",\"value\":\"<gn_replace><gmd:MD_ScopeCode xmlns:gmd=\\\"http://www.isotc211.org/2005/gmd\\\" codeList=\\\"http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_ScopeCode\\\" codeListValue=\\\"dataset\\\"/></gn_replace>\"}]" \
        --compressed
  fi


  echo ""
  echo "Set SDI resource identifier ..."
  curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*\",\"value\":\"<gn_add><gmd:identifier xmlns:gmd=\\\"http://www.isotc211.org/2005/gmd\\\"  xmlns:gco=\\\"http://www.isotc211.org/2005/gco\\\" ><gmd:MD_Identifier><gmd:code><gco:CharacterString>$resourceid</gco:CharacterString></gmd:code></gmd:MD_Identifier></gmd:identifier></gn_add>\"}]" \
      --compressed

  if [ "$action" == "1 to N" ]; then
    echo ""
    recordTitle=$(xmllint --xpath "//*[local-name() = 'identificationInfo']/*/*[local-name() = 'citation']/*/*[local-name() = 'title']/*[local-name() = 'CharacterString']/text()" tmp/$cmsid.xml)

    xpath=$(echo "not(contains(*/gmd:linkage/gmd:URL/text(), '$year'))")
    if [ "$final" == "-prov" ]; then
      recordTitle=$(echo "$recordTitle - Provisional data")
      xpath=$(echo "$xpath or (contains(*/gmd:linkage/gmd:URL/text(), '$year') and contains(*/gmd:linkage/gmd:URL/text(), '$final'))")
    fi
    if [ "$final" == "-final" ]; then
      recordTitle=$(echo "$recordTitle - Final data")
      xpath=$(echo "$xpath or (contains(*/gmd:linkage/gmd:URL/text(), '$year') and contains(*/gmd:linkage/gmd:URL/text(), '$final'))")
    fi

    recordTitle=$(echo "$recordTitle, $year")

    echo "Updating title with $recordTitle, removing linkage not targeting year $year"
    curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
      -X 'PUT' \
      -H 'Accept: application/json, text/plain, */*' \
      -H 'Content-Type: application/json;charset=UTF-8' \
      -H "X-XSRF-TOKEN: $TOKEN" \
      -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
      --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:title/gco:CharacterString\",\"value\":\"<gn_replace>$recordTitle</gn_replace>\"},{\"xpath\":\".//gmd:onLine[$xpath]\",\"value\":\"<gn_delete/>\"}]" \
        --compressed


    # TODO: Once in datashare, change link to point to datashare instead of CMS
  fi
done < ../listsimple.csv


echo "____________________________________"
echo "Delete template record"
for url in $(jq '.results.bindings[].s.value' ../eea-data.json); do
  uuid=$(sed -E "s/.*data-and-maps\/data\/(.*)\"/\1/g" <<< $url)
  uuid=$(echo "eea-data-and-maps-data-$uuid")

  if [[ " ${existingRecords[*]} " != " ${uuid} " ]]; then
    echo "Removing $uuid"
    curl "$SERVER/srv/api/records/$uuid" -X DELETE \
         -H 'Accept: application/xml' \
         -H "X-XSRF-TOKEN: $TOKEN" \
         -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
         --output tmp/$cmsid.xml
  fi
done
