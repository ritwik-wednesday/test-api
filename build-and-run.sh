#!/bin/bash
set -a . ".env.$ENVIRONMENT_NAME" set +a
sleep 10
yarn build:development
yarn start