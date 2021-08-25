#https://semantic.eea.europa.eu/sources.action?

xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/rod-eionet-europa-eu.rdf eeardf2skos.xsl rod.rdf

# curl 'https://semantic.eea.europa.eu/sparql?selectedBookmarkName=&query=SELECT+distinct+%3Fp%0D%0AWHERE+%7B%0D%0A++%3Fs+%3Chttp%3A%2F%2Frdfdata.eionet.europa.eu%2Famp%2Fontology%2FmanagementPlan%3E+%3Fp%0D%0A%7D&format=application%2Fsparql-results%2Bxml&nrOfHits=20&execute=Execute' --output eea-mp.rdf
xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/eea-mp.rdf eeasparql2skos.xsl eea-mp.rdf

