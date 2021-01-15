/*
* 路由器配置对象
* */
import Vue from 'vue'
import VueRouter from 'vue-router'
//使用路由插件
Vue.use(VueRouter)

const routes = [
  //重定向的路径尽量放在前面,否则会不生效
  {
    path: '/',
    redirect: '/msite'//设置默认重定向路径
  },
  {
    path: '/msite',
    name: 'Msite',
    meta: {
      temp: '临时信息'
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
    path: '/shop',
    redirect: '/shop/goods'
  },
  {
    path: '/shop',
    component: () => import('../pages/Shop/Shop'),
    children: [
      {
        path: '/shop/goods',
        component: () => import('../pages/Shop/ShopGoods/ShopGoods')
      },
      {
        path: '/shop/ratings',
        component: () => import('../pages/Shop/ShopRatings/ShopRatings')
      },
      {
        path: '/shop/info',
        component: () => import('../pages/Shop/ShopInfo/ShopInfo')
      }
    ]
  }
]
//向外默认暴露一个路由器对象
export default new VueRouter({
  routes
})
