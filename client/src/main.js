import '@babel/polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './plugins/element.js';
import './assets/zepto';
import './init.js';
import MyPlugin from './myplugin';
import './assets/css/common.scss';

// import VueSocketio from 'vue-socket.io';
// Vue.use(new VueSocketio({
//   debug: true,
//   connection: 'localhost:8888'
// }));

Vue.use(MyPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
