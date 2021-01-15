// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//引入路由
import router from './router/index'
import store from './store/index'

import {Button, Dialog} from 'vant'
import 'vant/lib/button/style'
import 'vant/lib/dialog/style'

Vue.use(Button)
Vue.use(Dialog)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
