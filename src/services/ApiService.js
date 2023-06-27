import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '@/stores'
import { ACTION_SET_ERROR, ACTION_SET_LOADING, ACTION_FINISH_LOADING } from '@/stores/common/actions'
import {
  NO_INTERNET,
  UNAUTHENTICATED,
  FORBIDDEN,
  SERVER_ERROR
} from '@/commons/messages'

const ApiService = {
  init() {
    const service = this
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL
    // intercept every request
    Vue.axios.interceptors.request.use(
      (request) => {
        const accessToken = store.getters.accessToken || localStorage.getItem('accessToken')
        if (accessToken) {
          request.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
        if (request.setLoading) {
          store.dispatch(ACTION_SET_LOADING)
        }
        return request
      },
      (error) => {
        const { response } = error;
        if (response.config.setLoading) {
          store.dispatch(ACTION_FINISH_LOADING)
        }
        // Do something with request error
        return Promise.reject(response)
      }
    )
    // intercept every response
    Vue.axios.interceptors.response.use(
      (response) => {
        const { config } = response;
        if (config.setLoading) {
          store.dispatch(ACTION_FINISH_LOADING)
        }
        return response
      },
      (error) => {
        const { response, config } = error;
        if (config.setLoading) {
          store.dispatch(ACTION_FINISH_LOADING)
        }
        // check if config errorHandler is on
        if (config.globalErrorHandler.on) {
          service.handleError(response, config.globalErrorHandler.exclude)
        }
        return Promise.reject(response)
      })
  },
  setHeader() {
    Vue.axios.defaults.withCredentials = false
    Vue.axios.defaults.headers.common[
      'Content-Type'
      ] = 'application/json'
    Vue.axios.defaults.headers.common[
      'Accept'
      ] = 'application/json'
    Vue.axios.defaults.setLoading = true;
    Vue.axios.defaults.globalErrorHandler = {
      on: true,
      exclude: [],
    };
    // Vue.axios.defaults.headers.common.Authorization = `Bearer ${ACCESS _TOKEN}`
  },
  setHeaderImage(type) {
    Vue.axios.defaults.headers.common[
      'Content-Type'
      ] = type
  },
  setResponseType(type) {
    Vue.axios.defaults.responseType = type
  },
  get(resource, params, config = {}) {
    return Vue.axios.get(resource, { params: params }, config)
  },
  getFile(resource, params, config = {}) {
    return Vue.axios.get(resource, params, config)
  },
  post(resource, params, config = {}) {
    return Vue.axios.post(`${resource}`, params, config)
  },
  update(resource, params, config = {}) {
    return Vue.axios.put(resource, params, config)
  },
  updateBulk(resource, params, config = {}) {
    return Vue.axios.put(resource, params, config)
  },
  delete(resource, payload, config = {}) {
    config = {data: payload, ...config} //Fix to get request body
    return Vue.axios.delete(resource, config)
  },
  customRequest(config) {
    return Vue.axios(config)
  },
  handleError(response, ignore = []) {
    if (ignore.length > 0 && ignore.includes(response.status)) return response
    let error = null
    if (!navigator.onLine || !response) {
      error = new Error(NO_INTERNET)
    } else {
      switch (response.status) {
        case 400:
          error = new Error(response.data.message)
          break;

        case 401:
          // store.dispatch(LOGOUT, response.status)
          error = new Error(UNAUTHENTICATED)
          break;

        case 403:
          error = new Error(FORBIDDEN)
          break;

        case 404:
          error = new Error(response.data.message)
          break;

        case 422:
          for (let er in response.data.data) {
            if (response.data.data[er][0]) {
              typeof response.data.data[er] !== 'string' ? Vue.$toast.error(response.data.data[er][0]) : Vue.$toast.error(response.data.data[er])
            }
            break;
          }
          break;

        default:
          error = new Error(SERVER_ERROR)
          break;
      }
    }
    store.dispatch(ACTION_SET_ERROR, error)
  }
}

export default ApiService
