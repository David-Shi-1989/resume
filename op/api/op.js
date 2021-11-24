import Axios from './index'
import {DATETIME_FORMAT} from 'op/constant'
import {isArray} from 'lodash'

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
export function getTag (params = {}) {
  return new Promise(function (resolve) {
    let url = '/api/op/tag'
    if (params.id) {
      url += '/' + params.id
    }
    Axios.get(url).then(res => {
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
export function editTag (name, id) {
  return new Promise((resolve, reject) => {
    Axios.post('/api/op/tag', {id, name}).then(res => {
      resolve(res.data)
    })
  })
}
export function syncTag () {
  return new Promise(function (resolve) {
    Axios.post('/api/op/tag/async').then(res => {
      resolve(res.data)
    })
  })
}
export function deleteTag (id) {
  return new Promise((resolve, reject) => {
    Axios.delete('/api/op/tag/' + id).then(res => {
      resolve(res.data)
    })
  })
}
// 文章
export function getArticle ({page, size, type, tagIdList, search} = {}) {
  return new Promise(function (resolve) {
    Axios.get('/api/op/article', {params: {page, size, type, tagIdList, search}}).then(res => {
      let list = []
      if (isArray(res.data)) {
        list = res.data
      } else if (isArray(res.data.list)) {
        list = res.data.list
      }
      list.forEach(r => {
        r.create_datetime = formartDatetime(r.create_datetime)
      })
      resolve(res.data)
    })
  })
}
export function getArticleById (id) {
  return new Promise(function (resolve) {
    Axios.get('/api/op/article/' + id).then(res => {
      let article = res.data && res.data.length > 0 ? res.data[0] : null
      if (article) {
        article.create_datetime = formartDatetime(article.create_datetime)
      }
      resolve(article)
    })
  })
}
export function createArticle ({id, title, tagList, isTop, isDraft, html, md, summary}) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article', {id, title, tagList, isTop, isDraft, html, md, summary}).then(res => {
      resolve(res.data)
    })
  })
}
export function delteArticle (idList, isPermenent = false) {
  return new Promise(function (resolve) {
    Axios.delete('/api/op/article', {params: {idList, isPermenent}}).then(res => {
      resolve(res.data)
    })
  })
}
export function draftArticle (id) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article', {id, isEnable: true, isDraft: true}).then(res => {
      resolve(res.data)
    })
  })
}
export function publishArticle (id) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article', {id, isEnable: true, isDraft: false}).then(res => {
      resolve(res.data)
    })
  })
}
export function articleLike (id) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article/like', {id}).then(res => {
      resolve(res.data)
    })
  })
}
// web user
export function webUserCreate (name, avatar, email) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/webuser', {name, avatar, email}).then(res => {
      resolve(res.data)
    })
  })
}
// comment
export function getComment (resourceId = '') {
  return new Promise(function (resolve) {
    Axios.get('/api/op/comment', {params: {resourceId}}).then(res => {
      res.data.forEach(i => {
        i.create_datetime = (new Date(i.create_datetime)).format()
      })
      resolve(res.data)
    })
  })
}
export function addComment ({userId, content, resourceId, parentCommentId}) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/comment', {userId, content, resourceId, parentCommentId}).then(res => {
      resolve(res.data)
    })
  })
}

// work
export function getWorks () {
  return new Promise(function (resolve) {
    Axios.get('/api/op/work').then(res => {
      resolve(res.data)
    })
  })
}

function formartDatetime (dt) {
  return (new Date(dt)).format(DATETIME_FORMAT)
}