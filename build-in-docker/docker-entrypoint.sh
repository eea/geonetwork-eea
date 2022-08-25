#!/bin/sh

set -e

mkdir -p /catalogue-data/htmlcache
mkdir -p /catalogue-data/lucene
mkdir -p /catalogue-data/logs

if [ "${ES_HOST}" != "localhost" ]; then
    sed -i "s#http://localhost:9200#${ES_PROTOCOL:="http"}://${ES_HOST}:${ES_PORT:="9200"}#g" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/web.xml" ;
    sed -i "s#es.host=localhost#es.host=${ES_HOST}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi; 

if [ -n "${ES_PROTOCOL}" ] && [ "${ES_PROTOCOL}" != "http" ] ; then
    sed -i "s#es.protocol=http#es.protocol=${ES_PROTOCOL}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi

if [ -n "${ES_PORT}" ] && [ "$ES_PORT" != "9200" ] ; then
    sed -i "s#es.port=9200#es.port=${ES_PORT}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi

if [ -n "${ES_INDEX_RECORDS}" ] && [ "$ES_INDEX_RECORDS" != "gn-records" ] ; then
    sed -i "s#es.index.records=gn-records#es.index.records=${ES_INDEX_RECORDS}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi

if [ "${ES_USERNAME}" != "" ] ; then
    sed -i "s#es.username=#es.username=${ES_USERNAME}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi

if [ "${ES_PASSWORD}" != "" ] ; then
    sed -i "s#es.password=#es.password=${ES_PASSWORD}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
fi

if [ -n "${KB_URL}" ] && [ "$KB_URL" != "http://localhost:5601" ]; then
    sed -i "s#kb.url=http://localhost:5601#kb.url=${KB_URL}#" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/config.properties" ;
    sed -i "s#http://localhost:5601#${KB_URL}#g" "${JETTY_BASE}/webapps/$CATALOGUE/WEB-INF/web.xml" ;
fi

if [ "$1" = jetty.sh ]; then
	if ! command -v bash >/dev/null 2>&1 ; then
		cat >&2 <<- 'EOWARN'
			********************************************************************
			ERROR: bash not found. Use of jetty.sh requires bash.
			********************************************************************
		EOWARN
		exit 1
	fi
	cat >&2 <<- 'EOWARN'
		********************************************************************
		WARNING: Use of jetty.sh from this image is deprecated and may
			 be removed at some point in the future.

			 See the documentation for guidance on extending this image:
			 https://github.com/docker-library/docs/tree/master/jetty
		********************************************************************
	EOWARN
fi

if ! command -v -- "$1" >/dev/null 2>&1 ; then
	set -- java -jar "$JETTY_HOME/start.jar" "$@"
fi

: ${TMPDIR:=/tmp/jetty}
[ -d "$TMPDIR" ] || mkdir -p $TMPDIR 2>/dev/null

: ${JETTY_START:=$JETTY_BASE/jetty.start}

case "$JAVA_OPTIONS" in
	*-Djava.io.tmpdir=*) ;;
	*) JAVA_OPTIONS="-Djava.io.tmpdir=$TMPDIR $JAVA_OPTIONS" ;;
esac

if expr "$*" : 'java .*/start\.jar.*$' >/dev/null ; then
	# this is a command to run jetty

	# check if it is a terminating command
	for A in "$@" ; do
		case $A in
			--add-to-start* |\
			--create-files |\
			--create-startd |\
			--download |\
			--dry-run |\
			--exec-print |\
			--help |\
			--info |\
			--list-all-modules |\
			--list-classpath |\
			--list-config |\
			--list-modules* |\
			--stop |\
			--update-ini |\
			--version |\
			-v )\
			# It is a terminating command, so exec directly
			JAVA="$1"
			shift
			exec $JAVA $JAVA_OPTIONS "$@"
		esac
	done

	if [ $(whoami) != "jetty" ]; then
		cat >&2 <<- EOWARN
			********************************************************************
			WARNING: User is $(whoami)
			         The user should be (re)set to 'jetty' in the Dockerfile
			********************************************************************
		EOWARN
	fi

	if [ -f $JETTY_START ] ; then
		if [ $JETTY_BASE/start.d -nt $JETTY_START ] ; then
			cat >&2 <<- EOWARN
			********************************************************************
			WARNING: The $JETTY_BASE/start.d directory has been modified since
			         the $JETTY_START files was generated. Either delete 
			         the $JETTY_START file or re-run 
			             /generate-jetty.start.sh 
			         from a Dockerfile
			********************************************************************
			EOWARN
		fi
		echo $(date +'%Y-%m-%d %H:%M:%S.000'):INFO:docker-entrypoint:jetty start from $JETTY_START
		set -- $(cat $JETTY_START)
	else
		# Do a jetty dry run to set the final command
		JAVA="$1"
		shift
		$JAVA $JAVA_OPTIONS "$@" --dry-run > $JETTY_START
		if [ $(egrep -v '\\$' $JETTY_START | wc -l ) -gt 1 ] ; then
			# command was more than a dry-run
			cat $JETTY_START \
			| awk '/\\$/ { printf "%s", substr($0, 1, length($0)-1); next } 1' \
			| egrep -v '[^ ]*java .* org\.eclipse\.jetty\.xml\.XmlConfiguration '
			exit
		fi
		set -- $(sed -e 's/ -Djava.io.tmpdir=[^ ]*//g' -e 's/\\$//' $JETTY_START)
	fi
fi

if [ "${1##*/}" = java -a -n "$JAVA_OPTIONS" ] ; then
	JAVA="$1"
	shift
	set -- "$JAVA" $JAVA_OPTIONS "$@"
fi

exec "$@"
