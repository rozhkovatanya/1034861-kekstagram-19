'use strict';

(function () {
  window.comment = {
    createElement: function (comment) {
      var commentRoot = document.createElement('li');
      commentRoot.className = 'social__comment';

      var socialPicture = document.createElement('img');
      socialPicture.className = 'social__picture';
      socialPicture.src = comment.avatar;
      socialPicture.alt = comment.name;
      socialPicture.width = '35'; // px
      socialPicture.height = '35'; // px

      var commentBody = document.createElement('p');
      commentBody.className = 'social__text';
      commentBody.innerText = comment.message;

      commentRoot.append(socialPicture, commentBody);
      return commentRoot;
    }
  };
})();
