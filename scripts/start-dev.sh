#!/usr/bin/env bash

npx concurrently -p "[{name}]" -n "APP,MEDIA" "npm run start:dev --prefix ./app" "npm run start:dev --prefix ./media"