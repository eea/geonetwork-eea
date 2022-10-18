
TOKEN=ddf6c822-1330-4d59-8ff6-f5f732a60cad
JSESSIONID=node0co43cep32tsio2od7qpqgefc1.node0

SERVER=http://localhost:8080/geonetwork
AUTH=""

while IFS=";" read -r oldTopic newTopic newId; do
  echo "____________________________________"
  echo "Updating topic $oldTopic with $newTopic";

  echo " * Search record with $oldTopic"
  curl $AUTH "$SERVER/srv/api/search/records/_search?bucket=eeatopic" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw "{\"query\":{\"query_string\":{\"query\": \"th_eea-topics.default:\\\"$oldTopic\\\"\"}},\"size\":0}" \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo " * Cleanup selection"
  curl $AUTH "$SERVER/srv/api/selections/eeatopic" \
    -X 'DELETE' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  echo ""
  echo " * Add current search in selection"
  curl $AUTH "$SERVER/srv/api/selections/eeatopic" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed


  echo ""
  echo " * Batch"
  curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=eeatopic" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:MD_Metadata/gmd:identificationInfo/*/gmd:descriptiveKeywords/*[gmd:thesaurusName/*/gmd:identifier/*/gmd:code/*/text() = 'geonetwork.thesaurus.external.theme.eea-topics']/gmd:keyword[gmx:Anchor/text() = '$oldTopic']\",\"value\":\"<gn_replace><gmx:Anchor xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:gmx='http://www.isotc211.org/2005/gmx' xlink:href='https://www.eea.europa.eu/themes/$newId'>$newTopic</gmx:Anchor></gn_replace>\"}]" \
    --compressed

done < oldvsnew.csv


