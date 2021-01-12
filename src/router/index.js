/*
* 路由器配置对象
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    name: 'Msite',
    meta:{
      temp:'临时信息'
    },
    component: () => import('../pages/Msite/Msite')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../pages/Search/Search')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../pages/Order/Order')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../pages/Profile/Profile')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login/Login')
  },
  {
    path: '/',
    redirect: '/msite'//设置默认重定向路径
  }
]
//向外默认暴露一个路由器对象
export default new VueRouter({
  routes
})
