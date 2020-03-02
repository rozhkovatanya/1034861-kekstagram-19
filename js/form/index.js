'use strict';

(function () {

  var body = document.querySelector('body');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancel = document.querySelector('#upload-cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  uploadFileInput.addEventListener('change', function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadCancelEscHandler);
  });

  var closeModal = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', uploadCancelEscHandler);
  };

  var uploadCancelEscHandler = function (evt) {
    if (evt.key === window.KEYS.ESC && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeModal();
    }
  };

  uploadCancel.addEventListener('click', closeModal);

  hashtagInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
  });

})();
