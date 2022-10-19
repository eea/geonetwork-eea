rm associatedrecord.csv
while IFS=";" read -r cmsid part cmsurl jobid tableurl; do
  # From import job uuid, check the return feature catalogue returned uuid.
  while IFS=";" read -r jobidkey tableuuid; do
    if [[ "$jobid" == "$jobidkey" ]]; then
      # From the tableuri check the data file link
      while IFS=";" read -r tableuri datalink; do
        if [[ "$cmsurl" == "$tableuri" ]]; then
          # From the link of the dataset (ie. l), check the corresponding feature catalogue url
          # From the CMS import load the dataset record uuid
          while IFS=";" read -r datasetuuid cmsidkey type c rid t l; do
#            echo "$cmsidkey vs eea-data-and-maps-$cmsid"
            echo "$datasetuuid $datalink in $l ?"
#            if [[ "eea-data-and-maps-data-$cmsid" =~ "$cmsidkey" ]]; then
            if [[ "$l" == *"$datalink"* ]]; then
              echo "Associating table $tableuuid ($jobid) with record $datasetuuid ($cmsidkey) based on file $datalink." >> associatedrecord.csv
            fi
          done <../dataandmaps/list.csv
        fi
      done <urlmap.csv
    fi
  done <uuidmap.csv
done <list.txt
