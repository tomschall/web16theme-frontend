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
echo "Add svelte bundle"
export API_DEV = https://www.dev.fhnw.ch/de/searchbar.json
export API_DEV_SPELLCHECK = https://www.dev.fhnw.ch/de/spellcheck
export API_DEV_PROPOSALS = https://www.dev.fhnw.ch/de/autocomplete
npm --prefix ./source/assets/svelte/ install
npm --prefix source/assets/svelte/ run build_dev
echo "Install packages with yarn"
yarn install
bin/gulp build --interactive=false --ver="`git rev-parse --short HEAD`"

DO_COMMIT=yes ./deploy_theme.sh
