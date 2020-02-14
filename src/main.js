// import BrowserSupport from  "./browser-support.js";
// BrowserSupport.isIE();

import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#vue-app')