'use strict';

var ESC_KEY = 'Escape';

var body = document.querySelector('body');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadFileInput = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');

uploadFileInput.addEventListener('change', function () {
  body.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
});

var closeModal = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
};

var uploadCancelEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeModal();
  }
};

uploadCancel.addEventListener('click', closeModal);
document.addEventListener('keyup', uploadCancelEscPress);

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

var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectLevel = document.querySelector('.img-upload__effect-level');
var imgUploadEffects = document.querySelector('.img-upload__effects');
// var effectLevelPin = document.querySelector('.effect-level__pin');
// var effectLevelValue = document.querySelector('.effect-level__value');

var filterChangeHandler = function (evt) {
  if (evt.target && evt.target.matches('#effect-none')) {
    imgUploadPreview.style.filter = null;
    effectLevel.classList.add('hidden');
  } else if (evt.target && evt.target.matches('#effect-chrome')) {
    imgUploadPreview.style.filter = 'grayscale(0.5)';
    effectLevel.classList.remove('hidden');
  } else if (evt.target && evt.target.matches('#effect-sepia')) {
    imgUploadPreview.style.filter = 'sepia(0.5)';
    effectLevel.classList.remove('hidden');
  } else if (evt.target && evt.target.matches('#effect-marvin')) {
    imgUploadPreview.style.filter = 'invert(1)';
    effectLevel.classList.remove('hidden');
  } else if (evt.target && evt.target.matches('#effect-phobos')) {
    imgUploadPreview.style.filter = 'blur(2px)';
    effectLevel.classList.remove('hidden');
  } else if (evt.target && evt.target.matches('#effect-heat')) {
    imgUploadPreview.style.filter = 'brightness(2)';
    effectLevel.classList.remove('hidden');
  }
};

imgUploadEffects.addEventListener('change', filterChangeHandler);

var checkHashtagInput = function (hashtagStrings) {
  var hashtags = hashtagStrings.trim().split(' ');
  if (hashtagStrings.length > 0) {
    for (var i = 0; i < hashtags.length; i++) {
      var hashtag = hashtags[i];
      if (hashtag.length !== 0) {
        if (hashtag[0] !== '#') {
          return 'Хэштег должен начинаться с "#"';
        } else if (hashtag.length === 1) {
          return 'Хэштег должен состоять хотя бы из одного символа после "#"';
        }
      }
    }
  }
  return '';
};

var hashtagInput = document.querySelector('.text__hashtags');
hashtagInput.addEventListener('input', function (evt) {
  evt.target.setCustomValidity(checkHashtagInput(evt.target.value));
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
