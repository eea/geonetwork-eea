curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+DISTINCT+%3Fs%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Fo+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FData%23Data%3E+.%0D%0A++FILTER+NOT+EXISTS+%7B+%3Fs+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2FisReplacedBy%3E+%3FisReplacedBy+.+%7D%0D%0A%7D&format=application%2Fsparql-results%2Bjson&nrOfHits=20&execute=Execute' --output eea-data.json


mkdir data
mkdir fc
cd data

rm list.txt
for url in $(jq '.results.bindings[].s.value' ../eea-data.json); do
  echo "____________________________________"
  uuid=$(sed -E "s/.*data-and-maps\/data\/(.*)\"/\1/g" <<< $url)
  echo "Download data from $url with uuid $uuid ..."
#  curl "http://www.eea.europa.eu/data-and-maps/data/interpolated-air-quality-data-2/@@rdf" --output "$uuid.rdf"
  curl "${url//\"/}/@@rdf" --output "$uuid.rdf"

  i=0
  for parts in $(xmllint --xpath "//*[local-name() = 'Data']/*[local-name() = 'hasPart']/@*[local-name() = 'resource']" $uuid.rdf | grep -v ">" | cut -f 2 -d "=" | tr -d \"); do
    echo "* parts $parts"
    curl "$parts/@@rdf" --output "$uuid-$i.rdf"
    echo "$uuid;$i;$parts" >> list.txt

    tableDefinition=$(xmllint --xpath "//*[local-name() = 'tableDefinition']" $uuid-$i.rdf)
    title=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'title']" $uuid-$i.rdf)
    abs=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'description']" $uuid-$i.rdf)
    if [[ ! -z "$tableDefinition" ]]; then
      echo "<fc><uuid>$uuid</uuid><url>$url</url><fcurl>$parts</fcurl>$title$abs$tableDefinition</fc>" > ../fc/$uuid-$i.xml
    else
      rm "$uuid-$i.rdf"
    fi
    ((i=i+1))
  done
done
