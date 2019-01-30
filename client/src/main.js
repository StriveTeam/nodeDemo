import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './plugins/element.js';
import './assets/zepto';
import MyPlugin from './myplugin';
import './assets/css/common.scss';

Vue.use(MyPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
