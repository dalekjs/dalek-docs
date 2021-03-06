// NOTE: This script is to be executed in a browser
module.exports = function browserScrapeDesiredCapabilities() {
  var mapping = {
    'meta': {
      url: document.URL,
      version: '0.0.0',
      date: (new Date()).toISOString(),
    },
    'data': [],
  };

  function tableToMap(table) {
    var map = {};
    [].forEach.call(table.querySelectorAll('tr'), function(row) {
      if (row.firstElementChild.textContent.trim().toLowerCase() === 'key') {
        // skip table header
        return;
      }

      var key = row.children[0].textContent.trim();
      map[key] = {
        type: row.children[1].textContent.trim(),
        description: row.children[2].textContent.replace(/[\s\r\n]{2,}/g, ' ').trim(),
      };
    });

    return map;
  }

  function findNextTable(element) {
    var table = element.nextElementSibling;
    var nodeName = table.nodeName.toLowerCase();
    while (true) {
      if (nodeName === 'table') {
        return table;
      }

      if (['h1', 'h2', 'h3'].indexOf(nodeName) > -1) {
        // no table for this headline found
        return null;
      }

      table = table.nextElementSibling;
      if (!table) {
        return null;
      }

      nodeName = table.nodeName.toLowerCase();
    }

    return null;
  }

  var data = [];
  [].forEach.call(document.querySelectorAll('h1, h2, h3'), function(headline) {
    var name = headline.textContent.trim();
    data.push({
      headline: name,
      level: Number(headline.nodeName.slice(1)),
    });

    // not every headline has tables associated
    var table = findNextTable(headline);
    data.push(table && tableToMap(table) || null);

    // some tables may be followed by more tables explaining values
    while (table) {
      table = findNextTable(table);
      if (!table) {
        return;
      }

      // oh man is the DOM generated by that wiki pissing be off
      var label = table.previousElementSibling.textContent.trim()
        || table.previousElementSibling.previousElementSibling.textContent.trim();

      data.push({ label: label });
      data.push(tableToMap(table));
    }
  });

  mapping.data = data;
  return JSON.stringify(mapping, null, 2);
};