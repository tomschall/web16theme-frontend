#!/bin/sh
/opt/python2/bin/virtualenv .
source bin/activate
bin/pip install -r requirements.txt
bin/buildout
pip install nodeenv
nodeenv --python-virtualenv --node=11.15.0
ln -s "$(which node)" /usr/bin/node
npm install -g yarn gulp@3.9.1
echo "Current node version"
node --version
echo "Install packages with yarn"
yarn install
bin/gulp build --interactive=false --ver="`git rev-parse --short HEAD`"
src/assets/svelte npm i
src/assets/svelte npm run build
./deploy_theme.sh
bin/gulp relative-paths
curl -o milestones.json --header "PRIVATE-TOKEN: oatBqMZzaiuxaa5sf7az" https://gitlab.fhnw.ch/api/v4/projects/25/milestones
cp milestones.json build/
curl -o commits.json --header "PRIVATE-TOKEN: oatBqMZzaiuxaa5sf7az" https://gitlab.fhnw.ch/api/v4/projects/257/repository/commits
cp commits.json build/
mv build public
