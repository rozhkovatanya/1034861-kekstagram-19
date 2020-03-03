'use strict';

(function () {

  var uploadCancel = document.querySelector('#upload-cancel');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var hashtagInput = document.querySelector('.text__hashtags');

  uploadCancel.addEventListener('click', window.uploadModal.close);

  hashtagInput.addEventListener('input', function (evt) {
    evt.target.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
  });

  var onError = function () {
    window.uploadModal.close();
    window.errorMessage.close();
  };

  var onSuccess = function () {
    window.uploadModal.close();
    window.successMessage.close();
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (hashtagInput.checkValidity()) {
      window.request.post('https://js.dump.academy/kekstagram', new FormData(imgUploadForm), onSuccess, onError);
    }
  });

})();
