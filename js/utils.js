'use strict';

(function () {

  window.generateRandomNumber = function (max) {
    return Math.floor(Math.random() * max);
  };

  window.getRandomElement = function (array) {
    var index = window.generateRandomNumber(array.length);
    return array[index];
  };

})()
;
