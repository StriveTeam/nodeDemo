const Home = () => import('@/views/Home.vue');

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/addUser',
    name: 'addUser',
    component: () => import('@/views/user/addUser.vue')
  },
  {
    path: '/goods',
    name: 'goodsList',
    component: () => import('@/views/goods/list.vue')
  }
];
