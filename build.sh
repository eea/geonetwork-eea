mvn clean install -DskipTests
cd web
mvn package -DskipTests -Penv-catalogue
mvn package -DskipTests -Penv-internal-catalogue
mvn package -DskipTests -Penv-editor-catalogue
mvn package -DskipTests -Penv-map-catalogue

if [ -n "$1" ] ; then
    tar cvfz target/eea-catalogues.tar.gz target/catalogue.war target/internal-catalogue.war target/editor-catalogue.war target/map-catalogue.war
    cp target/eea-catalogues.tar.gz $1/.
fi
