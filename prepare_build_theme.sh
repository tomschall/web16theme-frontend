#!/bin/sh
/opt/python2/bin/virtualenv .
source bin/activate
bin/pip install -r requirements.txt
bin/buildout
echo "Current Node Version"
node --version
bin/yarn install
