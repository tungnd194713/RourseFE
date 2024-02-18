import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/stores/common'
import auth_users from '@/stores/auth_users'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    auth_users,
  }
})

export default store
