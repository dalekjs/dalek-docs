#!/usr/bin/env node --harmony
'use strict';

var fs = require('fs');
var path = require('path');

var parseTargets = require('./parse.desired-capabilities.targets.js');
var parseEnums = require('./parse.desired-capabilities.enums.js');

var dataPath = path.resolve(__dirname, '../../data/jsonwire/0.0.0');
var source = require(path.join(dataPath, 'desired-capabilities.raw.json'));
var properties = {};

var hierarchy = [];
source.data.forEach(function(item) {
  if (!item) {
    return;
  }

  if (item.headline) {
    hierarchy[item.level -1] = item.headline;
    hierarchy.length = item.level
    return;
  }

  if (item.label) {
    hierarchy[5] = item.label;
    return;
  }

  Object.keys(item).forEach(function(key) {
    var _item = item[key];
    _item.hierarchy = hierarchy.slice(0);

    parseEnums(_item, key);
    parseTargets(_item, key);

    if (properties[key]) {
      if (!Array.isArray(properties[key])) {
        properties[key] = [properties[key]];
      }

      properties[key].push(_item);
      return;
    }

    properties[key] = _item;
  });
});

var data = JSON.stringify(properties, null, 2);
fs.writeFile(path.join(dataPath, 'desired-capabilities.json'), data);
