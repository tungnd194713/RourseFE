import {
  ACTION_SET_ERROR,
  ACTION_CLEAR_ERROR,
  ACTION_SET_LOADING,
  ACTION_FINISH_LOADING,
  ACTION_CLEAR_LOADING,
  ACTION_SET_MESS,
  ACTION_CLEAR_MESS,
} from '@/stores/common/actions'

import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  FINISH_LOADING,
  CLEAR_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from '@/stores/common/mutations'

const data = {
  loading: 0,
  message: null,
  error: null,
}

const getters = {
  isLoading(state) {
    return state.loading > 0
  },
  error(state) {
    return state.error
  },
  message(state) {
    return state.message
  }
}

const actions = {
  [ACTION_SET_ERROR](context, error) {
    context.commit(SET_ERROR, error);
  },
  [ACTION_CLEAR_ERROR](context) {
    context.commit(CLEAR_ERROR);
  },
  [ACTION_SET_LOADING](context) {
    context.commit(SET_LOADING)
  },
  [ACTION_FINISH_LOADING](context) {
    context.commit(FINISH_LOADING)
  },
  [ACTION_CLEAR_LOADING](context) {
    context.commit(CLEAR_LOADING)
  },
  [ACTION_SET_MESS](context, message) {
    context.commit(SET_MESSAGE, message)
  },
  [ACTION_CLEAR_MESS](context) {
    context.commit(CLEAR_MESSAGE)
  },
}

const mutations = {
  [SET_LOADING](state) {
    state.loading++
  },
  [FINISH_LOADING](state) {
    if (state.loading > 0) {
      state.loading--
    }
  },
  [CLEAR_LOADING](state) {
    state.loading = 0
  },
  [SET_MESSAGE](state, message) {
    state.message = message
  },
  [CLEAR_MESSAGE](state) {
    state.message = null
  },
  [SET_ERROR](state, error) {
    state.error = error
  },
  [CLEAR_ERROR](state) {
    state.error = null
  }
}

export default {
  state: data,
  getters,
  actions,
  mutations
}
