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
echo "Current gulp version"
gulp --version
echo "Show bin directory"
ls bin/
echo "Show directory"
ls -al
echo "Install packages with yarn"
yarn install
