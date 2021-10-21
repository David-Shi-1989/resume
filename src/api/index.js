import axios from 'axios'

const instance = axios.create({
  baseURL: '/',
  timeout: 60 * 1000
})

instance.interceptors.response.use(response => {
  return response
})

export default instance
