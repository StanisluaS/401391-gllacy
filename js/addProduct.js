'use strict';

(function () {

  var productList = document.querySelector('.product-list');
  var buttonsChoice = productList.querySelectorAll('.choice-basket');
  var basket = document.querySelector('.basket');
  var basketLink = basket.querySelector('.basket-link');
  var amountProduct = basket.querySelector('.amount-product');
  var basketProduct = basket.querySelectorAll('.basket-product');
  var buttonsDelete = basket.querySelectorAll('.btn-delete') || null;

//функция добовляет обертку для корзины
  var addWrapperList = function () {
    var basketWrapperTemplate = document.querySelector('#basket-wrapper-template').content.cloneNode(true);
    basket.appendChild(basketWrapperTemplate);
    basket.classList.add('basket-full');
    basketLink.classList.add('basket-link-full');
  };

//функция добовляет все данные от товаре в корзину
  var addDataProduct = function (picture, name, price) {
    var basketList = basket.querySelector('.basket-list');
	  var totalBasketPrice = basket.querySelector('.basket-sum');
	  var sum = +totalBasketPrice.textContent.replace(' руб.', '');
    var basketProductTemplate = document.querySelector('#basket-product-template').content.cloneNode(true);
  	var productBasketPicture = basketProductTemplate.querySelector('img');
	  var productBasketName = basketProductTemplate.querySelector('.product-name').children[0];
	  var productBasketPrice = basketProductTemplate.querySelector('.price-kilo');
	  var productBasketTotalPrice = basketProductTemplate.querySelector('.price-total');
    var productButtonDelete = basketProductTemplate .querySelector('.btn-delete');

    productBasketPicture.setAttribute('src', picture);
	  productBasketName.textContent = name;
	  productBasketPrice.textContent = price + ' руб';
	  productBasketTotalPrice.textContent = 1.5 * price + ' руб.';
	  totalBasketPrice.textContent = sum + 1.5 * price + ' руб.';
    productButtonDelete.addEventListener('click', removeProduct);
    basketList.appendChild(basketProductTemplate);
  };

//функция убирает товар из корзины
  var removeProduct = function (evt) {
	  evt.preventDefault();
    var totalBasketPrice = basket.querySelector('.basket-sum');
	  var sum = +totalBasketPrice.textContent.replace(' руб.', '');
    var sumProduct = +amountProduct.textContent.split(' ')[0];
	  var target = evt.target;
    var parent = target.parentElement;
    var price = null;

    sumProduct -= 1;
    if(sumProduct === 1) {
      amountProduct.textContent = sumProduct + ' товар';
    } else if(sumProduct > 1 && sumProduct < 5) {
      amountProduct.textContent = sumProduct + ' товара';
    } else if(sumProduct >= 5){
      amountProduct.textContent = sumProduct + ' товаров';
    } else {
      document.querySelector('.basket-wrapper').remove();
      basket.classList.remove('basket-full');
      basketLink.classList.remove('basket-link-full');
      amountProduct.textContent = 'Пусто';
    }

	  while(true) {
      parent = parent.parentElement;
      if(parent.className === 'basket-product') {
        price = parent.querySelector('.price-total').textContent.replace(' руб.', '');
        totalBasketPrice.textContent = sum - price + ' руб.';
        parent.remove();
        return;
      }
	  }
  };

//функция добовляет товар в корзину
  var addProduct = function (evt) {
	evt.preventDefault();
	var parentElement = evt.target.parentElement;
	var pictureProduct = parentElement.querySelector('img').getAttribute('src');
	var nameProduct = parentElement.querySelector('.product-title').textContent;
	var priceProduct = parentElement.querySelector('.product-price').textContent.replace('₽/кг', '');
  var sumProduct = +amountProduct.textContent.split(' ')[0] || 0;

  sumProduct += 1;
  if(sumProduct === 1) {
    addWrapperList();
    amountProduct.textContent = sumProduct + ' товар';
  } else if(sumProduct > 1 && sumProduct < 5) {
    amountProduct.textContent = sumProduct + ' товара';
  } else {
    amountProduct.textContent = sumProduct + ' товаров';
  }
    addDataProduct(pictureProduct, nameProduct, priceProduct);
  };

  if(buttonsDelete) {
    [].forEach.call(buttonsDelete, function(el){
    	el.addEventListener('click', removeProduct);
    });
  }

  [].forEach.call(buttonsChoice, function(el){
  	el.addEventListener('click', addProduct);
  });

})();
