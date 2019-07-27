'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElement = document.querySelector('.ad-form__element');
  var adForm = document.querySelector('.ad-form');

  var nonActivateMap = function () {
    map.classList.add('map--faded');
    adFormHeader.classList.add('ad-form-header--disabled');
    adFormElement.classList.add('ad-form__element--disabled');
    mapFilters.classList.add('map__filters--disabled');
  };

  nonActivateMap();

  var createListElementOnce = (function () {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        window.createListElement();
      }
    };
  })();

  var onMapPinMainClick = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormHeader.classList.remove('ad-form-header--disabled');
    adFormElement.classList.remove('ad-form__element--disabled');
    mapFilters.classList.remove('map__filters--disabled');

    createListElementOnce();
  };

  var address = document.querySelector('#address');

  var setValues = function () {
    var x = mapPinMain.getBoundingClientRect().left - 32.5 + window.scrollX;
    var y = mapPinMain.getBoundingClientRect().top - 87 + window.scrollY;
    address.value = [x, y];
  };

  setValues();

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      onMapPinMainClick();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var y1 = mapPinMain.offsetTop - shift.y;
      var x1 = mapPinMain.offsetLeft - shift.x;

      if (y1 > window.data.YMIN && y1 < window.data.YMAX && x1 > window.data.XMIN && x1 < window.data.XMAX - 62) {
        mapPinMain.style.top = y1 + 'px';
        mapPinMain.style.left = x1 + 'px';
      }

      setValues();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      setValues();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mapPinMain.addEventListener('mouseup', function () {
    setValues();
  });
})();
