import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import { ApiService } from '@/services';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

ApiService.init()
ApiService.setHeader()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
