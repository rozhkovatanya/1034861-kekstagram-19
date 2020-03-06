'use strict';

var renderPosts = function (posts) {
  var pictures = document.querySelector('.pictures');

  Array.from(pictures.childNodes).forEach(function (node) {
    if (node.classList && node.classList.contains('picture')) {
      pictures.removeChild(node);
    }
  });

  posts.forEach(function (post) {
    pictures.appendChild(window.picturePreview.createElement(post));
  });
};

var uploadPictureElement = document.querySelector('.img-upload__preview > img');
var uploadFileInput = document.querySelector('#upload-file');
uploadFileInput.addEventListener('change', function (e) {
  switch (e.target.files[0] && e.target.files[0].type) {
    case 'image/png':
    case 'image/jpeg':
      uploadPictureElement.src = URL.createObjectURL(e.target.files[0]);
      window.uploadModal.open();
      break;
    default:
      window.errorMessage.show();
  }
});

var filters = document.querySelector('.img-filters');
var filterDefault = document.querySelector('#filter-default');
var filterRandom = document.querySelector('#filter-random');
var filterDiscussed = document.querySelector('#filter-discussed');

var onDefaultFilterClick = function () {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  window.debounce(renderPosts(window.globalState.posts));
};

filterDefault.addEventListener('click', onDefaultFilterClick);

filterRandom.addEventListener('click', function () {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
  var randomPosts = [];

  while (randomPosts.length < 10) {
    var post = window.utils.getRandomArrayElement(window.globalState.posts);
    if (!randomPosts.includes(post)) {
      randomPosts.push(post);
    }
  }

  window.debounce(renderPosts(randomPosts));
});

filterDiscussed.addEventListener('click', function () {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
  var sortedPosts = window.globalState.posts.concat().sort(function (current, next) {
    return next.comments.length - current.comments.length;
  });
  window.debounce(renderPosts(sortedPosts));
});

window.request.get('https://js.dump.academy/kekstagram/data', function (posts) {
  window.globalState.posts = posts;
  filters.classList.remove('img-filters--inactive');
  onDefaultFilterClick();
}, function (error) {
  // eslint-disable-next-line
  console.error(error);
});

var pictures = document.querySelector('.pictures');

pictures.addEventListener('click', function (evt) {
  var target = evt.target;
  var pictureContainer = target.closest('.picture');
  if (pictureContainer) {
    var post = window.globalState.postsToImgMapping[pictureContainer.dataset.url];
    window.bigPicture.render(post);
  }
});


