FROM jetty:9-jdk8-eclipse-temurin as build

USER root
RUN apt-get -y update && \
    apt-get install -y maven \
    git \
    zip

USER jetty
RUN git clone --recursive https://github.com/eea/geonetwork-eea.git

RUN cd geonetwork-eea && \
    mvn clean install -DskipTests
RUN cd geonetwork-eea/web && \
    mvn package  -DskipTests -Penv-catalogue

RUN unzip /var/lib/jetty/geonetwork-eea/web/target/catalogue.war -d /var/lib/jetty/webapps/catalogue


FROM jetty:9-jdk8-eclipse-temurin
MAINTAINER michimau <mauro.michielon@eea.europa.eu>

USER root

RUN rm -rf /var/lib/jetty/webapps/*  && \
    chown jetty:jetty /var/lib/jetty/webapps

COPY --from=build /var/lib/jetty/webapps/catalogue /var/lib/jetty/webapps/catalogue

COPY docker-entrypoint.sh /

RUN mkdir -p /var/local/gn_data && \
    chown -R jetty:jetty /var/local/gn_data

USER jetty

ENTRYPOINT ["/docker-entrypoint.sh"]




