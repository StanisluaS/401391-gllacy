'use strict';

(function () {

  var productList = document.querySelector('.product-list');
  var buttonsChoice = productList.querySelectorAll('.choice-basket');
  var basket = document.querySelector('.basket');
  var buttonsDelete = basket.querySelectorAll('.btn-delete');
  var basketLink = basket.querySelector('.basket-link');
  var amountProduct = basket.querySelector('.amount-product');
  
  var addProduct = function (evt) {
	evt.preventDefault();
	var textAmout = +amountProduct.textContent.split(' ')[0] || 0;
	var sumProduct = textAmout + 1;
	if(sumProduct === 1) {
		  amountProduct.textContent = sumProduct + ' товар';
	} else if(sumProduct > 1 && sumProduct < 5) {
		  amountProduct.textContent = sumProduct + ' товара';
	} else {
		  amountProduct.textContent = sumProduct + ' товаров';
	}
	
	if(!basket.classList.contains('basket-full')) {
	  basket.classList.add('basket-full');
	  basketLink.classList.add('basket-link-full');
	  var div = document.createElement('div');
	  var table = document.createElement('table');
	  var basketPrice = document.createElement('p');
	  var linkButton = document.createElement('a');
	  div.classList.add('basket-wrapper');
	  table.classList.add('basket-list');
	  basketPrice.classList.add('basket-price');
	  linkButton.classList.add('btn');
      linkButton.classList.add('btn-basket'); 
      linkButton.textContent = 'Оформить заказ'; 	  
	  div.appendChild(table);
	  div.appendChild(basketPrice);
	  div.appendChild(linkButton);
	  basket.appendChild(div);
	}
  };
  
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
  
  [].forEach.call(buttonsDelete, function(el){
	el.addEventListener('click', removeProduct);
  });
  
  [].forEach.call(buttonsChoice, function(el){
	el.addEventListener('click', addProduct);
  });

})();
