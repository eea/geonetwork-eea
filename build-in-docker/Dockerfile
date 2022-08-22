FROM jetty:9-jdk8-openjdk as build
  
USER root
RUN apt-get -y update && \
    apt-get install -y maven

USER jetty
RUN git clone --recursive https://github.com/eea/geonetwork-eea.git

#RUN git clone --recursive https://github.com/eea/geonetwork-eea.git 2> /dev/null || (cd geonetwork-eea ; git pull)
RUN cd geonetwork-eea && \
    mvn clean install -DskipTests
RUN    cd geonetwork-eea/web && \
    mvn package  -DskipTests -Penv-catalogue



FROM jetty:9-jre8-openjdk
MAINTAINER michimau <mauro.michielon@eea.europa.eu>

ARG id
USER root

RUN rm -rf /var/lib/jetty/webapps/*  && \
    chown jetty:jetty /var/lib/jetty/webapps

COPY --from=build /var/lib/jetty/geonetwork-eea/web/target/catalogue.war /var/lib/jetty/webapps/

RUN rm -rf /var/lib/jetty/webapps/*  && \
    chown jetty:jetty /var/lib/jetty/webapps

COPY docker-entrypoint.sh /

RUN mkdir -p /var/local/gn_data && \
    chown -R jetty:jetty /var/local/gn_data

USER jetty

ENTRYPOINT ["/docker-entrypoint.sh"]
