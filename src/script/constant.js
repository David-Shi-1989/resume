export const LANG = {
  zhCN: 1, enUS: 2
}

export const THEME = {
  light: 1, dark: 2
}

export const LocalStorage_key_userInfo = '_sww_user_info'

export const LocalStorage_article_like = '_sww_article_like'

export const Cookie_Visit = '_sww_visit_log'

export function getLocalStorageArticleLikeList () {
  return JSON.parse(localStorage.getItem(LocalStorage_article_like) || '[]')
}
export function addLocalStorageArticleLike (id) {
  const list = getLocalStorageArticleLikeList()
  if (!list.includes(id)) {
    list.push(id)
  }
  localStorage.setItem(JSON.stringify(list))
}
