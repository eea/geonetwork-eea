# Require curl, libxml-xpath-perl

mkdir download
mkdir xml
rm error.log
i=0
while IFS=, read -r url; do
    echo "Processing #$i:$url";

    extension="${url##*.}"
    if [ "$extension" = "pdf" ]; then
      echo " - Skipping PDF.";
    else

      if [ "$url" = "https://sextant.ifremer.fr/Donnees/Catalogue?#/metadata/*" ]; then
        url="$(echo $url | sed -r 's/.*metadata\/(.*)/https:\/\/sextant.ifremer.fr\/geonetwork\/srv\/api\/records\/\1\/formatters\/xml/')"
        echo " - Mapping url to $url.";
      fi

      #curl -sS -L -o download/$i.xml $url
      if [ -f "download/$i.xml" ]; then
        isISO=$(xpath -q -e 'count(gmd:MD_Metadata)' download/$i.xml)
        echo $isISO
        if [ "$isISO" = "0" ]; then
          echo " - Not an ISO19139 record ?"
          head -3 download/$i.xml
          echo $url >> error.log
        else
          echo " - ISO19139 record"
          mv download/$i.xml xml/.
        fi
      fi
    fi

    ((i=i+1))
done < art19-url.csv
