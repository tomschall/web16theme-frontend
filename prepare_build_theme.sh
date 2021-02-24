#!/bin/sh
/opt/python2/bin/virtualenv .
source bin/activate
bin/pip install -r requirements.txt
bin/buildout
pip install nodeenv
nodeenv --python-virtualenv --node=11.15.0
npm install -g yarn gulp@3.9.1
echo "Current Node Version"
node --version
yarn install
