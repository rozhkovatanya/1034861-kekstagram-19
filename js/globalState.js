'use strict';

(function () {
  window.globalState = {
    postsToImgMapping: {},
    posts: []
  };
})();


/*
*
*
*   picture { url: '1' } ==> get '1' from postsToImgMapping ==> you have post ==> render big picture using this post data
*
* */
