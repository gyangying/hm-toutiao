import Vue from 'vue'
import App from './App.vue'
import MyBread from '@/components/my-bread'
import plugin from '@/plugin'

import axios from '@/api'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'

Vue.use(plugin)
Vue.component('my-bread', MyBread)
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
