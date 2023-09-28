FROM maven:3-eclipse-temurin-8-focal AS build

ARG COMMIT_OR_BRANCH=eea-4.2.0

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
      unzip


RUN git clone --recursive https://github.com/eea/geonetwork-eea.git /tmp/geonetwork-eea
WORKDIR /tmp/geonetwork-eea
RUN git checkout $COMMIT_OR_BRANCH
RUN git submodule update --init --recursive
RUN mvn -B install -DskipTests
RUN unzip /tmp/geonetwork-eea/web/target/geonetwork.war -d /tmp/geonetwork


FROM jetty:9-jdk8-eclipse-temurin AS final
LABEL maintainer="michimau <mauro.michielon@eea.europa.eu>"

ENV DATA_DIR /catalogue-data
ENV WEBAPP_CONTEXT_PATH /geonetwork
ENV GN_CONFIG_PROPERTIES -Dgeonetwork.dir=${DATA_DIR} \
        -Dgeonetwork.formatter.dir=${DATA_DIR}/data/formatter \
        -Dgeonetwork.schema.dir=/opt/geonetwork/WEB-INF/data/config/schema_plugins \
        -Dgeonetwork.indexConfig.dir=/opt/geonetwork/WEB-INF/data/config/index


ENV JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true \
        -Xms512M -Xss512M -Xmx2G -XX:+UseConcMarkSweepGC


USER root

RUN rm -rf /var/lib/jetty/webapps/*  && \
    chown jetty:jetty /var/lib/jetty/webapps && \
    mkdir -p ${DATA_DIR} && \
    chown -R jetty:jetty ${DATA_DIR}

USER jetty
COPY jetty/geonetwork_context_template.xml /usr/local/share/geonetwork/geonetwork_context_template.xml
RUN java -jar /usr/local/jetty/start.jar --create-startd --add-module=http-forwarded
COPY docker-entrypoint.sh /geonetwork-entrypoint.sh

COPY --chown=jetty:jetty --from=build /tmp/geonetwork /opt/geonetwork

ENTRYPOINT ["/geonetwork-entrypoint.sh"]
CMD ["java","-jar","/usr/local/jetty/start.jar"]




