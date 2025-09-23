SERVER=https://sdi.eea.europa.eu/catalogue
AUTH=""

#type=nonGeographicDataset
type=dataset
from=0
size=1000

QUERY="+isHarvested:false -cl_status.key:(superseded OR obsolete) +resourceType: $type"

read -r -d '' ESQUERY << EOF
  {
    "from":${from},
    "size":${size},
    "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
    "sort": [{"resourceTitleObject.default.keyword": "asc"}],
    "_source":{"includes":["uuid", "resourceTitleObject*", "resourceIdentifier"]}
  }
EOF

  RAWQUERY=`echo ${ESQUERY}`

rm results.json
rm orphan$type.csv

curl $AUTH "$SERVER/srv/api/search/records/_search?relatedType=parent" \
    -X 'POST' \
    -H 'Accept: application/json' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    --data-raw "$RAWQUERY"  \
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

