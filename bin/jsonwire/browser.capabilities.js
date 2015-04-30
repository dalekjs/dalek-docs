// NOTE: This script is to be executed in a browser
module.exports = function browserScrapeCapabilities() {
  var mapping = {
    'meta': {
      url: document.URL,
      version: '0.0.0',
      date: (new Date()).toISOString(),
    },
    'data': {},
  };

  var ID = 'Capabilities_JSON_Object';
  var KEYS = ['*', 'type', 'description'];
  var KEY = 0;

  var headline = document.querySelector('a[name="' + ID + '"]').parentNode.parentNode;
  var table = headline.nextElementSibling.querySelector('table');

  [].slice.call(table.querySelectorAll('tr'), 1).forEach(function(row) {
    var map = {};
    var cells = row.querySelectorAll('td');
    KEYS.forEach(function(key, index) {
      if (key === '*') {
        // skip the object's key
        return;
      }

      map[key] = cells[index].textContent.trim();
    });

    mapping.data[cells[KEY].textContent.trim()] = map;
  });

  return JSON.stringify(mapping, null, 2);
};