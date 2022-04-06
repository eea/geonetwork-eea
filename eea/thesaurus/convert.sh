#https://semantic.eea.europa.eu/sources.action?

xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/rod-eionet-europa-eu.rdf eeardf2skos.xsl rod.rdf

# curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+distinct+%3Fp%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Chttp%3A%2F%2Frdfdata.eionet.europa.eu%2Famp%2Fontology%2FmanagementPlan%3E+%3Fp%0D%0A%7D&format=application%2Fsparql-results%2Bxml&nrOfHits=20&execute=Execute' --output eea-mp.rdf
xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/eea-mp.rdf eeasparql2skos.xsl eea-mp.rdf

#curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+organisation%3A+%3Chttp%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FOrganisation%23%3E%0D%0A%0D%0ASELECT+%0D%0A%3Fname%0D%0A%3Forganisation%0D%0AWHERE+%7B%0D%0A++%3Forganisation+a+organisation%3AOrganisation+.%0D%0A++%3Forganisation+rdfs%3Alabel+%3Fname+.%0D%0A%7D&format=application%2Fsparql-results%2Bxml&nrOfHits=1000&execute=Execute' --output eea-providers.rdf

curl 'https://semantic.eea.europa.eu/typeSearch.action' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Accept-Language: en-US,en;q=0.9' \
  --data-raw 'type=http%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FOrganisation%23Organisation&uriResourceIdentifier=true&exportFormat=.xml&exportColumns=http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23label&exportColumns=http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2Fhomepage&exportColumns=http%3A%2F%2Fxmlns.com%2Ffoaf%2F0.1%2Fname&exportColumns=http%3A%2F%2Fwww.eea.europa.eu%2Fportal_types%2FOrganisation%23organisationUrl&exportColumns=http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2Fspatial&export=Export' --output eea-providers.rdf
