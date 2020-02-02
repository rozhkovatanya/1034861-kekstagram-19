'use strict';

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var pictures = document.querySelector('.pictures');

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

var getRandomElement = function (array) {
  var randomNumber = Math.random() * array.length;
  var index = Math.floor(randomNumber);
  return array[index];
};

var generateComments = function () {
  var comments = [];
  for (var z = 0; z < Math.floor(Math.random() * 7); z++) {
    comments.push({
      avatar: 'img/avatar-' + Math.ceil(Math.floor() * 6) + '.svg',
      message: getRandomElement(POST_COMMENT),
      name: getRandomElement(POST_COMMENT_AUTHOR)
    })
  }
  return comments;
}

var posts = [];
  for(var i = 1; i <= 25; i++) {
    posts.push({
      url: 'photos/' + i + '.jpg',
      description: 'Новое фото',
      likes: Math.floor(Math.random() * 200) + 15,
      comments: generateComments()
    });
  }

  for (var j = 0; j < posts.length; j++) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = posts[j].url;
    pictureElement.querySelector('.picture__likes').textContent = posts[j].likes;
    pictureElement.querySelector('.picture__comments').textContent = posts[j].comments.length;

    pictures.appendChild(pictureElement);
}

