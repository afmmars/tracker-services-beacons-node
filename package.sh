#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE1="anastas/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"
IMAGE2="anastas/${COMPONENT}:latest"

set -e
set -o pipefail


#build docker images
docker build -f Dockerfile -t ${IMAGE1} -t ${IMAGE2} .

