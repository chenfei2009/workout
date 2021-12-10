import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'

// 引入公共样式
import '@/assets/css/base.css'
import '@/assets/css/normalize.css'

// 引入echarts
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts

import formateDate from './utils/formatDate.js'
Vue.prototype.$formateDate = formateDate

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
