#!/bin/sh
virtualenv .
bin/pip install --upgrade zc.buildout setuptools
bin/buildout
bin/npm install
bin/npm install jquery-deparam
