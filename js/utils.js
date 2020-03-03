'use strict';

(function () {
  var generateRandomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };
  window.utils = {
    generateRandomNumber: generateRandomNumber,
    getRandomArrayElement: function (array) {
      var index = generateRandomNumber(array.length);
      return array[index];
    }
  };

  var DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
