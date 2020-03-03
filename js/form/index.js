'use strict';

(function () {

  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var uploadFileInput = document.querySelector('#upload-file');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectNoneInput = document.querySelector('#effect-none');
  var effectChromeInput = document.querySelector('#effect-chrome');
  var effectSepiaInput = document.querySelector('#effect-sepia');
  var effectMarvinInput = document.querySelector('#effect-marvin');
  var effectPhobosInput = document.querySelector('#effect-phobos');
  var effectHeatInput = document.querySelector('#effect-heat');

  // var successTemplate = document.querySelector('#success');
  // var errorTemplate = document.querySelector('#error');
  //
  // var errorElement = errorTemplate.content.cloneNode(true);
  // errorElement.style.display = 'none';
  // main.appendChild(errorElement);
  // var successElement = successTemplate.content.cloneNode(true);
  // successElement.style.display = 'none';
  // main.appendChild(successElement);


  var effectRadioInputs = [effectNoneInput,
    effectChromeInput,
    effectSepiaInput,
    effectMarvinInput,
    effectPhobosInput,
    effectHeatInput];


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

  var getEffectValue = function () {
    return effectRadioInputs.find(function (input) {
      return input.checked;
    }).value;
  };

  var buildFormData = function () {
    var formData = new FormData();
    formData.append('filename', uploadFileInput.value);
    formData.append('hashtags', hashtagInput.value);
    formData.append('description', commentInput.value);
    formData.append('effect', getEffectValue());
    formData.append('scale', scaleControlInput.value);
    formData.append('effect-level', effectLevelValue.value);
    return formData;
  };

  var onError = function () {

    var errorElement = errorTemplate.content.cloneNode(true);
    // errorElement.addEventListener('key', function (evt) {
    // })
  };

  var onSuccess = function () {

  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (hashtagInput.checkValidity()) {

      window.request.post('https://js.dump.academy/kekstagram', buildFormData(), onSuccess, onError);
    }
  });

  uploadCancel.addEventListener('click', closeModal);

  hashtagInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
  });

})();
