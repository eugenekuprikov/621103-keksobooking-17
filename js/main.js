'use strict';

var NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var PLACES = ['palace', 'flat', 'house', 'bungalo'];

var shuffle = function (arr) {
  var i = arr.length;
  var j = 0;
  var temp;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

var ranNums = shuffle(NUMBERS);

var getArrayRandomElement = function (max, min) {
  var randomElement = Math.floor(Math.random() * (max - min) + min);
  return randomElement;
};

var createAnnounces = function () {
  var announces = [];
  for (var i = 0; i < 8; i++) {
    var announce = {
      author: {
        avatar: 'img/avatars/user' + '0' + ranNums[i] + '.png'
      },
      offer: {
        type: PLACES[getArrayRandomElement(0, 4)]
      },
      location: {
        x: getArrayRandomElement(0, 1199),
        y: getArrayRandomElement(130, 630)
      }
    };
    announces[i] = announce;
  }
  return announces;
};

var arrAnnounces = createAnnounces();

document.querySelector('.map').classList.remove('map--faded');
var similarListElement = document.querySelector('.map__pins');
var similarPinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.x - 25 + 'px';
  pinElement.style.top = pin.location.y - 70 + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = 'Заголовок объявления';

  return pinElement;
};

var createListElement = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrAnnounces.length; i++) {
    fragment.appendChild(renderPin(arrAnnounces[i]));
  }
  similarListElement.appendChild(fragment);
};

var adFormHeader = document.querySelector('.ad-form-header');
var adFormElement = document.querySelector('.ad-form__element');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');

var nonActivateMap = function () {
  map.classList.add('map--faded');
  adFormHeader.classList.add('ad-form-header--disabled');
  adFormElement.classList.add('ad-form__element--disabled');
  mapFilters.classList.add('map__filters--disabled');
};

nonActivateMap();

var onMapPinMainClick = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.classList.remove('ad-form-header--disabled');
  adFormElement.classList.remove('ad-form__element--disabled');
  mapFilters.classList.remove('map__filters--disabled');

  createListElement();
};

var address = document.querySelector('#address');

var setValues = function () {
  var x = mapPinMain.getBoundingClientRect().left - 32.5 + window.scrollX;
  var y = mapPinMain.getBoundingClientRect().top - 87 + window.scrollY;
  address.value = [x, y];
};

setValues();

mapPinMain.addEventListener('mouseup', function () {
  onMapPinMainClick();
  setValues();
});

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
titleInput.addEventListener('invalid', function (evt) {
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

price.addEventListener('invalid', function (evt) {
  if (price.validity.rangeOverflow) {
    price.setCustomValidity('Значение превосходит максимальную цену');
  } else if (price.validity.valueMissing) {
    price.setCustomValidity('Обязательное поле');
  } else {
    price.setCustomValidity('');
  }
});

selectType.addEventListener('invalid', function (evt) {
  if (selectType.options[selectType.selectedIndex].value === '') {
    selectType.setCustomValidity('Выберите тип жилья');
  }
});
