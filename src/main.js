// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

//引入路由
import router from './router/index'
import store from './store/index'
//引入mockjs数据，只需要加载一次即可，例如一些css样式文件
import './mock/mockServer'
//按需引入
import {Dialog, Button, Icon} from 'vant'
import 'vant/lib/dialog/style'

[Dialog, Button, Icon]
  .forEach(item => Vue.use(item))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
