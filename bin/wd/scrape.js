#!/usr/bin/env node --harmony
'use strict';

var fs = require("fs");
var path = require('path');
var mkdirp = require('mkdirp');

var map = require(process.argv[2]);
var pkg = require(process.argv[3]);

var dataPath = path.resolve(__dirname, '../../data/wd/', pkg.version);
var res = {
  meta: {
    url: 'https://github.com/admc/wd/blob/master/doc/jsonwire-full-mapping.md',
    version: pkg.version,
    date: (new Date()).toISOString(),
  },
  data: {},
};

var signaturePattern = /^([^\(]+)\(([^\)]+)\) -> ([^\(]+)\(([^\)]+)\)$/
function extractSignature(text) {
  // element.setText(keys, cb) -> cb(err)
  var p = text.match(signaturePattern);
  return p && {
    name: p[1],
    args: p[2].replace(/\s+/g, '').split(','),
    cb: p[4].replace(/\s+/g, '').split(','),
  } || null;
}

map.forEach(function(item) {
  if (item.wd || item.asserter) {
    // skip irrelevant cruft
    return;
  }

  var jsonWireUrl = item.jsonWire && item.jsonWire.url
    ||  item.missing && item.missing.key
    || ':extra';

  if (!res.data[jsonWireUrl]) {
    res.data[jsonWireUrl] = {
      jsonWire: item.jsonWire || null,
      methods: []
    };
  }

  item.wd_doc && item.wd_doc.forEach(function(doc) {
    doc && doc.desc && doc.desc.forEach(function(desc) {
      var signature = extractSignature(desc.line);
      res.data[jsonWireUrl].methods.push(signature || desc.line);
    });
  });
});

Object.keys(res.data).forEach(function(key) {
  var item = res.data[key];
  item.methods = item.methods.map(function(method, index) {
    var prev = index - 1;
    if (index && typeof method === 'string' && typeof item.methods[prev] === 'string') {
      item.methods[prev] += ' ' + method;
      return null;
    }

    return method;
  }).filter(Boolean);
});

mkdirp(dataPath, function(error) {
  if (error) {
    console.log(error);
    return;
  }

  fs.writeFileSync(path.join(dataPath, 'methods.json'), JSON.stringify(res, null, 2));
});
