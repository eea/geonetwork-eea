#!/bin/bash

export SERVER=${1:-https://galliwasp.eea.europa.eu/catalogue}
#export SERVER=${1:-http://localhost:8080/geonetwork}
export CATALOGUSER=${2:-default}
export CATALOGPASS=${3:-default}
export AUTH="-u $CATALOGUSER:$CATALOGPASS"

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
