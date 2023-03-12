import Vue from 'vue'
import App from './App.vue'
import router from './router' //路由
import store from './store' //vuex
import './plugins/element.js' //element ui
import './assets/css/common.scss' //公共sass
import './assets/css/eightysix.css' //公共css
import './assets/css/reset.css' //样式初始化css
import './assets/css/wallpaper/animation.css' //样式初始化css
Vue.config.productionTip = false
Vue.mixin(require('./assets/js/information.js'));//文件注入

import request from "./assets/js/axios"; //请求
Vue.prototype.$axios = request;
import all from "./assets/js/all"; //公共方法
Vue.prototype.$all = all;

window.eventBus = new Vue();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
