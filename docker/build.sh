#!/bin/bash

TAG=$1
DOCKERFILE_PATH=$2

docker build -t $TAG:latest -f $DOCKERFILE_PATH .