#!/usr/bin/env bash

pushd app
npm install
popd

pushd media
npm install
popd

pushd media
set -o allexport
source .env set
set +o allexport
bash ./scripts/telecharge-fichiers-s3.sh
popd