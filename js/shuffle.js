'use strict';

(function () {
  window.shuffle = function (arr) {
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

  // var ranNums = shuffle(NUMBERS);

  window.getArrayRandomElement = function (max, min) {
    var randomElement = Math.floor(Math.random() * (max - min) + min);
    return randomElement;
  };
})();
