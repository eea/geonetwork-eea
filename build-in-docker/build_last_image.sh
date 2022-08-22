#!/bin/bash





git ls-remote https://github.com/eea/geonetwork-eea.git HEAD | cut -f1


docker build -t michimau/gn:$(git ls-remote https://github.com/eea/geonetwork-eea.git HEAD | cut -f1) .
