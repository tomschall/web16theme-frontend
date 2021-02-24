#!/bin/sh
/opt/python2/bin/virtualenv .
source bin/activate
bin/pip install -r requirements.txt
bin/buildout
pip install nodeenv # then install nodeenv (nodeenv==0.7.1 was installed)
nodeenv --python-virtualenv # Use current python virtualenv
npm install -g yarn # install lessc in the virtualenv
echo "Current Node Version"
node --version
bin/yarn install
