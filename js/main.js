'use strict';

var renderPosts = function (posts) {
  var pictures = document.querySelector('.pictures');
  for (var j = 0; j < posts.length; j++) {
    var post = posts[j];
    pictures.appendChild(window.picturePreview.createElement(post));
  }
};

window.request.get('https://js.dump.academy/kekstagram/data', function (posts) {
  renderPosts(posts);
}, function (error) {
  // eslint-disable-next-line
  console.error(error);
});


