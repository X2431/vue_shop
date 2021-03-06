import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入默认样式
import './assets/css/global.css'
//导入字体图标样式
import './assets/font/iconfont.css'

import axios from 'axios'
//配置axios请求根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use((config) => {
  // 给每个请求添加token值
  config.headers.authorization = sessionStorage.getItem("token")
  // console.log(config);
  return config
})
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
