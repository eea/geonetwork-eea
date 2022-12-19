SERVER=https://sdi.eea.europa.eu/catalogue
AUTH=""

#type=nonGeographicDataset
type=dataset
from=0
size=1000

rm results.json
rm orphan$type.csv

curl $AUTH "$SERVER/srv/api/search/records/_search?relatedType=parent" \
    -X 'POST' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw "{\"query\":{\"query_string\":{\"query\": \"+isHarvested:false -cl_status.key:(superseded OR obsolete) +resourceType: $type\"}},\"from\":$from, \"size\":$size, \"_source\": {\"include\": [\"resourceTitleObject.default\", \"resourceIdentifier.code\"]}, \"sort\": [{\"resourceTitleObject.default.keyword\": \"asc\"}]}" \
    --compressed \
    -o results.json

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  code=$(_jq '._source.resourceIdentifier[0].code')
  uuid=$(_jq '._id')
  related=$(_jq '.related.parent | length')
  if [ "$related" = "0" ]; then
    echo "$title;$uuid;$code;$related parent." >> orphan$type.csv
  fi
done;

