#!/bin/bash

GIT_COMMIT=$(git ls-remote https://github.com/eea/geonetwork-eea.git HEAD | cut -f1)
echo "Building https://github.com/eea/geonetwork-eea.git at $GIT_COMMIT"
docker build \
    -t eeacms/geonetwork-eea:${GIT_COMMIT} \
    --build-arg COMMIT_OR_BRANCH=${GIT_COMMIT} \
    .
