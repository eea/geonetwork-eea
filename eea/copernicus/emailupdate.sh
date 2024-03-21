#SERVER=http://localhost:8080/geonetwork
SERVER=https://sdi.eea.europa.eu/catalogue
CATALOGUSER=
CATALOGPASS=
AUTH="-u $CATALOGUSER:$CATALOGPASS"

rm -f /tmp/cookie;
curl -s -c /tmp/cookie -o /dev/null \
  -X GET -v \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

echo "Using session with $TOKEN and id $JSESSIONID"

while IFS=";" read -r uuid; do
  echo ""
  echo "____________________________________"
  echo "$uuid"

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

  read -r -d '' batchEditConfig << EOF
    {
      "xpath":".//gmd:pointOfContact[gmd:CI_ResponsibleParty/gmd:contactInfo/*/gmd:address/*/gmd:electronicMailAddress/gco:CharacterString = 'copernicus@eea.europa.eu']/@gco:nilReason[. = 'withheld']",
      "value":"<gn_delete/>"
    }
EOF

  curl -v $AUTH "$SERVER/srv/api/records/batchediting?bucket=s101" \
    -X 'PUT' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Content-Type: application/json;charset=UTF-8' \
    -H "X-XSRF-TOKEN: $TOKEN" \
    -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
    --data-raw "[${batchEditConfig//\\n/}]" \
    --compressed
done < email.csv
