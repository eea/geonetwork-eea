mvn clean install
cd web
mvn package -Penv-catalogue
mvn package -Penv-internal-catalogue
mvn package -Penv-editor-catalogue

if [ -n "$1" ] ; then
    tar cvfz target/eea-catalogues.tar.gz target/catalogue.war target/internal-catalogue.war target/editor-catalogue.war
    cp target/eea-catalogues.tar.gz $1/.
fi
