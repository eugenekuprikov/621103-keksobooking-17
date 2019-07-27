'use strict';

(function () {
  var selectType = document.querySelector('#type');
  var price = document.querySelector('#price');
  price.setAttribute('min', '0');

  var changePrice = function () {
    var typeOpt = selectType.options[selectType.selectedIndex].value;
    if (typeOpt === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    }
    if (typeOpt === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    }
    if (typeOpt === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    }
    if (typeOpt === 'palace') {
      price.min = 10000;
      price.placeholder = '10000';
    }
    return price.placeholder;
  };

  selectType.addEventListener('change', changePrice);

  var timeIn = document.querySelector('#timein');
  var timeOut = document. querySelector('#timeout');

  var synchronizeDateIn = function () {
    var val = timeIn.value;
    var options = timeOut.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        options[i].selected = true;
      }
    }
  };

  timeIn.addEventListener('change', synchronizeDateIn);

  var synchronizeDateOut = function () {
    var val = timeOut.value;
    var options = timeIn.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        options[i].selected = true;
      }
    }
  };

  timeOut.addEventListener('change', synchronizeDateOut);

  var titleInput = document.querySelector('#title');
  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Имя должно состоять минимум из тридцати символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  price.addEventListener('invalid', function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity('Значение превосходит максимальную цену');
    } else if (price.validity.valueMissing) {
      price.setCustomValidity('Обязательное поле');
    } else {
      price.setCustomValidity('');
    }
  });

  selectType.addEventListener('invalid', function () {
    if (selectType.options[selectType.selectedIndex].value === '') {
      selectType.setCustomValidity('Выберите тип жилья');
    }
  });
})();
