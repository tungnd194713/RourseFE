import Vue from 'vue'
import App from './App.vue'
import { ApiService } from '@/services';
import routers from './routes'
import VueRouter from 'vue-router'

ApiService.init()
ApiService.setHeader()

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routers,
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
