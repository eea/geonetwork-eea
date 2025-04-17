#!/bin/bash

export SERVER=${1:-http://localhost:8080/geonetwork}
export CATALOGUSER=${2:-username}
export CATALOGPASS=${3:-"password"}
export AUTH="-u "$CATALOGUSER:$CATALOGPASS""

echo "Calling API on $SERVER with user $CATALOGUSER."

rm -f /tmp/cookie;
curl -s -c /tmp/cookie -o /dev/null \
  $AUTH -X GET  \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;
echo "Connected with user token $TOKEN (session id: $JSESSIONID)."


QUERY="+uuid:(fc50843a-957b-4026-8724-b6e275ed3130 OR 2a11c7b8-2185-443c-9994-5b51fea0d145 OR 93bdceca-30b6-41e8-94d8-f1d5f09eaa62 OR 511912cb-8707-4930-ace5-97984cd6f1b6 OR 421ade70-9b3e-482c-ab4c-1d06a8521c1c OR 7086954b-3013-4dc2-b355-4777b48f1ab5 OR e1a2e2d2-8a3b-4ad2-b06a-b891229adcbf OR fa304e7c-771c-4ffb-b0f4-7e302a0d5081 OR 746959e1-aad1-437a-a02d-bd4990a995c7 OR 92795ea8-9544-43e3-bfff-14ffbeb7d14a OR 69a44d4d-ef2c-4ae3-bf38-ff9f565252e0 OR 75d67d3e-6a39-491a-af4c-70e678a18b9b OR 9db29b07-5968-4ce0-8351-1e356b3d7d47 OR 5453c92f-3d01-4407-99bc-4659cfc7661d OR 114e8cae-1cd7-4adc-8c5f-a04863fc6af9 OR 0b6254bb-4c7d-41d9-8eae-c43b05ab2965 OR 9da6ca39-043a-4bdd-8d0a-41a7bed6e439 OR 1d25633a-6bcb-49cc-a6a6-ebc5c7b360a3 OR 660d00f1-c6de-4db6-9979-0be124ceb7f0 OR 067d9ac0-69a4-415c-99b1-67af316de75d OR 4605463b-7150-49c6-9b45-01bf542891a9 OR e677441e-fb94-431c-b4f9-304f10e4dfd8 OR f9df356a-e0ff-48a5-85b0-4cf870a5a610 OR 82f93572-9888-47ef-97a1-5cac5985a26a OR 4dc35722-09ce-427f-9a1b-775a8640da27 OR 77873ff3-4edf-48d4-94cd-c5b7b61da29e OR fa26a003-3cdf-490b-a491-7abe02968223 OR b10cfb80-38c3-4c73-a4ce-1188393af423 OR ecdf6169-e330-4f02-8e12-083a1e1d24e7 OR bcc329c2-0676-40f5-bb62-91d36f956355)"
FROM=0
SIZE=1000

read -r -d '' ESQUERY << EOF
{
  "from":${FROM},
  "size":${SIZE},
  "query":{"query_string":{"query":"${QUERY//\"/\\\"}"}},
  "_source":{"includes":["uuid", "resourceTitleObject*", "resourceAbstractObject*"]}
}
EOF

RAWQUERY=`echo ${ESQUERY}`

echo "Query:"
echo $RAWQUERY
echo $SERVER

curl $AUTH  "$SERVER/srv/api/search/records/_search?bucket=s101" \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: eng' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
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
  abstract=$(_jq '._source.resourceAbstractObject.default')
  uuid=$(_jq '._id')
  echo "$uuid / $title\n"
  echo "$abstract\n"
  functionXml=""

read -r -d '' functionXml << EOF
   <gmd:maintenanceAndUpdateFrequency  xmlns:gmd="http://www.isotc211.org/2005/gmd" xmlns:gco="http://www.isotc211.org/2005/gco">
       <gmd:MD_MaintenanceFrequencyCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_MaintenanceFrequencyCode"
                                        codeListValue="asNeeded"/>
     </gmd:maintenanceAndUpdateFrequency>
EOF

  functionXml="${functionXml//$'\n'/}"

  read -r -d '' functionXml << EOF
{
"xpath":"gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency",
"value":"<gn_delete>"
},
{
"xpath":"gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency",
"value":"<gn_add>${functionXml//\"/\\\"}</gn_add>"
},
 {
 "xpath":"gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString",
 "value":"${abstract//$'\n'/\\n}\\n\\nThis dataset includes data from the French Overseas Territories (DOMs)"
 }
EOF

  echo $functionXml

  curl $AUTH  "$SERVER/srv/api/records/batchediting?uuids=$uuid" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[$functionXml]" \
    --compressed
done
