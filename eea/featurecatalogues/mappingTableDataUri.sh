rm urlmap.csv
for f in $(ls data/*.rdf); do
  tableCmsId=$(xmllint --xpath "//*[local-name() = 'DataTable']/@*[local-name() = 'about']" $f)

  if [ -n "$tableCmsId" ]; then
    tableTitle=$(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'title']" $f)

    echo "Checking $tableCmsId"
    echo "* $tableTitle"
    i=0
    for parts in $(xmllint --xpath "//*[local-name() = 'DataTable']/*[local-name() = 'hasPart']/@*[local-name() = 'resource']" $f | grep -v ">" | cut -f 2 -d "=" | tr -d \"); do
      partFile=$(basename $f .rdf)-$i.rdf
      #      echo "* parts $parts"
      curl -s "$parts/@@rdf" --output "files/$partFile"

      readarray -t items < <(xmlstarlet sel -t -m "//*[local-name() = 'DataFileLink']/*[local-name() = 'remoteUrl']" -v './text()' -n <files/$partFile)
      for url in $items; do
        echo "MAPPED DataFileLink =====> $tableCmsId;$url"
        echo "$tableCmsId;$url" >> urlmap.csv
      done
      readarray -t items < <(xmlstarlet sel -t -m "//*[local-name() = 'DataFile']/@*[local-name() = 'about']" -v '.' -n <files/$partFile)
      for url in $items; do
        echo "MAPPED DateFile =====> $tableCmsId;$url"
        echo "$tableCmsId;$url" >> urlmap.csv
      done
      ((i=i+1))
    done
  fi
done
