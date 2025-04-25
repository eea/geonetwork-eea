FROM maven:3-eclipse-temurin-11-focal AS build

ARG COMMIT_OR_BRANCH=eea-4.4.x

RUN apt-get -y update && \
    apt-get install -y --no-install-recommends \
      unzip


RUN git clone --recursive https://github.com/eea/geonetwork-eea.git /tmp/geonetwork-eea
WORKDIR /tmp/geonetwork-eea
RUN git checkout $COMMIT_OR_BRANCH
RUN git submodule update --init --recursive
RUN mvn -B install -DskipTests
RUN unzip /tmp/geonetwork-eea/web/target/geonetwork.war -d /tmp/geonetwork


FROM jetty:9-jdk11-eclipse-temurin AS final

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

RUN groupmod -g 933 www-data && \
  usermod -u 933 -g 933 www-data && \
  groupmod -g 33 jetty && \
  usermod -u 33 -g 33 jetty

# Add jetty to the www-data group
RUN usermod --append --groups www-data jetty

#============================================
# Google Chrome
#============================================
# can specify versions by CHROME_VERSION;
#  e.g. google-chrome-stable
#       google-chrome-beta
#       google-chrome-unstable
#============================================
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor | tee /etc/apt/trusted.gpg.d/google.gpg >/dev/null \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && if echo "${CHROME_VERSION}" | grep -qE "google-chrome-stable[_|=][0-9]*"; \
    then \
      CHROME_VERSION=$(echo "$CHROME_VERSION" | tr '=' '_') \
      && wget -qO google-chrome.deb "https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/${CHROME_VERSION}_$(dpkg --print-architecture).deb" \
      && apt-get -qqy --no-install-recommends install --allow-downgrades ./google-chrome.deb \
      && rm -rf google-chrome.deb ; \
    else \
      apt-get -qqy --no-install-recommends install ${CHROME_VERSION} ; \
    fi \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*
  


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




