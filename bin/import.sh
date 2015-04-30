#!/usr/bin/env bash -eu

echo "importing JsonWireProtocol"
(cd jsonwire && ./import.sh)
echo "importing W3C WebDriver"
(cd webdriver && ./import.sh)
echo "importing WD.js"
(cd wd && ./import.sh)

