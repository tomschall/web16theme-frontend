#!/bin/sh
/opt/python2/bin/virtualenv .
source bin/activate
bin/pip install -r requirements.txt
bin/buildout
pip install nodeenv
nodeenv --python-virtualenv --node=11.15.0
ln -s /usr/bin/nodejs /usr/bin/node
npm install -g yarn
echo "Current node version"
node --version
echo "Show bin directory"
ls bin/
echo "Install packages with yarn"
yarn install
yarn global add gulp@3.9.1
echo "Show directory"
ls -al
