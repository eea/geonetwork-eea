sed -i.ini 's/ \& / \&amp; /g'  management_plan2023.xml
#../../web/src/main/webapp/WEB-INF/data/config/codelist/local/thesauri/theme/
xsltproc -o eea-mp.rdf eeamp2skos.xsl management_plan2023.xml
