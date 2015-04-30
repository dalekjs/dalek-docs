#!/usr/bin/env node --harmony
'use strict';

// JsonWireProtocol is specified in a wiki:
//  https://code.google.com/p/selenium/wiki/JsonWireProtocol
//  https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol
// Extensions for Mobile are discussed:
//  https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md
// W3C is involved
//  http://www.w3.org/TR/webdriver/
//  https://github.com/w3c/webdriver

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var browserScrapeCommands = require('./browser.commands.js');
var browserScrapeResponseCodes = require('./browser.response-codes.js');
var browserScrapeCapabilities = require('./browser.capabilities.js');

var dataPath = path.resolve(__dirname, '../../data/jsonwire/0.0.0');
var wd;
// load the driver
var Driver = require('dalek-driver-phantomjs');
// initialize the driver
var driver = new Driver({
  host: '127.0.1.1'
});

function start() {
  // start the driver
  driver.start(
    // callback invoked when driver is started
    function startCb(options) {
      // load, connect and initialize WD.js
      wd = require('wd').promiseChainRemote(options.wd);
      wd.init(options.wd).then(
        scrape,
        console.error.bind(console)
      );
    },
    // callback invoked when driver could not start
    console.error.bind(console),
    // callback invoked when driver crashed after successful start
    console.error.bind(console)
  );
}

function stop() {
  // stop the client
  wd.quit().then(function quitCb() {
    // then stop the driver
    driver.stop(function stopCb() {
      // we're done
    });
  });
}

var success = function success(data) {
  console.log('success', JSON.stringify(data, null, 2));
  return data;
};

var error = function error(data) {
  console.log('error', JSON.stringify(data.message, null, 2));
};

function scrape() {
  wd.get('https://code.google.com/p/selenium/wiki/JsonWireProtocol')

    .execute(browserScrapeCommands, [])
    .then(function(data) {
      fs.writeFile(path.join(dataPath, 'commands.json'), data);
    }, error)

    .execute(browserScrapeResponseCodes, [])
    .then(function(data) {
      fs.writeFile(path.join(dataPath, 'response-codes.json'), data);
    }, error)

    .execute(browserScrapeCapabilities, [])
    .then(function(data) {
      fs.writeFile(path.join(dataPath, 'capabilties.json'), data);
    }, error)

    // stop WD and the driver
    .then(stop)
    // woopsi
    .catch(function shutdownFailure(errorShutdown) {
      console.error('failure', errorShutdown);
      stop();
    })
    // promises…
    .done();
};

mkdirp(dataPath, function(error) {
  if (error) {
    console.log(error);
    return;
  }
  start();
});