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

  [].filter.call(document.querySelectorAll('h4'), function(element) {
    return element.textContent.match(/^(GET|POST|DELETE)/);
  }).forEach(function(headline) {
    // dl > dd{0} > h4
    var rest = headline.textContent.split(' ');
    var method = rest[0];
    var url = rest.slice(1).join(' ');
    var data = {};
    // dl > dd{1} > dl
    var content = headline.parentElement.nextElementSibling.firstElementChild;
    [].forEach.call(content.children, function(element) {
      if (!element.firstElementChild || element.firstElementChild.nodeName.toLowerCase() !== 'dl') {
        data.comment = element.textContent.trim();
        data.commentHTML = element.innerHTML.trim();
        return;
      }

      var type = element.firstElementChild.querySelector('dt').textContent.slice(0, -1);

      if (type === 'Returns') {
        var dd = element.firstElementChild.querySelector('dd');
        data.returns = dd.textContent.trim();
        data.returnsHTML = dd.innerHTML.trim();
        return;
      }

      var map = {};
      [].forEach.call(element.firstElementChild.querySelectorAll('dd'), function(entry) {
        var keyElement = entry.querySelector('tt');
        var key = keyElement.textContent.trim();
        map[key] = entry.textContent.replace(/^.+- /, '').trim();
      });

      data[type] = map;
    });

    !mapping.data[url] && (mapping.data[url] = {});
    mapping.data[url][method] = data;
  });

  return JSON.stringify(mapping, null, 2);
};