'use strict';

(function () {
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

  window.createListElement = function () {
    var fragment = document.createDocumentFragment();
    var arrAnnounces = window.createAnnounces();

    for (var i = 0; i < arrAnnounces.length; i++) {
      fragment.appendChild(renderPin(arrAnnounces[i]));
    }
    similarListElement.appendChild(fragment);
  };
})();
