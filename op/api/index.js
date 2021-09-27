import axios from 'axios'
import Store from '../store/index'

const instance = axios.create({
  baseURL: '/',
  timeout: 60 * 1000
})

instance.interceptors.request.use(config => {
  if (Store.getters.userId) {
    config.headers.userId = Store.getters.userId
  }
  return config
})

instance.interceptors.response.use(response => {
  return response
})

export default instance
