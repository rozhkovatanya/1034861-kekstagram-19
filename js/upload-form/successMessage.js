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
    successElement.removeEventListener('click', closeSuccessAction);
  };

  var onEscClickSuccess = function (evt) {
    if (evt.key === window.KEYS.ESC) {
      closeSuccessAction();
    }
  };

  window.successMessage = {
    show: function () {
      successElement.style.display = 'flex';
      document.addEventListener('keydown', onEscClickSuccess);
      successCloseButton.addEventListener('click', closeSuccessAction);
      successElement.addEventListener('click', closeSuccessAction);
    }
  };
})();
