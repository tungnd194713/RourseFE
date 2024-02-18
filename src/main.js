import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import { ApiService } from '@/services';
import 'element-ui/lib/theme-chalk/index.css';
import routers from './routes'
import VueRouter from 'vue-router'
import authMiddleware from './authMiddleware';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import store from '@/stores'

Vue.use(ElementUI);

ApiService.init()
ApiService.setHeader()

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: routers,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    authMiddleware(to, from, next);
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
