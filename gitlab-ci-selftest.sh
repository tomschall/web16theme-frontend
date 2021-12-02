#!/bin/sh
python --version
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
echo "Current gulp version"
gulp --version
echo "Add svelte bundle"
npm --prefix ./source/assets/svelte/ install
npm --prefix ./source/assets/svelte/ run build
echo "Install packages with yarn"
yarn install
bin/gulp build --dev --interactive=false
