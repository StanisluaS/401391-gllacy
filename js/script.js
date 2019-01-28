'use strict';

(function () {

  var buttonOopen = document.querySelector('.btn-feedback-open');
  var feedback = document.querySelector('.feedback');
  var overlay = document.querySelector('.overlay');
  var buttonClose = feedback.querySelector('.close-feedback');
  var name = document.getElementById('feedback-name');
  var email = document.getElementById('feedback-email');
  var message = document.getElementById('feedback-message');
  var feedbackForm = feedback.querySelector('.feedback-form');
  var sliders = document.querySelector('.sliders');
  var switchs = sliders.querySelectorAll('.switch');
  var sliderItems = sliders.querySelectorAll('.slider-item');
  var body = document.querySelector('.index');
  var subscriptionForm = document.querySelector('.subscription-form');
  var subscriptionEmail = document.getElementById('email');
  var subscriptionButton = subscriptionForm.querySelector('.btn-form');

  var checkForm = function (evt) {
    if(!subscriptionEmail.value) {
      evt.preventDefault();
      subscriptionEmail.setCustomValidity('Это поле не должно быть пустым');
    } else if (subscriptionEmail.value) {
      var array = subscriptionEmail.value.split('@');
      if(!(array[1].indexOf('.') + 1)){
        evt.preventDefault();
        subscriptionEmail.setCustomValidity('Введите корректный адресс, после "' + array[1] + '" должна присутствовать точка');
      }
    }
  };

//переключение слайдов
  var makeSwitchSlider = function () {
    var number = null;
    [].forEach.call(switchs, function(el, index, array) {
      if(el.classList.contains('switch-active')) {
        el.classList.remove('switch-active');
        sliderItems[index].classList.remove('slider-active');
        body.classList.remove('bg' + (index + 1));
        if(index === (array.length - 1)) {
          index = -1;
        }
        number = index;
      }
    })
    switchs[number + 1].classList.add('switch-active');
    sliderItems[number + 1].classList.add('slider-active');
    body.classList.add('bg' + (number + 2));
  };

//переключение слайдов по нажатию кнопок
  var makeSwitch = function (evt) {
    evt.preventDefault();
    [].forEach.call(switchs, function(el, index) {
      el.classList.remove('switch-active');
      sliderItems[index].classList.remove('slider-active');
      body.classList.remove('bg' + (index + 1));
    });
    evt.target.classList.add('switch-active');
    [].forEach.call(switchs, function(el, index) {
      if(el.classList.contains('switch-active')) {
        sliderItems[index].classList.add('slider-active');
        body.classList.add('bg' + (index + 1));
      }
    })
  };

//проверка на валидность формы
  var makeCheck = function (evt) {
	    if (!name.value || !email.value || !message.value) {
        evt.preventDefault();
	      var widthFeedback = feedback.offsetWidth;
	      feedback.classList.remove('modal-error');
	      widthFeedback = feedback.offsetWidth;
        feedback.classList.add('modal-error');
      }
    };
//закрытие формы обратной связи
  var closeFeedback = function(evt) {
    evt.preventDefault();
    feedback.classList.remove('open-popup');
    feedback.classList.remove('modal-error');
    overlay.classList.remove('open-overlay');
    buttonOopen.addEventListener('click', openFeedback);
    buttonClose.removeEventListener('click', closeFeedback);
    buttonOopen.addEventListener('keydown', openPopup);
    window.removeEventListener('keydown', closePopup);
    feedbackForm.removeEventListener('submit', makeCheck);
  };

  var openPopup = function (evt) {
    if(evt.keyCode === 13) {
      evt.preventDefault();
      openFeedback(evt);
    }
  };

//открытие формы обратной связи
  var openFeedback = function(evt) {
    evt.preventDefault();
    feedback.classList.add('open-popup');
    overlay.classList.add('open-overlay');
    buttonOopen.removeEventListener('click', openFeedback);
    buttonClose.addEventListener('click', closeFeedback);
    buttonOopen.removeEventListener('keydown', openPopup);
    window.addEventListener('keydown', closePopup);
    feedbackForm.addEventListener('submit', makeCheck);
  };

  var closePopup = function (evt) {
    if(evt.keyCode === 27) {
      evt.preventDefault();
      closeFeedback(evt);
    }
  };

  setInterval(makeSwitchSlider, 5000);

  subscriptionEmail.addEventListener('input', function () {
    subscriptionEmail.setCustomValidity('');
  });
  subscriptionForm.addEventListener('submit', checkForm)
  buttonOopen.addEventListener('click', openFeedback);
  buttonOopen.addEventListener('keydown', openPopup);
  [].forEach.call(switchs, function(el) {
    el.addEventListener('click', makeSwitch)
  })

})();
