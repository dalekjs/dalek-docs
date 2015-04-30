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

  [].slice.call(document.querySelectorAll('#handling-errors tr'), 1).forEach(function(row) {
    var cells = row.children;
    var _code = cells[0].textContent.trim();

    mapping.data[_code] = {
      httpStatus: cells[1].textContent.trim(),
      jsonStatus: cells[2].textContent.trim(),
      description: cells[3].textContent.trim().replace(/[\s\r\n]{2,}/g, ' '),
    };
  });

  return JSON.stringify(mapping, null, 2);
};