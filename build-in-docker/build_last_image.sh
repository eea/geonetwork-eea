#!/bin/bash

docker build -t eeacms/geonetwork-eea:$(git ls-remote https://github.com/eea/geonetwork-eea.git HEAD | cut -f1) .
