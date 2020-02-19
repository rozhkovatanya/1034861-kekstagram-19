'use strict';
(function () {
  var picturePreviewTemplate = document.querySelector('#picture');

  window.picturePreview = {
    createPicturePreviewElement: function (post) {
      var newPicturePreview = picturePreviewTemplate
    .content
    .querySelector('.picture')
    .cloneNode(true);

      var pictureImg = newPicturePreview.querySelector('.picture__img');
      var pictureLikes = newPicturePreview.querySelector('.picture__likes');
      var pictureComments = newPicturePreview.querySelector('.picture__comments');

      pictureImg.src = post.url;
      pictureLikes.textContent = post.likes;
      pictureComments.textContent = post.comments.length;

      return newPicturePreview;

    },

    renderPosts: function (posts) {
      var pictures = document.querySelector('.pictures');
      for (var j = 0; j < posts.length; j++) {
        var post = posts[j];
        pictures.appendChild(window.picturePreview.createPicturePreviewElement(post));
      }
    },
  };
})();