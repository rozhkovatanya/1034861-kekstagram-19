'use strict';

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
