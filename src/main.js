import Vue from 'vue'
import App from './App.vue'
import { ApiService } from '@/services';

ApiService.init()
ApiService.setHeader()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
