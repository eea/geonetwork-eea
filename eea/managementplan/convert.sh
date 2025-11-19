sed -i.ini -E 's/\&([ En])/\&amp;\1/g'  management_plan2025.xml
#../../web/src/main/webapp/WEB-INF/data/config/codelist/local/thesauri/theme/
xsltproc -o eea-mp-2025.rdf eeamp2skos.xsl management_plan2025.xml
