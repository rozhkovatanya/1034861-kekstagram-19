'use strict';

(function () {
  var findDuplicates = function (arr) {
    var sortedArr = [].concat(arr).sort();
    var duplicates = [];
    for (var i = 0; i < sortedArr.length - 1; i++) {
      var current = sortedArr[i];
      var next = sortedArr[i + 1];
      if (current === next) {
        duplicates.push(sortedArr[i]);
      }
    }
    return duplicates;
  };

  var filterSpacesAndEmptyStrings = function (array) {
    var filteredArray = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  };

  var allElementsToLowerCase = function (array) {
    var lowercasedArray = [];
    for (var i = 0; i < array.length; i++) {
      lowercasedArray.push(array[i].toLowerCase());
    }
    return lowercasedArray;
  };

  var validateHashtags = function (string) {
    if (!string) {
      return '';
    }

    var hashtags = string.split(' ');

    hashtags = filterSpacesAndEmptyStrings(hashtags);

    hashtags = allElementsToLowerCase(hashtags);

    var duplicates = findDuplicates(hashtags);
    if (duplicates.length > 0) {
      return 'Дубликаты: ' + duplicates.join(', ');
    }

    if (hashtags.length > 5) {
      return 'Не более 5-ти хештегов';
    }

    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      var isHashFirstCharacter = hashtag[0] !== '#';
      var hasAtLeastOneSymbol = hashtag.length === 1;
      var hasOnlyAlphanumerics = !/^[a-zA-Z0-9]+$/.test(hashtag.substring(1));
      var isShorterThan20 = hashtag.length >= 20;
      if (isHashFirstCharacter) {
        return 'Хэштег должен начинаться с "#"';
      } else if (hasAtLeastOneSymbol) {
        return 'Хэштег должен состоять хотя бы из одного символа после "#"';
      } else if (hasOnlyAlphanumerics) {
        return 'Недопустимые символы';
      } else if (isShorterThan20) {
        return 'Максимальная длина одного хэштега не должна превышать 20 символов';
      }
    }

    return '';
  };

  window.formValidation = {
    validateHashtags: validateHashtags
  };
})();
