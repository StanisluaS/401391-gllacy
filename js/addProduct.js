'use strict';

(function () {

  var productList = document.querySelector('.product-list');
  var buttonsChoice = productList.querySelectorAll('.choice-basket');
  var basket = document.querySelector('.basket');
  var basketLink = basket.querySelector('.basket-link');
  var amountProduct = basket.querySelector('.amount-product');

  var removeProduct = function (evt) {
	  evt.preventDefault();
	  var target = evt.target;
  	var el = target;
	  while(true) {
	    el = el.parentElement;
	    if(el.parentElement.className === 'basket-product') {
		    el.parentElement.remove();
		    var textAmout = amountProduct.textContent.split(' ');
		    var sumProduct = textAmout[0] - 1;
		    if(sumProduct === 1) {
		      amountProduct.textContent = sumProduct + ' товар';
		    } else if(sumProduct > 1 && sumProduct < 5) {
		      amountProduct.textContent = sumProduct + ' товара';
		    } else {
		      amountProduct.textContent = sumProduct + ' товаров';
		    }
	    	var basketProduct = basket.querySelectorAll('.basket-product')
	  	  if(!basketProduct.length) {
		      document.querySelector('.basket-wrapper').remove();
		      basket.classList.remove('basket-full');
		      basketLink.classList.remove('basket-link-full');
		      amountProduct.textContent = 'Пусто';
		    }
        return;
	    }
  	}
  };

  var addProduct = function (evt) {
	  evt.preventDefault();
    if(!basket.classList.contains('basket-full')) {
      var basketWrapperTemplate = document.querySelector('#basket-wrapper-template').content.cloneNode(true);
	    basket.appendChild(basketWrapperTemplate);
      basket.classList.add('basket-full');
	    basketLink.classList.add('basket-link-full');
  	}
    var basketList = basket.querySelector('.basket-list');
    var basketProductTemplate = document.querySelector('#basket-product-template').content.cloneNode(true);
    basketList.appendChild(basketProductTemplate);
    var buttonsDelete = basketList.querySelectorAll('.btn-delete');
    [].forEach.call(buttonsDelete, function(el) {
      el.addEventListener('click', removeProduct);
    })

	  var textAmout = +amountProduct.textContent.split(' ')[0] || 0;
	  var sumProduct = textAmout + 1;
	  if(sumProduct === 1) {
		  amountProduct.textContent = sumProduct + ' товар';
	  } else if(sumProduct > 1 && sumProduct < 5) {
		  amountProduct.textContent = sumProduct + ' товара';
  	} else {
		  amountProduct.textContent = sumProduct + ' товаров';
	  }


  };

  // [].forEach.call(buttonsDelete, function(el){
  // 	el.addEventListener('click', removeProduct);
  // });

  [].forEach.call(buttonsChoice, function(el){
  	el.addEventListener('click', addProduct);
  });

})();
