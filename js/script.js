'use strict';

(function () {

  var buttonOopen = document.querySelector('.btn-feedback-open');
  var feedback = document.querySelector('.feedback');
  var overlay = document.querySelector('.overlay');
  var buttonClose = feedback.querySelector('.close-feedback');

  var closeFeedback = function(evt) {
    evt.preventDefault();
    feedback.classList.remove('open-popup');
    overlay.classList.remove('open-overlay');
    buttonOopen.addEventListener('click', openFeedback);
    buttonClose.removeEventListener('click', closeFeedback);
  }

  var openFeedback = function(evt) {
    evt.preventDefault();
    feedback.classList.add('open-popup');
    overlay.classList.add('open-overlay');
    buttonOopen.removeEventListener('click', openFeedback);
    buttonClose.addEventListener('click', closeFeedback);
  }

  buttonOopen.addEventListener('click', openFeedback);

})();
