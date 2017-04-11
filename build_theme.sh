#!/bin/sh
virtualenv .
bin/pip install zc.buildout setuptools
bin/buildout
bin/npm install
bin/npm install jquery-deparam
bin/gulp build --dev --interactive=false
