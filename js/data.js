'use strict';

(function () {

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


  window.generateComments = function () {
    var comments = [];
    for (var z = 0; z < window.generateRandomNumber(7); z++) {
      comments.push({
        avatar: 'img/avatar-' + (window.generateRandomNumber(5) + 1) + '.svg',
        message: window.getRandomElement(POST_COMMENT),
        name: window.getRandomElement(POST_COMMENT_AUTHOR)
      });
    }
    return comments;
  };

  window.generatePosts = function () {
    var posts = [];
    for (var i = 1; i <= 25; i++) {
      posts.push({
        url: 'photos/' + i + '.jpg',
        description: 'Новое фото',
        likes: window.generateRandomNumber(200) + 15,
        comments: window.generateComments()
      });
    }
    return posts;
  };


})();
