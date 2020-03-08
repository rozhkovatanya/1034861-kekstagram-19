'use strict';

(function () {
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var uploadPreview = document.querySelector('.img-upload__preview');

  uploadPreview.style.transition = '0.2s transform';

  var ZOOM_SCALE_STEP_SIZE = 25;

  scaleControlSmaller.addEventListener('click', function () {
    var value = scaleControlValue.value;
    value = parseFloat(value);
    value = value - ZOOM_SCALE_STEP_SIZE;
    if (value > 0) {
      scaleControlValue.value = value + '%';
      uploadPreview.style.transform = 'scale(' + (value / 100) + ')';
    }
  });

  scaleControlBigger.addEventListener('click', function () {
    var value = scaleControlValue.value;
    value = parseFloat(value);
    value = value + ZOOM_SCALE_STEP_SIZE;
    if (value <= 100) {
      scaleControlValue.value = value + '%';
      uploadPreview.style.transform = 'scale(' + (value / 100) + ')';
    }
  });

  window.scale = {
    reset: function () {
      uploadPreview.style.transform = 'scale(1)';
    }
  };
})();
