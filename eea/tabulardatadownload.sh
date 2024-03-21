#!/bin/bash
TARGETDIRECTORY=/home/lubuntu/docker_work/tabular2sdi/tabular/

curl -q 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=PREFIX+DataFileLink%3A+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FDataFileLink%23%3E%0D%0APREFIX+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0D%0APREFIX+data%3A+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FData%23%3E%0D%0A%0D%0ASELECT+%0D%0A%3Fdata%0D%0A%3Fid%0D%0A%3FremoteUrl%0D%0Amin%28xsd%3Ainteger%28%3FtemporalCoverage%29%29+AS+%3FminYear%0D%0Amax%28xsd%3Ainteger%28%3FtemporalCoverage%29%29+AS+%3FmaxYear%0D%0A%0D%0AWHERE+%7B%0D%0A++%3FDataFileLink+a+DataFileLink%3ADataFileLink+.%0D%0A++%3FDataFileLink+dcterms%3Atitle+%3Ftitle+.+%0D%0A++%3FDataFileLink+DataFileLink%3AremoteUrl+%3FremoteUrl+.%0D%0A++%3FdataTable+dcterms%3AhasPart+%3FDataFileLink+.%0D%0A++%3Fdata+dcterms%3AhasPart+%3FdataTable+.%0D%0A++%3Fdata+data%3Aid+%3Fid+.%0D%0A++%3Fdata+data%3AtemporalCoverage+%3FtemporalCoverage+.%0D%0A%7D&format=text%2Fcsv&nrOfHits=999&execute=Execute' > sparql.csv

while read p; do
  ID=$(echo "$p" | cut -f2 -d';')
  #echo ID= $ID
  echo p= $p

  VERSION_TMP=$(echo $ID | grep -Eo '[^-]*([0-9]+)$')
  
  if [[ "${#VERSION_TMP}" -eq 1 ]]; then
    VERSION='0'$VERSION_TMP
    BASENAME=${ID::-2}
  elif [[ "${#VERSION_TMP}" -eq 0 ]]; then
    VERSION='00'
    BASENAME=$ID
  else
    VERSION='00'
    BASENAME=$ID
  fi

  FILEURL=$(echo $p | cut -f3 -d';')
  echo FILEURL= $FILEURL
  STARTYEAR=$(echo $p | cut -f4 -d';')
  ENDYEAR=$(echo $p | cut -f5 -d';' | tr -d '\r')
  
  if [ $ENDYEAR = $STARTYEAR ]; then
    DATERANGE=$STARTYEAR
  else
    DATERANGE=$STARTYEAR'-'$ENDYEAR
  fi

  #echo "$p" | cut -f1 -d';'
  DATADIRECTORY=$(echo 'eea_t_'$BASENAME'_'$DATERANGE'_v'$VERSION'_r00')

  mkdir -p $TARGETDIRECTORY$DATADIRECTORY
  cd $TARGETDIRECTORY$DATADIRECTORY
  curl -L -J -O $FILEURL
  cd -
done < sparql.csv
