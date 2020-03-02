'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  var socialCaption = bigPicture.querySelector('.social__caption');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socialComments = bigPicture.querySelector('.social__comments');


  var createCommentElement = function (comment) {
    var commentRoot = document.createElement('li');
    commentRoot.className = 'social__comment';

    var socialPicture = document.createElement('img');
    socialPicture.className = 'social__picture';
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.width = '35';
    socialPicture.height = '35';

    var commentBody = document.createElement('p');
    commentBody.className = 'social__text';
    commentBody.innerText = comment.message;

    commentRoot.append(socialPicture, commentBody);
    return commentRoot;
  };


  var renderComments = function (rootElement, comments) {
    rootElement.innerHTML = '';
    return comments.forEach(function (comment) {
      return rootElement.append(createCommentElement(comment));
    });
  };
  window.bigPicture = {
    render: function (posts) {
      var post = posts[0];
      renderComments(socialComments, post.comments);

      bigPictureImg.src = post.url;
      socialCaption.innerText = post.description;
      likesCount.innerText = post.likes;
      commentsCount.innerText = post.comments.length;
    }
  };

})();
