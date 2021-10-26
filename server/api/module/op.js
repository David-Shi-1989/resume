const utils = require('../../utils')
const sqlUtils = require('../../sql/index')
const config = require('../../config')
const { sql } = require('../../utils')
const XSS = require('xss')

const Cache = {
  tag: null
}

module.exports = function (router) {
  router.get('/op/user', function (req, res, next) {
    sqlUtils.execute(`SELECT * from op_user WHERE is_enable > 0`).then(result => {
      utils.response(res, result)
    })
  })
  router.post('/op/login', function (req, res) {
    const {username, password} = req.body
    const sql = `SELECT * from ${utils.tableName.op_user} WHERE username = '${username}' AND password = '${password}' AND is_enable > 0`
    sqlUtils.execute(sql).then(result => {
      if (result.length === 1) {
        const userId = result[0].id
        req.session.user.username = username
        req.session.user.loginTime = Date.now()
        req.session.user.userId = userId
        utils.logger.login(username)
        logLoginRecord(userId, utils.getIpFromReq(req))
        utils.response(res, {isSuccess: true, login: true, userId})
      } else {
        req.session.user.loginFailTimes = req.session.user.loginFailTimes ? req.session.user.loginFailTimes + 1 : 1
        utils.response(res, {isSuccess: true, login: false})
      }
    })
  })
  router.post('/op/logout', function (req, res) {
    const {userId} = req.body
    if (userId == utils.getUserIdFromReq(req)) {
      delete req.session.user
      utils.response(res, {isSuccess: true})
    } else {
      utils.response(res, {isSuccess: true})
    }
  })
  // Tag
  router.get('/op/tag', async function (req, res) {
    getTagList().then(list => {
      utils.response(res, list)
    })
  })
  router.post('/op/tag', async function (req, res) {
    const {name} = req.body
    const resBody = {isSuccess: false}
    // check name is valid
    const nameCheckSql = `SELECT * FROM ${utils.tableName.op_tag} WHERE title='${name}' AND is_enable > 0`
    if (await sqlHasRecords(nameCheckSql)) {
      resBody.errorMsg = '标签名称重复'
      utils.response(res, resBody)
    } else {
      const newId = utils.uuid()
      const sql = `INSERT INTO ${utils.tableName.op_tag} (id,title,create_by,create_datetime) VALUES ('${newId}','${name}','${utils.getUserIdFromReq(req)}',NOW())`
      sqlUtils.execute(sql).then(result => {
        resBody.isSuccess = result.affectedRows > 0
        if (resBody.isSuccess) {
          resBody.id = newId
          Cache.tag = null
        }
        utils.response(res, resBody)
      })
    }
  })
  // Article
  router.get('/op/article', async function (req, res) {
    const {page, size, type} = req.query
    var sql = `SELECT id,title,tags,summary,create_datetime,visit_count,like_count,is_top,is_draft FROM ${utils.tableName.article}`
    const conditionArr = []
    if (type == 'draft') {
      conditionArr.push('is_enable > 0')
      conditionArr.push('is_draft > 0')
    } else if (type == 'dash') {
      conditionArr.push('is_enable <= 0')
    } else {
      conditionArr.push('is_enable > 0')
      conditionArr.push('is_draft <= 0')
    }
    sql += ` WHERE ${conditionArr.join(' AND ')}`
    sql += ` order by create_datetime DESC`
    if (page && size) {
      const total = await getTotalFromTable(utils.tableName.article, 'id', conditionArr)
      sql += ` LIMIT ${(page - 1) * size},${size}`
      sqlUtils.execute(sql).then(async list => {
        await parseArticleList(list)
        utils.response(res, {total, list, page, size})
      })
    } else {
      sqlUtils.execute(sql).then(async list => {
        await parseArticleList(list)
        utils.response(res, list)
      })
    }
  })
  router.get('/op/article/:id', function (req, res) {
    const {id} = req.params
    const sql = `SELECT * FROM ${utils.tableName.article} WHERE id='${id}' AND is_enable > 0`
    sqlUtils.execute(sql).then(async list => {
      await parseArticleList(list)
      utils.response(res, list)
    })
  })
  router.post('/op/article', async function (req, res) {
    const {id} = req.body
    if (id) {
      editArticle(res, req.body)
    } else {
      createArticle(res, req, req.body)
    }
    
  })
  router.delete('/op/article', function (req, res) {
    var {idList, isPermenent} = req.query
    isPermenent = (isPermenent === 'true')
    if (idList && idList.length > 0) {
      const idStr = idList.map(id => `'${id}'`).join(',')
      const sql = isPermenent ? `DELETE FROM ${utils.tableName.article} WHERE id IN (${idStr})` :
        `UPDATE ${utils.tableName.article} SET is_enable = 0 WHERE id IN (${idStr})`
      sqlUtils.execute(sql).then(result => {
        const isSuccess = result.affectedRows === idList.length, affectedRows = result.affectedRows
        if (isSuccess && !isPermenent) {
          changeTagReferCount(idList, -1)
        } else if (!isSuccess) {
          utils.logger.warn('删除文章失败', idList, affectedRows)
        }
        utils.response(res, {isSuccess, affectedRows})
      })
    }
  })
}
// 新建文章
async function createArticle (res, req, {title, tagList, isTop, isDraft, html, md, summary}) {
  const resBody = {isSuccess: false}
  // check title valid
  const titleCheckSql = `SELECT * FROM ${utils.tableName.article} WHERE title = '${title}' AND is_enable > 0`
  if (await sqlHasRecords(titleCheckSql)) {
    resBody.errorMsg = '文章标题重复'
    utils.response(res, resBody)
  } else {
    const newId = utils.uuid()
    const createSql = `INSERT INTO ${utils.tableName.article} 
    (id,title,tags,html,md,summary,create_by,create_datetime,is_top,is_draft) VALUES 
    ('${newId}','${XSS(title)}','${tagList.join(',')}','${XSS(html)}','${XSS(md)}','${XSS(summary||'')}','${utils.getUserIdFromReq(req)}',NOW(),${isTop ? 1 : 0},${isDraft ? 1 : 0})`
    sqlUtils.execute(createSql).then(result => {
      resBody.isSuccess = result.affectedRows > 0
      if (resBody.isSuccess) {
        changeTagReferCount(tagList, 1)
      }
      utils.response(res, resBody)
    })
  }
}
// 编辑文章
async function editArticle (res, {id, title, tagList, isTop, isDraft, html, md, summary, isEnable}) {
  const resBody = {isSuccess: false}
  // check title valid
  const titleCheckSql = `SELECT * FROM ${utils.tableName.article} WHERE title = '${title}' AND is_enable > 0 AND id NOT IN ('${id}')`
  if (await sqlHasRecords(titleCheckSql)) {
    resBody.errorMsg = '文章标题重复'
    utils.response(res, resBody)
  } else {
    var createSql = `UPDATE ${utils.tableName.article} SET `
    const setArr = [
      title ? `title='${XSS(title)}'` : '',
      tagList ? `tags='${tagList.join(',')}'` : '',
      html ? `'${XSS(html)}'` : '',
      md ? `'${XSS(md)}'` : '',
      summary ? `'${XSS(summary||'')}'` : '',
      'modify_datetime=NOW()',
      typeof(is_top) === 'boolean' ? `is_top=${isTop ? 1 : 0}` : '',
      typeof(isDraft) === 'boolean' ? `is_draft=${isDraft ? 1 : 0}` : '',
      typeof(isEnable) === 'boolean' ? `is_enable=${isEnable ? 1 : 0}` : '',
    ]
    createSql += setArr.filter(i => !!i).join(',') + ` WHERE id='${id}'`
    sqlUtils.execute(createSql).then(result => {
      resBody.isSuccess = result.affectedRows > 0
      utils.response(res, resBody)
    })
  }
}
function getTagList () {
  return new Promise(function (resolve, reject) {
    if (Cache.tag) {
      resolve(Cache.tag)
    } else {
      const sql = `SELECT id, title, refer_count FROM ${utils.tableName.op_tag} WHERE is_enable > 0`
      sqlUtils.execute(sql).then(list => {
        Cache.tag = list
        resolve(list)
      })
    }
  })
}
function changeTagReferCount (tagIdList, dis) {
  const idStr = tagIdList.map(id => `'${id}'`).join(',')
  const sql = `UPDATE ${utils.tableName.op_tag} SET refer_count = refer_count ${dis > 0 ? '+' : '-'} ${Math.abs(dis)} WHERE id IN (${idStr}) AND is_enable > 0`
  sqlUtils.execute(sql).then(() => {
    Cache.tag = null
  })
}
function parseArticleList (list) {
  return new Promise(async function (resolve, reject) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      item.tags = await parseTagId2Name(item.tags)
    }
    resolve(true)
  })
}
function parseTagId2Name (tagIdListStr) {
  return new Promise(async function (resolve, reject) {
    if (tagIdListStr && typeof tagIdListStr === 'string') {
      var tagIdList = tagIdListStr.split(',')
      var tagList = await getTagList()
      var titleList = tagIdList.map(id => {
        var tag = tagList.find(t => t.id === id)
        if (!tag) {
          utils.logger.warn(`Tag id ${id} can not match.`)
        }
        return tag || {id}
      })
      resolve(titleList)
    } else {
      resolve([])
    }
  })
}
function responseSqlResult (sql, res) {
  sqlUtils.execute(sql).then(result => {
    utils.response(res, result)
  })
}
function  sqlHasRecords (sql) {
  return new Promise((resolve, reject) => {
    sqlUtils.execute(sql).then(result => {
      resolve(result.length > 0)
    })
  })
}
function getTotalFromTable (tableName, key, conditionArr) {
  return new Promise(async function (resolve, reject) {
    var sql = `SELECT COUNT(${key}) FROM ${tableName}`
    if (conditionArr && conditionArr.length > 0) {
      sql += ` WHERE ${conditionArr.join(' AND ')}`
    }
    resolve(await sqlUtils.getCount(sql))
  })
}
function logLoginRecord (userid, ip) {
  const sql = `INSERT INTO ${utils.tableName.op_user_login} (user_id,login_datetime,ip) VALUES ('${userid}', now(), '${ip}')`
  sqlUtils.execute(sql)
}