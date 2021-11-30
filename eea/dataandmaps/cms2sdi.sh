curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+DISTINCT+%3Fs%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Fo+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FData%23Data%3E+.%0D%0A++FILTER+NOT+EXISTS+%7B+%3Fs+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FisReplacedBy%3E+%3FisReplacedBy+.+%7D%0D%0A%7D&format=application%2Fsparql-results%2Bjson&nrOfHits=20&execute=Execute' --output eea-data.json

TOKEN=20084192-5ff9-4f95-a566-091345a9a4a5
JSESSIONID=node01kenh6tms0mol1x62vklmwthk51.node0

mkdir data
cd data
for url in $(jq '.results.bindings[].s.value' ../eea-data.json); do
  #"http://www.eea.europa.eu/data-and-maps/data/beat-integrated-classification-of-biodiversity"
  echo $url
  uuid=$(sed -E "s/.*data-and-maps\/data\/(.*)\"/\1/g" <<< $url)
  url=$(sed -E "s/\"(.*)\"/\1/g" <<< $url)
  echo "Download data from $url with uuid $uuid ..."
  #curl "$url/@@rdf" --output "$uuid.rdf"

  curl 'http://localhost:8080/geonetwork/srv/api/records' -X POST \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H "X-XSRF-TOKEN: $TOKEN" \
  -H 'Content-Type: multipart/form-data' \
  -H "Cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=$JSESSIONID" \
   -F "metadataType=METADATA" -F "uuidProcessing=OVERWRITE" -F "transformWith=EEARDF-to-ISO19115-3" -F "group=1069869" -F "file=@$uuid.rdf"
done
