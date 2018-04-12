#!/bin/sh
virtualenv .
bin/pip install -r requirements.txt
bin/buildout
bin/yarn install
