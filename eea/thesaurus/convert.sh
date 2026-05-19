# Convert ROD obligations and instruments RDF files to SKOS format for use in GeoNetwork

YEAR=2026

curl https://rod.eionet.europa.eu/obligations/rdf --output rod-obligations-$YEAR.rdf
curl https://rod.eionet.europa.eu/instruments/rdf --output rod-instruments-$YEAR.rdf

xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/rod-eionet-europa-eu.rdf eeardf2skos.xsl rod-obligations-$YEAR.rdf
xsltproc -o ../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/eu-applicable-legislation.rdf rodinstrument2skos.xsl rod-instruments-$YEAR.rdf
java -jar ../../web/target/geonetwork/WEB-INF/lib/saxon-9.1.0.8b-patch.jar -s:rod-instruments-2025.rdf -xsl:rodinstrument2skos.xsl -o:../../web/src/main/webapp/WEB-INF/data/config/codelist/external/thesauri/theme/eu-applicable-legislation.rdf
