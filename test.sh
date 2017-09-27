#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE="anastas/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-test"
CONTAINER="${COMPONENT}"

set -e
set -o pipefail

#workaround to remove dangling images
docker-compose -f ./docker-compose.test.yaml down

export IMAGE
docker-compose -f ./docker-compose.test.yaml up --build --abort-on-container-exit --exit-code-from test

#workaround to remove dangling images
docker-compose -f ./docker-compose.test.yaml down