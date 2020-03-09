'use strict';

(function () {

  var body = document.querySelector('body');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadCancel = document.querySelector('#upload-cancel');

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var uploadCancelEscHandler = function (evt) {
    if (evt.key === window.KEYS.ESC && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeModal();
    }
  };

  var openModal = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    imgUploadForm.addEventListener('submit', onSubmitForm);
    hashtagInput.addEventListener('invalid', onInvalidForm);
    document.addEventListener('keydown', uploadCancelEscHandler);
    uploadCancel.addEventListener('click', closeModal);
    hashtagInput.addEventListener('input', onHashtagInput);
  };

  var onHashtagInput = function (evt) {
    evt.target.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
  };

  var closeModal = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.removeEventListener('submit', onSubmitForm);
    hashtagInput.removeEventListener('invalid', onInvalidForm);
    document.removeEventListener('keydown', uploadCancelEscHandler);
    uploadCancel.removeEventListener('click', closeModal);
    hashtagInput.removeEventListener('input', onHashtagInput);
    hashtagInput.style.cssText = '';
    imgUploadForm.reset();
    window.slider.reset();
    window.scale.reset();
  };


  var onError = function () {
    closeModal();
    window.errorMessage.show();
  };

  var onSuccess = function () {
    closeModal();
    window.successMessage.show();
  };

  var onInvalidForm = function () {
    hashtagInput.style.cssText = 'border: 4px red solid;';
  };

  var onSubmitForm = function (evt) {
    evt.preventDefault();
    hashtagInput.style.cssText = '';
    window.request.post('https://js.dump.academy/kekstagram', new FormData(imgUploadForm), onSuccess, onError);
  };

  window.uploadModal = {
    open: openModal,
  };

})();
