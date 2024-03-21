
SERVER=http://localhost:8080/geonetwork
CATALOGUSER=
CATALOGPASS=
AUTH=""

rm results.json
rm -f /tmp/cookie;

curl -s -c /tmp/cookie -o /dev/null \
  -X GET  \
  --user $CATALOGUSER:$CATALOGPASS \
  -H "Accept: application/json" \
  "$SERVER/srv/api/me";

export TOKEN=`grep XSRF-TOKEN /tmp/cookie | cut -f 7`;
export JSESSIONID=`grep JSESSIONID /tmp/cookie | cut -f 7`;

echo "Using session with $TOKEN and id $JSESSIONID"

GROUP=1069874

rm fc.csv
for f in $(ls ../dataandmaps/data/*.rdf); do
  i=0
  echo $f
  for parts in $(xmllint --xpath "//*[local-name() = 'hasPart']/@*[local-name() = 'resource']" $f | grep -v ">" | cut -f 2 -d "=" | tr -d \"); do
    partFile=$(basename $f .rdf)-$i.rdf
    # curl -s "$parts/@@rdf" --output "fc2/$partFile"

    tableTitle=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'title']" fc2/$partFile)
    tableDesc=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'tableDefinition']" fc2/$partFile)

    tableDefinition=$(xmllint --xpath "//*[local-name() = 'tableDefinition']" fc2/$partFile)
    tableCmsId=$(xmllint --xpath "//*[local-name() = 'DataTable']/@*[local-name() = 'about']" fc2/$partFile)
    title=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'title']" fc2/$partFile)
    abs=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'description']" fc2/$partFile)

    echo "Feature catalogue: $tableTitle"
    echo "$tableDefinition"


    if [[ ! -z "$tableDefinition" ]]; then
      fcfile="fc2/$partFile.xml"
      echo "<fc><uuid>$uuid</uuid><url>$url</url><fcurl>$parts</fcurl>$title$abs$tableDefinition</fc>" > $fcfile

      sed -i 's/<\/dcterms:title>/ - feature catalogue<\/title>/g' $fcfile
      sed -i 's/dcterms://g' $fcfile
      sed -i 's/datatable://g' $fcfile

      echo "Importing CMS record from file $fcfile"
      curl -s "$SERVER/srv/api/records" -X POST \
        -H 'Accept: application/json, text/javascript, */*; q=0.01' \
        -H "X-XSRF-TOKEN: $TOKEN" \
        -H 'Content-Type: multipart/form-data' \
        -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
        -F "metadataType=METADATA" -F "uuidProcessing=GENERATEUUID" \
        -F "transformWith=EEAFCRDF-to-ISO19115-3" -F "group=$GROUP" -F "file=@$fcfile" > $fcfile.json
    fi
    ((i=i+1))
  done
done
