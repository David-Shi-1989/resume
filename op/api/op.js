import Axios from './index'

export function login (username, password) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/login', {username, password}).then((res, req) => {
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

// 标签
export function getTag () {
  return new Promise(function (resolve) {
    Axios.get('/api/op/tag').then(res => {
      resolve(res.data)
    })
  })
}
export function createTag (name) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/tag', {name}).then(res => {
      resolve(res.data)
    })
  })
}
// 文章
export function getArticle ({page, size}) {
  return new Promise(function (resolve) {
    Axios.get('/api/op/article', {params: {page, size}}).then(res => {
      resolve(res.data)
    })
  })
}
export function getArticleById (id) {
  return new Promise(function (resolve) {
    Axios.get('/api/op/article/' + id).then(res => {
      resolve(res.data && res.data.length > 0 ? res.data[0] : null)
    })
  })
}
export function createArticle ({title, tagList, isTop, isDraft, content, summary}) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article', {title, tagList, isTop, isDraft, content, summary}).then(res => {
      resolve(res.data)
    })
  })
}
