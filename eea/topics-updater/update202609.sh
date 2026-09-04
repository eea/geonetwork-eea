
TOKEN=caf1485a-59ed-49fd-a168-657263f6b25b
GNSESSIONID=43BE793FF5211D7A95929AF065E50DC7
JSESSIONID=node072jd7qdnig9fst3pdrzhzlee22.node0

SERVER=http://localhost:8282/geonetwork
AUTH=""

keywordActions=()

echo "____________________________________"
echo "Building action ...";
while IFS=";" read -r newTopic newTopicUrl oldTopic; do
  echo " * ${oldTopic} > ${newTopic} (${newTopicUrl})"

  newTopicSnippet="<mri:keyword xmlns:mri='http://standards.iso.org/iso/19115/-3/mri/1.0' xmlns:gcx='http://standards.iso.org/iso/19115/-3/gcx/1.0' xmlns:xlink='http://www.w3.org/1999/xlink' ><gcx:Anchor xlink:href='${newTopicUrl}'>${newTopic}</gcx:Anchor></mri:keyword>"

  # Add new topic first, then delete old one
  read -r -d '' entry << EOF
  {
  "condition": "count(mdb:identificationInfo/*/mri:descriptiveKeywords/*[mri:thesaurusName/*/cit:title/*/text() = 'EEA topics']/mri:keyword[*/text() = '${oldTopic}']) > 0",
  "xpath":"/mdb:identificationInfo/*/mri:descriptiveKeywords/*[mri:thesaurusName/*/cit:title/*/text() = 'EEA topics']",
  "value":"<gn_add>${newTopicSnippet//\"/\\\"}</gn_add>"
  },{
  "condition": "count(mdb:identificationInfo/*/mri:descriptiveKeywords/*[mri:thesaurusName/*/cit:title/*/text() = 'EEA topics']/mri:keyword/*[not(starts-with(@xlink:href, 'https://www.eea.europa.eu/en/topics/in-depth')) and text() = '${oldTopic}']) > 0",
  "xpath":"/mdb:identificationInfo/*/mri:descriptiveKeywords/*[mri:thesaurusName/*/cit:title/*/text() = 'EEA topics']/mri:keyword[*/text() = '${oldTopic}' and (count(*/@xlink:href) = 0 or not(starts-with(*/@xlink:href, 'https://www.eea.europa.eu/en/topics/in-depth')))]",
  "value":"<gn_delete/>"
  }
EOF
  keywordActions+=("$entry")

done < oldvsnew202609.csv

keywordAction=$(IFS=,; echo "${keywordActions[*]}")

#echo "____________________________________"
#echo ${keywordAction}
#echo "____________________________________"

echo "Update records with batch editing"

QUERY="_exists_:th_eea-topics"
#QUERY="+uuid:\"3cba3946-2f1c-48eb-9ede-dfc476f0f17f\""
FROM=0
SIZE=4000

read -r -d '' ESQUERY << EOF
{
  "from":${FROM},
  "size":${SIZE},
  "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
  "_source":{"includes":["uuid", "resourceTitleObject*"]}
}
EOF

RAWQUERY=`echo ${ESQUERY}`

curl $AUTH  "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
  -H 'content-type: application/json;charset=UTF-8' \
  --data-raw "$RAWQUERY" \
  --compressed \
  -o results.json

read -p "Press enter to continue"

for hit in $(jq -r '.hits.hits[] | @base64' results.json); do
   _jq() {
     echo "${hit}" | base64 --decode | jq -r "${1}"
    }

  title=$(_jq '._source.resourceTitleObject.default')
  uuid=$(_jq '._id')
  echo "$uuid / $title\n"
  batchEditXml="${keywordAction//$'\n'/}"

  #echo $batchEditXml

  curl $AUTH  "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID; GNSESSIONID=$GNSESSIONID" \
    --data-raw "[$batchEditXml]" \
    --compressed
done
