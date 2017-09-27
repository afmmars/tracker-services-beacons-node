#!/bin/bash

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
VERSION=$(grep -m1 version package.json | tr -d '\r' | awk -F: '{print $2}' | sed 's/[", ]//g')
IMAGE1="anastas/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}"
IMAGE2="anastas/${COMPONENT}:${VERSION}-${BUILD_NUMBER-0}:latest"
TAG="v${VERSION}-${BUILD_NUMBER=0}"

set -e
set -o pipefail

# # set tag on git repo
# git tag $TAG
# git push --tags

#push production to docker registry
# docker login -u $DOCKER_USER -p $DOCKER_PASS 
docker login -u anastas -p KprSQ4iZ77
# todo set user env
docker push $IMAGE1
docker push $IMAGE2

