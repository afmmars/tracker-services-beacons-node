#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE="anastas/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}-build"
CONTAINER="${COMPONENT}"

set -e
set -o pipefail


rm -rf ./obj

#build docker images
docker build -f Dockerfile.build -t ${IMAGE} .

# create and copy 
docker create --name ${CONTAINER} ${IMAGE}
docker cp  ${CONTAINER}:/app/obj ./obj
docker rm  ${CONTAINER}