const utils = require('../../utils')
const sqlUtils = require('../../sql/index')
const config = require('../../config')
const { sql } = require('../../utils')

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
    const {page, size} = req.query
    var sql = `SELECT id,title,tags,summary,create_datetime,visit_count,like_count,is_top,is_draft FROM ${utils.tableName.article} WHERE is_enable > 0 order by create_datetime DESC`
    if (page && size) {
      const total = await getTotalFromTable(utils.tableName.article, 'id')
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
    const {title, tagList, isTop, isDraft, content, summary} = req.body
    const resBody = {isSuccess: false}
    // check title valid
    const titleCheckSql = `SELECT * FROM ${utils.tableName.article} WHERE title = '${title}' AND is_enable > 0`
    if (await sqlHasRecords(titleCheckSql)) {
      resBody.errorMsg = '文章标题重复'
      utils.response(res, resBody)
    } else {
      const newId = utils.uuid()
      const createSql = `INSERT INTO ${utils.tableName.article} 
      (id,title,tags,content,summary,create_by,create_datetime,is_top,is_draft) VALUES 
      ('${newId}','${title}','${tagList.join(',')}','${content}','${summary||''}','${utils.getUserIdFromReq(req)}',NOW(),${isTop ? 1 : 0},${isDraft ? 1 : 0})`
      sqlUtils.execute(createSql).then(result => {
        resBody.isSuccess = result.affectedRows > 0
        utils.response(res, resBody)
      })
    }
  })
}
function getTagList () {
  return new Promise(function (resolve, reject) {
    if (Cache.tag) {
      resolve(Cache.tag)
    } else {
      const sql = `SELECT id, title FROM ${utils.tableName.op_tag} WHERE is_enable > 0`
      sqlUtils.execute(sql).then(list => {
        Cache.tag = list
        resolve(list)
      })
    }
  })
}
function parseArticleList (list) {
  return new Promise(async function (resolve, reject) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      if (item.tags) {
        item.tags = await parseTagId2Name(item.tags)
      }
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
function getTotalFromTable (tableName, key) {
  return new Promise(async function (resolve, reject) {
    const sql = `SELECT COUNT(${key}) FROM ${tableName} WHERE is_enable > 0`
    resolve(await sqlUtils.getCount(sql))
  })
}
function logLoginRecord (userid, ip) {
  const sql = `INSERT INTO ${utils.tableName.op_user_login} (user_id,login_datetime,ip) VALUES ('${userid}', now(), '${ip}')`
  sqlUtils.execute(sql)
}