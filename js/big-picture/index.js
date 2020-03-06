'use strict';

(function () {

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var likesCount = bigPicture.querySelector('.likes-count');
  var socialComments = bigPicture.querySelector('.social__comments');
  var cancelButton = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var loadCommentsButton = bigPicture.querySelector('.social__comments-loader');

  var onBigPictureClose = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');

    cancelButton.removeEventListener('click', onBigPictureClose);
    document.removeEventListener('click', closeOnMouseOutClick);
    document.removeEventListener('keydown', closeOnEscPress);
    loadCommentsButton.removeEventListener('click', loadMoreButtonHandler);

    loadCommentsButton.classList.add('hidden');
    numberOfCommentsShown = 0;
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


  var commentCounterTemplate = function (shown, from) {
    return shown + ' из <span class="comments-count">' + from + '</span> комментариев';
  };

  var commentsRenderingEngine = function (post) {
    var numberOfComments = post.comments.length;
    if (numberOfComments <= 5) {
      socialCommentCount.innerHTML = commentCounterTemplate(numberOfComments, numberOfComments);
      appendCommentElements(socialComments, post.comments);
    } else {
      var numberShift = numberOfCommentsShown + 5;
      numberOfCommentsShown = numberShift > numberOfComments ? numberOfComments : numberShift;
      socialCommentCount.innerHTML = commentCounterTemplate(numberOfCommentsShown, numberOfComments);
      loadCommentsButton.classList.remove('hidden');
      var slicedComments = post.comments.slice(0, numberOfCommentsShown);
      appendCommentElements(socialComments, slicedComments);
    }

    if (numberOfCommentsShown >= numberOfComments) {
      loadCommentsButton.classList.add('hidden');
    }
  };

  var numberOfCommentsShown = 0;
  var loadMoreButtonHandler;

  var renderBigPicture = function (post) {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');

    cancelButton.addEventListener('click', onBigPictureClose);
    document.addEventListener('click', closeOnMouseOutClick);
    document.addEventListener('keydown', closeOnEscPress);
    loadMoreButtonHandler = function () {
      commentsRenderingEngine(post);
    };
    loadCommentsButton.addEventListener('click', loadMoreButtonHandler);

    bigPictureImg.src = post.url;
    socialCaption.innerText = post.description;
    likesCount.innerText = post.likes;
    commentsRenderingEngine(post);
  };

  window.bigPicture = {
    render: renderBigPicture
  };


})();
