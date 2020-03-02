'use strict';

(function () {

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var cancelButton = bigPicture.querySelector('.big-picture__cancel');

  var pictures = document.querySelector('.pictures');

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    cancelButton.removeEventListener('click', onBigPictureClose);
    document.removeEventListener('click', closeOnMouseOutClick);
    document.removeEventListener('keydown', closeOnEscPress);
  };

  var closeOnMouseOutClick = function (evt) {
    if (evt.target.classList.contains('overlay')) {
      onBigPictureClose();
    }
  };

  var closeOnEscPress = function (evt) {
    if (evt.key === window.KEYS.ESC) {
      onBigPictureClose();
    }
  };


  var appendCommentElements = function (rootElement, comments) {
    rootElement.innerHTML = '';
    return comments.forEach(function (comment) {
      return rootElement.append(window.comment.createElement(comment));
    });
  };

  var renderBigPicture = function (post) {
    appendCommentElements(socialComments, post.comments);

    bigPictureImg.src = post.url;
    socialCaption.innerText = post.description;
    likesCount.innerText = post.likes;
    commentsCount.innerText = post.comments.length;
  };

  pictures.addEventListener('click', function (evt) {
    var target = evt.target;
    var pictureContainer = target.closest('.picture');
    if (pictureContainer) {
      var post = window.globalState.postsToImgMapping[pictureContainer.dataset.url];
      renderBigPicture(post);
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');

      cancelButton.addEventListener('click', onBigPictureClose);
      document.addEventListener('click', closeOnMouseOutClick);
      document.addEventListener('keydown', closeOnEscPress);
    }
  });


})();
