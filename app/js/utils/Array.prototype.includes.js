(function (globals) {
  if (Array.prototype.includes) return;

  var includes = function(searchElement /*, fromIndex*/ ) {
    'use strict';
    var O = Object(this);
    var len = parseInt(O.length) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1]) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) {
        return true;
      }
      k++;
    }
    return false;
  }

  if (Object.defineProperty) {
    try {
      Object.defineProperty(Array.prototype, 'includes', {
        value: includes, configurable: true, writable: true
      });
    } catch(e) {}
  }

  if (!Array.prototype.includes) {
    Array.prototype.includes = includes;
  }
}(this));
