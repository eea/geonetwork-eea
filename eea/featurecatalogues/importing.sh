curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+DISTINCT+%3Fs%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Fo+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FData%23Data%3E+.%0D%0A++FILTER+NOT+EXISTS+%7B+%3Fs+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FisReplacedBy%3E+%3FisReplacedBy+.+%7D%0D%0A%7D&format=application%2Fsparql-results%2Bjson&nrOfHits=20&execute=Execute' --output eea-data.json

TOKEN=ddf6c822-1330-4d59-8ff6-f5f732a60cad
JSESSIONID=node05emvio6yn1f5njevm3dbw3hf1.node0
SERVER=http://localhost:8080/geonetwork
AUTH=""
GROUP=1069871


rm list.csv
mkdir data
mkdir fc
cd data

rm list.txt
for url in $(jq '.results.bindings[].s.value' ../eea-data.json); do
  echo "____________________________________"
  uuid=$(sed -E "s/.*data-and-maps\/data\/(.*)\"/\1/g" <<< $url)
  echo "Download data from $url with uuid $uuid ..."
#  curl "http://www.eea.europa.eu/data-and-maps/data/interpolated-air-quality-data-2/@@rdf" --output "$uuid.rdf"
  curl -s "${url//\"/}/@@rdf" --output "$uuid.rdf"

  i=0
  for parts in $(xmllint --xpath "//*[local-name() = 'Data']/*[local-name() = 'hasPart']/@*[local-name() = 'resource']" $uuid.rdf | grep -v ">" | cut -f 2 -d "=" | tr -d \"); do
    echo "* parts $parts"
    curl -s "$parts/@@rdf" --output "$uuid-$i.rdf"


    tableDefinition=$(xmllint --xpath "//*[local-name() = 'tableDefinition']" $uuid-$i.rdf)
    title=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'title']" $uuid-$i.rdf)
    abs=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'description']" $uuid-$i.rdf)
    if [[ ! -z "$tableDefinition" ]]; then
      fcfile="../fc/$uuid-$i.xml"
      echo "<fc><uuid>$uuid</uuid><url>$url</url><fcurl>$parts</fcurl>$title$abs$tableDefinition</fc>" > $fcfile

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

      catuuid=$(jq '.uuid' $fcfile.json)
      echo "$uuid;$i;$parts;$catuuid;$url" >> ../list.txt
    else
      rm "$uuid-$i.rdf"
    fi
    ((i=i+1))
  done
done
