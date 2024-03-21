#SERVER=http://localhost:8080/geonetwork
#SERVER=https://sdi.eea.europa.eu/catalogue
SERVER=https://galliwasp.eea.europa.eu/catalogue
CATALOGUSER=
CATALOGPASS=
AUTH="-u $CATALOGUSER:$CATALOGPASS"
#AUTH=""


type=series
from=0
size=1000

rm results.json
rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

echo "Using session with $TOKEN and id $JSESSIONID"

curl $AUTH "$SERVER/srv/api/search/records/_search" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw "{\"query\":{\"query_string\":{\"query\": \"+isHarvested:false +resourceType: $type\"}},\"from\":$from, \"size\":$size, \"_source\": {\"include\": [\"resourceTitleObject.default\"]}, \"sort\": [{\"resourceTitleObject.default.keyword\": \"asc\"}]}" \
    -H "X-XSRF-TOKEN: $TOKEN" -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed \
    -o results.json

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id')
  echo "__________"
  echo "### $uuid"

  curl $AUTH "$SERVER/srv/api/records/$uuid/processes/collection-updater" \
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

  curl $AUTH "$SERVER/srv/api/selections/s101?uuid=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/javascript, */*; q=0.01' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --compressed

  curl $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[{\"xpath\":\"/gmd:identificationInfo/*/gmd:citation/*/gmd:identifier[position() > 2]\",\"value\":\"<gn_delete/>\"}]" \
    --compressed
done;

