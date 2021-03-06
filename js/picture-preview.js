'use strict';
(function () {
  var picturePreviewTemplate = document.querySelector('#picture');

  window.picturePreview = {
    createElement: function (post) {
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

      // Here when we render posts we're adding mapping between picture element and globalState
      window.globalState.postsToImgMapping[post.url] = post;
      newPicturePreview.dataset.url = post.url;

      return newPicturePreview;
    },
  };
})();
