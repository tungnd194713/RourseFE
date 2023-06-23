import Vue from 'vue'
import App from './App.vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

Vue.prototype.$videojs = videojs

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
