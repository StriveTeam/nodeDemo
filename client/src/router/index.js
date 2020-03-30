import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  // base: process.env.BASE_URL,
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // 设置title 是否登录判断等等
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
