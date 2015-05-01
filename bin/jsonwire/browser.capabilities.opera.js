// NOTE: This script is to be executed in a browser
module.exports = function browserScrapeCapabilitiesOpera() {
  var mapping = {
    'meta': {
      url: document.URL,
      version: '0.0.0',
      date: (new Date()).toISOString(),
    },
    'data': {},
  };

  function findNextTable(element) {
    var table = element.nextElementSibling;
    while (table.nodeName.toLowerCase() !== 'table') {
      table = table.nextElementSibling;
    }

    return table;
  }

  var ID = 'Capabilities';
  var KEYS = ['*', 'type', 'default', 'description'];
  var KEY = 0;

  var headline = document.querySelector('a[name="' + ID + '"]').parentNode;
  var table = findNextTable(headline);

  [].slice.call(table.querySelectorAll('tr'), 1).forEach(function(row) {
    var map = {};
    var cells = row.querySelectorAll('td');
    KEYS.forEach(function(key, index) {
      if (key === '*') {
        // skip the object's key
        return;
      }

      map[key] = cells[index].textContent.replace(/[\s\r\n]{2,}/g, ' ').trim();
    });

    mapping.data[cells[KEY].textContent.trim()] = map;
  });

  return JSON.stringify(mapping, null, 2);
};