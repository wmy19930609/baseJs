
window.Echo = (function (window, document, undefined) {

  'use strict';

  var store = [], offset, throttle, poll;

  var _inView = function (el) {
    // 判断是否出现在视野里
    var coords = el.getBoundingClientRect();
    return (
      (coords.top >= 0 && coords.left >= 0 && coords.top) 
        <= 
      (window.innerHeight || document.documentElement.clientHeight) + parseInt(offset)
    );
  };
  var _isDeal = function(el){
    // 有没有被替换掉
      return el.getAttribute('src') === el.getAttribute('data-echo');
  }
  var _pollImages = function () {
    for (var i = store.length; i--;) {
      var self = store[i];
      if (!_isDeal(self) && _inView(self)) {
        // 出现在视野里且没有被替换成相应图片
        self.src = self.getAttribute('data-echo');
        store.splice(i, 1);
      }
    }
  };

  var _throttle = function () {
    clearTimeout(poll);
    poll = setTimeout(_pollImages, throttle);
  };

  var init = function (obj) {
    var nodes = document.querySelectorAll('[data-echo]');
    var opts = obj || {};
    offset = opts.offset || 0;
    throttle = opts.throttle || 250;

    for (var i = 0; i < nodes.length; i++) {
      // 都存在store里面
      store.push(nodes[i]);
    }

    _throttle();

    if (document.addEventListener) {
      window.addEventListener('scroll', _throttle, false);
    } else {
      window.attachEvent('onscroll', _throttle);
    }
  };

  return {
    init: init,
    render: _throttle
  };

})(window, document);
