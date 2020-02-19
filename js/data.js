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

  window.data = {
    generateComments: function () {
      var comments = [];
      for (var z = 0; z < window.utils.generateRandomNumber(7); z++) {
        comments.push({
          avatar: 'img/avatar-' + (window.utils.generateRandomNumber(5) + 1) + '.svg',
          message: window.utils.getRandomArrayElement(POST_COMMENT),
          name: window.utils.getRandomArrayElement(POST_COMMENT_AUTHOR)
        });
      }
      return comments;
    },

    generatePosts: function () {
      var posts = [];
      for (var i = 1; i <= 25; i++) {
        posts.push({
          url: 'photos/' + i + '.jpg',
          description: 'Новое фото',
          likes: window.utils.generateRandomNumber(200) + 15,
          comments: window.data.generateComments()
        });
      }
      return posts;
    },
  };

})();
