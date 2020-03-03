'use strict';

(function () {
  var imgUploadEffects = document.querySelector('.img-upload__effects');
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelValue = document.querySelector('.effect-level__value');

  var isDragging = false;

  var pin = document.querySelector('.effect-level__pin');
  var track = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');

  pin.addEventListener('mousedown', function () {
    isDragging = true;
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
  });

  document.addEventListener('mousemove', function (e) {
    if (isDragging) {
      var pos = e.pageX - track.getBoundingClientRect().x;
      var percents = Math.ceil(pos / track.offsetWidth * 100);

      if (percents < 0) {
        percents = 0;
      } else if (percents > 100) {
        percents = 100;
      }

      setFilterValue(percents);
      setPin(percents);
    }
  });

  var setPin = function (percents) {
    pin.style.left = percents + '%';
    depth.style.width = percents + '%';
  };


  var resetSlider = function () {
    setPin(100);
    setFilterValue(100);
  };

  imgUploadEffects.addEventListener('change', resetSlider);

  var setFilterValue = function (percents) {
    effectLevelValue.value = percents;
    var ratio = percents / 100;
    var checkedFilter = document.querySelector('.effects__radio:checked');
    if (checkedFilter.matches('#effect-none')) {
      imgUploadPreview.style.filter = null;
      effectLevel.classList.add('hidden');
    } else if (checkedFilter.matches('#effect-chrome')) {
      imgUploadPreview.style.filter = 'grayscale(' + ratio + ')';
      effectLevel.classList.remove('hidden');
    } else if (checkedFilter.matches('#effect-sepia')) {
      imgUploadPreview.style.filter = 'sepia(' + ratio + ')';
      effectLevel.classList.remove('hidden');
    } else if (checkedFilter.matches('#effect-marvin')) {
      imgUploadPreview.style.filter = 'invert(' + percents + '%)';
      effectLevel.classList.remove('hidden');
    } else if (checkedFilter.matches('#effect-phobos')) {
      imgUploadPreview.style.filter = 'blur(' + (3 * ratio) + 'px)';
      effectLevel.classList.remove('hidden');
    } else if (checkedFilter.matches('#effect-heat')) {
      imgUploadPreview.style.filter = 'brightness(' + (1 + 2 * ratio) + ')';
      effectLevel.classList.remove('hidden');
    }
  };

  window.slider = {
    reset: resetSlider
  };


})();
