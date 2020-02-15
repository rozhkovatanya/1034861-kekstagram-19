'use strict';

var ESC_KEY = 'Escape';

var body = document.querySelector('body');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');

uploadFileInput.addEventListener('change', function () {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', uploadCancelEscPress);
});

var closeModal = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', uploadCancelEscPress);
};

var uploadCancelEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== hashtagInput) {
    closeModal();
  }
};

uploadCancel.addEventListener('click', closeModal);

var scaleControllSmaller = document.querySelector('.scale__control--smaller');
var scaleControllBigger = document.querySelector('.scale__control--bigger');
var scaleControllValue = document.querySelector('.scale__control--value');
var uploadPreview = document.querySelector('.img-upload__preview');

scaleControllSmaller.addEventListener('click', function () {
  var value = scaleControllValue.value;
  value = parseFloat(value);
  value = value - 25;
  if (value > 0) {
    scaleControllValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }
});

scaleControllBigger.addEventListener('click', function () {
  var value = scaleControllValue.value;
  value = parseFloat(value);
  value = value + 25;
  if (value <= 100) {
    scaleControllValue.value = value + '%';
    uploadPreview.style.transform = 'scale(' + (value / 100) + ')';
  }
});

var isDragging = false;

var pin = document.querySelector('.effect-level__pin');
var track = document.querySelector('.effect-level__line');
var depth = document.querySelector('.effect-level__depth');

var imgUploadEffects = document.querySelector('.img-upload__effects');
var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelValue = document.querySelector('.effect-level__value');

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

function setPin(percents) {
  pin.style.left = percents + '%';
  depth.style.width = percents + '%';
}

var filterChangeHandler = function () {
  setPin(100);
  setFilterValue(100);
};

imgUploadEffects.addEventListener('change', filterChangeHandler);

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


imgUploadEffects.addEventListener('change', filterChangeHandler);

var findDuplicates = function (arr) {
  var sortedArr = [].concat(arr).sort();
  var duplicates = [];
  for (var i = 0; i < sortedArr.length - 1; i++) {
    var current = sortedArr[i];
    var next = sortedArr[i + 1];
    if (current === next) {
      duplicates.push(sortedArr[i]);
    }
  }
  return duplicates;
};

var filterSpacesAndEmptyStrings = function (array) {
  var filteredArray = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i]) {
      filteredArray.push(array[i]);
    }
  }
  return filteredArray;
};

var allElementsToLowerCase = function (array) {
  var lowercasedArray = [];
  for (var i = 0; i < array.length; i++) {
    lowercasedArray.push(array[i].toLowerCase());
  }
  return lowercasedArray;
};

var validateHashtags = function (string) {
  if (!string) {
    return '';
  }

  var hashtags = string.split(' ');

  hashtags = filterSpacesAndEmptyStrings(hashtags);

  hashtags = allElementsToLowerCase(hashtags);

  var duplicates = findDuplicates(hashtags);
  if (duplicates.length > 0) {
    return 'Дубликаты: ' + duplicates.join(', ');
  }

  if (hashtags.length > 5) {
    return 'Не более 5-ти хештегов';
  }

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];
    var isHashFirstCharacter = hashtag[0] !== '#';
    var hasAtLeastOneSymbol = hashtag.length === 1;
    var hasOnlyAlphanumerics = !/^[a-zA-Z0-9]+$/.test(hashtag.substring(1));
    var isShorterThan20 = hashtag.length >= 20;
    if (isHashFirstCharacter) {
      return 'Хэштег должен начинаться с "#"';
    } else if (hasAtLeastOneSymbol) {
      return 'Хэштег должен состоять хотя бы из одного символа после "#"';
    } else if (hasOnlyAlphanumerics) {
      return 'Недопустимые символы';
    } else if (isShorterThan20) {
      return 'Максимальная длина одного хэштега не должна превышать 20 символов';
    }
  }

  return '';
};

var hashtagInput = document.querySelector('.text__hashtags');
hashtagInput.addEventListener('input', function (evt) {
  evt.target.setCustomValidity(validateHashtags(evt.target.value));
});


var POST_COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var POST_COMMENT_AUTHOR = [
  'Иван Иваныч',
  'Хейтер',
  'Успешная мать двоих ангелочков',
  'Кекс',
  'Илон Маск',
  'Сын маминой подруги'
];

var generateRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

var getRandomElement = function (array) {
  var index = generateRandomNumber(array.length);
  return array[index];
};

var generateComments = function () {
  var comments = [];
  for (var z = 0; z < generateRandomNumber(7); z++) {
    comments.push({
      avatar: 'img/avatar-' + (generateRandomNumber(5) + 1) + '.svg',
      message: getRandomElement(POST_COMMENT),
      name: getRandomElement(POST_COMMENT_AUTHOR)
    });
  }
  return comments;
};

var generatePosts = function () {
  var posts = [];
  for (var i = 1; i <= 25; i++) {
    posts.push({
      url: 'photos/' + i + '.jpg',
      description: 'Новое фото',
      likes: generateRandomNumber(200) + 15,
      comments: generateComments()
    });
  }
  return posts;
};

var createPictureElement = function (post) {
  var pictureElement = document.querySelector('#picture')
  .content
  .querySelector('.picture')
  .cloneNode(true);

  var pictureImg = pictureElement.querySelector('.picture__img');
  var pictureLikes = pictureElement.querySelector('.picture__likes');
  var pictureComments = pictureElement.querySelector('.picture__comments');

  pictureImg.src = post.url;
  pictureLikes.textContent = post.likes;
  pictureComments.textContent = post.comments.length;

  return pictureElement;
};

var renderPosts = function (posts) {
  var pictures = document.querySelector('.pictures');

  for (var j = 0; j < posts.length; j++) {
    var post = posts[j];
    var pictureElement = createPictureElement(post);
    pictures.appendChild(pictureElement);
  }
};

renderPosts(generatePosts());
