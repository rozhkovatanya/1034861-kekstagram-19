'use strict';


(function () {

  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error');
  main.appendChild(errorTemplate.content.cloneNode(true));

  var errorElement = main.querySelector('.error');
  errorElement.style.display = 'none';

  var errorCloseButton = errorElement.querySelector('.error__button');

  var closeErrorAction = function () {
    errorElement.style.display = 'none';
    document.removeEventListener('keydown', onEscClickError);
    errorCloseButton.removeEventListener('click', closeErrorAction);
    errorElement.removeEventListener('click', closeErrorAction);
  };

  var onEscClickError = function (evt) {
    if (evt.key === window.KEYS.ESC) {
      closeErrorAction();
    }
  };

  window.errorMessage = {
    show: function () {
      errorElement.style.display = 'flex';
      document.addEventListener('keydown', onEscClickError);
      errorCloseButton.addEventListener('click', closeErrorAction);
      errorElement.addEventListener('click', closeErrorAction);
    }
  };

})();
