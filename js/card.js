'use strict';

(function () {
  window.createAnnounces = function () {
    var announces = [];
    var ranNums = window.shuffle(window.data.NUMBERS);
    for (var i = 0; i < 8; i++) {
      var announce = {
        author: {
          avatar: 'img/avatars/user' + '0' + ranNums[i] + '.png'
        },
        offer: {
          type: window.data.PLACES[window.getArrayRandomElement(0, 4)]
        },
        location: {
          x: window.getArrayRandomElement(window.data.XMIN, window.data.XMAX),
          y: window.getArrayRandomElement(window.data.YMIN, window.data.YMAX)
        }
      };
      announces[i] = announce;
    }
    return announces;
  };
})();
