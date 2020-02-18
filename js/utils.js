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

})();
