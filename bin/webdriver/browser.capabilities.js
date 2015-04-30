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

  [].slice.call(document.querySelectorAll('span[id^="capability-"]'), 1).forEach(function(span) {
    var _key = span.textContent.trim();
    var _dl = span.parentNode.nodeName.toLowerCase() === 'dt';

    mapping.data[_key] = {
      url: document.URL + '#' + span.id,
      description: _dl
        ? span.parentNode.nextElementSibling.textContent.trim()
        : null,
      type: _dl
        ? 'string'
        : span.parentNode.nextElementSibling.textContent.trim(),
    };
  });

  return JSON.stringify(mapping, null, 2);
};