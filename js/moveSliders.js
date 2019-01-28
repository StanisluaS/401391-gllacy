'use strict';

(function () {

  var FACTOR = 500 / 115;
  var filterPrice = document.querySelector('.filter-price');
  var sliders = filterPrice.querySelectorAll('button');
  var min = filterPrice.querySelector('.min');
  var max = filterPrice.querySelector('.max');
	var minMax = filterPrice.querySelector('.min-max');
  var line = minMax.querySelector('.line');
  var priceMin = filterPrice.querySelector('.price-min');
  var priceMax = filterPrice.querySelector('.price-max');
	var inputMin = filterPrice.querySelector('.input-min');
	var inputMax = filterPrice.querySelector('.input-max');

  var moveSlider = function (evt) {

	evt.preventDefault();
	var target = evt.target;
	var result = null;
	var value = null;
	var startCoords = evt.clientX;
	var minMaxeWidth = minMax.clientWidth;
	var lineWidth = line.clientWidth;

	var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = startCoords - moveEvt.clientX;
        startCoords = moveEvt.clientX;
        result = target.offsetLeft - shift;
				switch (target.className) {
					case 'min':
						target.style.zIndex = 2;
						if(result < (-10)) {
							result = -10;
						} else if (result > max.offsetLeft) {
							result = max.offsetLeft;
						}
						line.style.left = (result + 10) + 'px';
						line.style.width = (max.offsetLeft - result) + 'px';
						value = Math.round((min.offsetLeft + 10) * FACTOR);
						inputMin.value = value;
						priceMin.textContent = value + ' руб.';
						break;
					case 'max':
						min.style.zIndex = 1;
						if(result < min.offsetLeft) {
							result = min.offsetLeft;
						} else if (result > (minMaxeWidth - 10)) {
							result = minMaxeWidth -10;
						}
						line.style.width = (result - min.offsetLeft) + 'px';
						value = Math.round((max.offsetLeft + 10) * FACTOR);
						inputMax.value = value;
						priceMax.textContent = value + ' руб.';
						break;
				}
        target.style.left = result + 'px';
      };
	var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  };

  [].forEach.call(sliders, function(el) {
		el.addEventListener('mousedown', moveSlider);
	})

})();
