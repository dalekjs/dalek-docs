// NOTE: This script is to be executed in a browser
module.exports = function browserScrapeCommands() {
  var mapping = {
    'meta': {
      url: document.URL,
      version: '0.0.0',
      date: (new Date()).toISOString(),
    },
    'data': {},
  };

  var endpoints = {};
  [].slice.call(document.querySelectorAll('#list-of-endpoints tr'), 1).forEach(function(row) {
    var cells = row.children;
    var _method = cells[0].textContent.trim();
    var _url = cells[1].textContent.trim();
    var _name = cells[2].textContent.trim();

    !endpoints[_url] && (endpoints[_url] = {});
    endpoints[_url][_method] = _name;
  });

  [].forEach.call(document.querySelectorAll('.jsoncommand'), function(table) {
    var id = table.parentNode.id;
    var headline = table.parentNode.firstElementChild;
    var name = headline.textContent.replace(headline.firstElementChild.textContent, '').trim();
    var _errors = [].map.call(table.parentNode.querySelectorAll('a[href^="#status-"]'), function(link) {
      return link.textContent.trim();
    }).sort().filter(function(element, index, list) {
      return !(index && list[index - 1] === element);
    });

    [].slice.call(table.querySelectorAll('tr'), 1).forEach(function(row) {
      var cells = row.children;
      var _method = cells[0].textContent.trim();
      var _url = cells[1].textContent.trim();
      var _notes = cells[2].textContent.trim();

      !mapping.data[_url] && (mapping.data[_url] = {});
      mapping.data[_url][_method] = {
        url: document.URL + '#' + id,
        name: endpoints[_url] && endpoints[_url][_method] && endpoints[_url][_method],
        method: name,
        notes: _notes,
        errors: _errors,
      };
    });

  });

  return JSON.stringify(mapping, null, 2);
};