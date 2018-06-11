#!/bin/bash

git branch -f master
git checkout master
git reset --hard origin/dev
yarn export
touch out/.nojekyll
cp -r out/* .
git add -A .
git commit -a -m 'chore: deploy new production version'
git push origin master --force
git checkout dev
