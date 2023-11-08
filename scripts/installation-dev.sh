#!/usr/bin/env bash

pushd app
npm install
popd

pushd media
npm install
popd

bash ./scripts/telecharge-fichiers-s3.sh