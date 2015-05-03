'use strict';

// {android|chrome|firefox|htmlunit|internet explorer|iPhone|iPad|opera|safari}
// {WINDOWS|XP|VISTA|MAC|LINUX|UNIX|ANDROID}
var enumPattern = /\{([^\}]+)\}/g
function parseEnums(item, key) {
  var enums = [];
  item.description = item.description.replace(enumPattern, function(patter, values) {
    enums.push(values.split('|'));
    return '[ENUM-' + (enums.length - 1) + ']';
  });

  if (enums) {
    item.enums = enums;
  }
}

module.exports = parseEnums;