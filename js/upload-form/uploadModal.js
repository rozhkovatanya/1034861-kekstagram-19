'use strict';

(function () {

  var body = document.querySelector('body');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var uploadFileInput = document.querySelector('#upload-file');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var uploadCancelEscHandler = function (evt) {
    if (evt.key === window.KEYS.ESC && evt.target !== hashtagInput && evt.target !== commentInput) {
      closeModal();
    }
  };

  uploadFileInput.addEventListener('change', function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', uploadCancelEscHandler);
  });

  var closeModal = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', uploadCancelEscHandler);
    imgUploadForm.reset();
    window.slider.reset();
    window.scale.reset();
  };

  window.uploadModal = {
    close: closeModal
  };

})();
