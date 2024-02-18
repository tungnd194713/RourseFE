import { UserService } from '@/services'
import router from '@/routes'

import {
  ACTION_LOGIN_USER,
  CLEAR_DATA_LOGOUT,
  UPDATE_PROFILE,
  ACTION_USER_LOGOUT
} from './actions'

import { SAVE_AUTH_USER, SET_ACCESS_TOKEN } from './mutations'

const data_state = {
  authUser: null
}

const getters = {
  authMe(state) {
    return state.authUser
  },
  authUser(state) {
    return (state.authUser && state.authUser.id) ? state.authUser : JSON.parse(localStorage.getItem('userInfo'));
  },
	accessToken(state) {
		return state.accessToken ? state.accessToken : localStorage.getItem('accessToken')
	}
}
const actions = {
  async [ACTION_LOGIN_USER](context, payload) {
    const {data} = await UserService.login(payload)
    console.log(data)
    if (data && data.user && data.user.id) {
			context.commit(SAVE_AUTH_USER, data.user);
      context.commit(SET_ACCESS_TOKEN, data.tokens?.access.token);
    }
  },
  [CLEAR_DATA_LOGOUT](context) {
    context.commit(SAVE_AUTH_USER, null)
    context.commit(SET_ACCESS_TOKEN, null)
    router.push({path: '/'}, () => {
    })
  },
  [UPDATE_PROFILE](context, payload) {
    context.commit(SAVE_AUTH_USER, payload);
  },
  [ACTION_USER_LOGOUT](context) {
    context.commit(SAVE_AUTH_USER, null)
    context.commit(SET_ACCESS_TOKEN, null)
  },
}

const mutations = {
  [SAVE_AUTH_USER](state, data) {
    state.authUser = data ? data : null
    if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data))
    } else {
      localStorage.removeItem('userInfo')
    }
  },
  [SET_ACCESS_TOKEN](state, access_token) {
    state.accessToken = access_token ? access_token : null
    if (access_token) {
      localStorage.setItem('accessToken', access_token)
    } else {
      localStorage.removeItem('accessToken')
    }
  },
}

export default {
  state: data_state,
  actions,
  mutations,
  getters
}
