# Require curl, libxml-xpath-perl

mkdir download
mkdir xml
rm error.log
i=0
while IFS=, read -r url; do
    extension="${url##*.}"
    echo "Processing #$i:$url (in $extension)";
    if [ "$extension" = "pdf" ]; then
      echo " - Skipping PDF.";
    else
      if [ "$url" = "https://sextant.ifremer.fr/Donnees/Catalogue?#/metadata/*" ]; then
        url="$(echo $url | sed -r 's/.*metadata\/(.*)/https:\/\/sextant.ifremer.fr\/geonetwork\/srv\/api\/records\/\1\/formatters\/xml/')"
        echo " - Mapping url to $url.";
      fi

      curl -sS -L -o download/$i.xml $url
      if [ -f "download/$i.xml" ]; then
        isISO=$(xpath -q -e 'count(gmd:MD_Metadata)' download/$i.xml)
        echo $isISO
        if [ "$isISO" = "1" ]; then
          echo " - ISO19139 record"
          mv download/$i.xml xml/.

          TOKEN=XYZ
          curl 'https://galliwasp.eea.europa.eu/catalogue/srv/api/records' \
            -H 'accept: application/json' \
            -H 'x-xsrf-token: $TOKEN' \
            -H 'content-type: multipart/form-data' \
            -H 'origin: https://galliwasp.eea.europa.eu' \
            -H 'referer: https://galliwasp.eea.europa.eu/catalogue/srv/eng/catalog.edit' \
            -H 'cookie: XSRF-TOKEN=$TOKEN; JSESSIONID=node01fzchc4986d2gzmnxcpvyjizl1056.node0' \
            -F "_csrf=$TOKEN" \
            -F "metadataType=METADATA" \
            -F "uuidProcessing=OVERWRITE" \
            -F "transformWith=_none_" \
            -F "group=1069868" \
            -F "category=1069976" \
            -F "file=@xml/$i.xml" \

        else
          echo " - Not an ISO19139 record ?"
          #head -3 download/$i.xml
          echo $url >> error.log
        fi
      fi
    fi

    ((i=i+1))
done < art19-url.csv
