'use strict';

(function () {

  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success');

  main.appendChild(successTemplate.content.cloneNode(true));
  var successElement = main.querySelector('.success');

  var successCloseButton = successElement.querySelector('.success__button');
  successElement.style.display = 'none';


  var closeSuccessAction = function () {
    successElement.style.display = 'none';
    document.removeEventListener('keydown', onEscClickSuccess);
    successCloseButton.removeEventListener('click', closeSuccessAction);
  };

  var onEscClickSuccess = function (evt) {
    if (evt.key === window.KEYS.ESC) {
      closeSuccessAction();
    }
  };

  window.successMessage = {
    close: function () {
      successElement.style.display = null;
      document.addEventListener('keydown', onEscClickSuccess);
      successCloseButton.addEventListener('click', closeSuccessAction);
    }
  };
})();
