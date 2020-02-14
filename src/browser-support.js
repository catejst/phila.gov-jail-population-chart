function isIE() {
  var ua = navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;

  if (is_ie) {
    require('../node_modules/core-js/modules/es6.promise.js');
    require('../node_modules/core-js/modules/es6.map.js');
    require('../node_modules/core-js/modules/es7.promise.finally.js');
    require('../node_modules/core-js/modules/es7.promise.try.js');
    require('../node_modules/core-js/modules/es7.error.is-error.js');


    
    
    // require("./polyfills/Promise.prototype.finally.js");
  }
}

export default {
  isIE,
};