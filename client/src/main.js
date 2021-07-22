import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'
import './assets/zepto'
import './init.js'
import MyPlugin from './myplugin'
import './assets/css/common.scss'
import './assets/icon/iconfont.css'

Vue.use(MyPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
