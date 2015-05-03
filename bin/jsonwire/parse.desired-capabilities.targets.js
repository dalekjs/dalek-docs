'use strict';

var targets = {
  'firefox specific': 'firefox',
  firefoxchromelauncher: 'firefox',
  'chrome specific' : 'chrome',
  'safari specific': 'safari',
  'ie specific' : 'ie',
  'internet explorer' : 'ie',
  'opera specific': 'opera',
  grid: 'grid',
  'grid-specific': 'grid',
  remotewebdriver: 'remote',
  rc: 'rc',
};

var targetsPattern = new RegExp('(?:^|\\b|-)(' + Object.keys(targets).join('|') + ')(?:$|\\b|-)', 'ig');

function keyToTarget(m) {
  return targets[m] || m;
}

function extractTargets(text) {
  return (text.toLowerCase().match(targetsPattern) || []).map(keyToTarget);
}

function duplicates(item, index, list) {
  return !(index && list[index - 1] === item);
}

function parseTargets(item, key) {
  var targets = [];

  if (item.hierarchy[0] === 'Introduction') {
    targets.push('all');
  }

  item.targets = targets
    .concat(extractTargets(key))
    .concat(extractTargets(item.hierarchy.join(' - ')))
    .concat(extractTargets(item.description))
    .sort()
    .filter(duplicates);
}

module.exports = parseTargets;