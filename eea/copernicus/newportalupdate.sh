#SERVER=http://localhost:8080/geonetwork
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

while IFS=";" read -r uuid newurl newdownloadurl oldurl olddownloadurl; do
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

  read -r -d '' xmlSnippet << EOF
  <gn_add><gmd:onLine xmlns:gmd="http://www.isotc211.org/2005/gmd"
                      xmlns:gco="http://www.isotc211.org/2005/gco">
            <gmd:CI_OnlineResource>
              <gmd:linkage>
                <gmd:URL>$newdownloadurl</gmd:URL>
              </gmd:linkage>
              <gmd:protocol>
                <gco:CharacterString>WWW:LINK-1.0-http--link</gco:CharacterString>
              </gmd:protocol>
              <gmd:name>
                <gco:CharacterString>Download (requires authentication)</gco:CharacterString>
              </gmd:name>
              <gmd:function>
                  <gmd:CI_OnLineFunctionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#CI_OnLineFunctionCode"
                                             codeListValue="download"/>
               </gmd:function>
            </gmd:CI_OnlineResource>
          </gmd:onLine></gn_add>
EOF
  xmlSnippetWithNoNewLine="${xmlSnippet//$'\n'/}"
  read -r -d '' batchEditConfig << EOF
    {
      "xpath":"/gmd:distributionInfo/*/gmd:transferOptions/*/gmd:onLine[*/gmd:name/* = 'Download (requires authentication)']",
      "value":"<gn_delete/>"
    },
    {
      "xpath":"/gmd:distributionInfo[1]/*/gmd:transferOptions[1]/*",
      "value":"${xmlSnippetWithNoNewLine//\"/\\\"}"
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
done < list.csv
