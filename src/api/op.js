import Axios from './index'

// 标签
export function getTag () {
  return new Promise(function (resolve) {
    Axios.get('/api/op/tag').then(res => {
      resolve(res.data)
    })
  })
}
// 文章
export function getArticle ({page, size}) {
  return new Promise(function (resolve) {
    Axios.get('/api/op/article', {params: {page, size}}).then(res => {
      const list = res.data
      list.forEach(item => {
        if (item.tags && typeof item.tags === 'string') {
          item.tags = item.tags.split(',')
        }
      })
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
export function createArticle ({id, title, tagList, isTop, isDraft, content}) {
  return new Promise(function (resolve) {
    Axios.post('/api/op/article', {id, title, tagList, isTop, isDraft, content}).then(res => {
      resolve(res.data)
    })
  })
}
