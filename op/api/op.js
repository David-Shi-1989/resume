import Axios from './index'

export function login (username, password) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/login', {username, password}).then(res => {
      const isSuccess = res.data.isSuccess && res.data.login
      resolve(isSuccess ? res.data.userId : null)
    })
  })
}
export function logout (userId) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/logout', {userId}).then(res => {
      resolve(res.data.isSuccess)
    })
  })
}
