// NOTE: This script is to be executed in a browser
module.exports = function browserScrapeResponseCodes() {
  var mapping = {
    'meta': {
      url: document.URL,
      version: '0.0.0',
      date: (new Date()).toISOString(),
    },
    'data': {},
  };

  var ID = 'Response_Status_Codes';
  var KEYS = ['code', '*', 'description'];
  var KEY = 1;

  var headline = document.querySelector('a[name="' + ID + '"]').parentNode;
  var table = headline.nextElementSibling;
  while (table && table.nodeName.toLowerCase() != 'table') {
    table = table.nextElementSibling;
  }

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