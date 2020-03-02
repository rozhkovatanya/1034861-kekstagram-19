'use strict';

window.globalState.posts = window.data.generatePosts();

var renderPosts = function (posts) {
  var pictures = document.querySelector('.pictures');
  for (var j = 0; j < posts.length; j++) {
    var post = posts[j];
    pictures.appendChild(window.picturePreview.createElement(post));
  }
};

renderPosts(window.globalState.posts);

