#!/usr/bin/env bash
echo "USERNAME: ${GITHUB_USERNAME}"
echo "PASSWORD: ${GITHUB_PASSWORD}"

git clone "https://${GITHUB_USERNAME}:${GITHUB_PASSWORD}@github.com/${GITHUB_REPO}.wiki.git" wiki-files-git

yarn build:prod
