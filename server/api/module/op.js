const sqlUtils = require('../../sql/index')
const config = require('../../config')
const http = require('http')
const { tableName, response, getIpFromReq, getUserIdFromReq, uuid, logger, parseUserInput, httpGet, formatDate } = require('../../utils')
const XSS = require('xss')

const Cache = {
  tag: null
}

module.exports = function (router) {
  router.get('/op/user', function (req, res, next) {
    sqlUtils.execute(`SELECT * from op_user WHERE is_enable > 0`).then(result => {
      response(res, result)
    })
  })
  router.post('/op/login', function (req, res) {
    const {username, password} = req.body
    const sql = `SELECT * from ${tableName.op_user} WHERE username = '${username}' AND password = '${password}' AND is_enable > 0`
    sqlUtils.execute(sql).then(result => {
      if (result.length === 1) {
        const userId = result[0].id
        req.session.user.username = username
        req.session.user.loginTime = Date.now()
        req.session.user.userId = userId
        logger.login(username)
        logLoginRecord(userId, getIpFromReq(req))
        response(res, {isSuccess: true, login: true, userId})
      } else {
        req.session.user.loginFailTimes = req.session.user.loginFailTimes ? req.session.user.loginFailTimes + 1 : 1
        response(res, {isSuccess: true, login: false})
      }
    })
  })
  router.post('/op/logout', function (req, res) {
    const {userId} = req.body
    if (userId == getUserIdFromReq(req)) {
      delete req.session.user
      response(res, {isSuccess: true})
    } else {
      response(res, {isSuccess: true})
    }
  })
  router.post('/op/visit', function (req, res) {
    const {userId} = req.body
    const ip = getIpFromReq(req)
    const sql = `INSERT INTO ${tableName.visit}
    (userId,create_datetime,ip)
    VALUES
    ('${userId}',NOW(),'${ip}')`
    sqlUtils.execute(sql).then(result => {
      const isSuccess = result.affectedRows > 0
      if (isSuccess) {
        patchIpRegion(ip)
      }
      response(res, {isSuccess})
    })
  })
  // Tag
  router.get('/op/tag', async function (req, res) {
    getTagList().then(list => {
      response(res, list)
    })
  })
  router.get('/op/tag/:id', async function (req, res) {
    const {id} = req.params
    const tagItem = await getTagItem(id)
    if (tagItem) {
      tagItem.list = await getArticleListByTag([id])
    }
    response(res, tagItem)
  })
  router.post('/op/tag', async function (req, res) {
    const {id, name} = req.body
    if (id) {
      editTag(res, {id, name})
    } else {
      createTag(res, req, {name})
    }
  })
  router.delete('/op/tag/:id', function (req, res) {
    const {id} = req.params
    deleteTag(id).then(isSuccess => {
      response(res, {isSuccess})
    })
  })
  router.post('/op/tag/async', async function (req, res) {
    asyncTag().then(() => {
      response(res, {isSuccess: true})
    })
  })
  // Article
  router.get('/op/article', async function (req, res) {
    const {page, size, type, tagIdList, search} = req.query
    var sql = `SELECT id,title,tags,summary,create_datetime,visit_count,like_count,is_top,is_draft FROM ${tableName.article}`
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
    if (tagIdList) {
      let idArr = []
      tagIdList.forEach(tagId => {
        idArr.push(`tags LIKE '%${tagId}%'`)
      })
      conditionArr.push(`(${idArr.join(' OR ')})`)
    }
    if (search) {
      conditionArr.push(`(md LIKE '%${search}%' OR title LIKE '%${search}%')`)
    }
    sql += ` WHERE ${conditionArr.join(' AND ')}`
    sql += ` order by is_top DESC, create_datetime DESC`
    if (page && size) {
      const total = await getTotalFromTable(tableName.article, 'id', conditionArr)
      sql += ` LIMIT ${(page - 1) * size},${size}`
      sqlUtils.execute(sql).then(async list => {
        await parseArticleList(list)
        response(res, {total, list, page, size})
      })
    } else {
      sqlUtils.execute(sql).then(async list => {
        await parseArticleList(list)
        response(res, list)
      })
    }
  })
  router.get('/op/article/:id', function (req, res) {
    const {id} = req.params
    const sql = `SELECT * FROM ${tableName.article} WHERE id='${id}' AND is_enable > 0`
    sqlUtils.execute(sql).then(async list => {
      await parseArticleList(list)
      list[0].visit_count++
      articleVisitCountAdd(id)
      response(res, list)
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
      const sql = isPermenent ? `DELETE FROM ${tableName.article} WHERE id IN (${idStr})` :
        `UPDATE ${tableName.article} SET is_enable = 0 WHERE id IN (${idStr})`
      sqlUtils.execute(sql).then(result => {
        const isSuccess = result.affectedRows === idList.length, affectedRows = result.affectedRows
        if (isSuccess && !isPermenent) {
          changeTagReferCount(idList, -1)
        } else if (!isSuccess) {
          logger.warn('删除文章失败', idList, affectedRows)
        }
        response(res, {isSuccess, affectedRows})
      })
    }
  })
  router.post('/op/article/like', async function (req, res) {
    const {articleId, userId} = req.body
    articleLikeCountAdd(req, articleId, userId).then(isSuccess => {
      response(res, {isSuccess})
    })
  })
  // Web User
  router.post('/op/webuser', async function (req, res) {
    const {name, avatar, email} = req.body
    const nameIsConflict = await sqlHasRecords(`SELECT id FROM ${tableName.web_user} WHERE name = '${name}'`)
    if (!nameIsConflict) {
      const id = uuid()
      const sql = `INSERT INTO ${tableName.web_user} (id,name,avatar,email,ip,create_datetime) VALUES 
      ('${id}','${name}','${avatar}','${email || ''}','${getIpFromReq(req)}',NOW())`
      sqlUtils.execute(sql).then(result => {
        const resResult = {isSuccess: result.affectedRows === 1}
        if (resResult.isSuccess) {
          resResult.user = {id, name, avatar, email}
        }
        response(res, resResult)
      })
    } else {
      response(res, {isSuccess: false, errorMsg: '不好意思，昵称已经被占用了'})
    }
  })
  // get comment
  router.get('/op/comment', function (req, res) {
    const {resourceId} = req.query
    const sql = `SELECT Com.id,Com.content,Com.parent_comment_id,Com.create_datetime,Com.userId,User.name,User.avatar,User.email FROM ${tableName.web_comment} AS Com
    LEFT JOIN ${tableName.web_user} AS User ON Com.userId = User.id
    WHERE Com.is_enable > 0 AND Com.resource_id = '${resourceId}' ORDER BY Com.create_datetime DESC`
    sqlUtils.execute(sql).then(result => {
      response(res, result || [])
    })
  })
  // add comment
  router.post('/op/comment', async function (req, res) {
    const {userId, content, resourceId, parentCommentId} = req.body
    const id = uuid()
    let sql = `INSERT INTO ${tableName.web_comment}
    (id,content,userId,resource_id,parent_comment_id,ip,create_datetime) VALUES
    ('${id}','${parseUserInput(content)}','${userId}','${resourceId||''}','${parentCommentId||''}','${getIpFromReq(req)}',NOW())`
    sqlUtils.execute(sql).then(result => {
      response(res, {isSuccess: result.affectedRows === 1})
    })
  })
  // works
  router.get('/op/work', function (req, res) {
    const sql = `SELECT * FROM ${tableName.work} WHERE is_enable > 0 ORDER BY create_date DESC`
    sqlUtils.execute(sql).then(result => {
      response(res, result)
    })
  })
  router.get('/op/work/:id', function (req, res) {
    const {id} = req.params
    const sql = `SELECT * FROM ${tableName.work} WHERE is_enable > 0 AND id = '${id}'`
    sqlUtils.execute(sql).then(result => {
      response(res, result[0])
    })
  })
  router.delete('/op/work', function (req, res) {
    var {idList, isPermenent} = req.query
    isPermenent = (isPermenent === 'true')
    if (idList && idList.length > 0) {
      const idStr = idList.map(id => `'${id}'`).join(',')
      const sql = isPermenent ? `DELETE FROM ${tableName.work} WHERE id IN (${idStr})` :
        `UPDATE ${tableName.work} SET is_enable = 0 WHERE id IN (${idStr})`
      sqlUtils.execute(sql).then(result => {
        const isSuccess = result.affectedRows === idList.length, affectedRows = result.affectedRows
        if (isSuccess && !isPermenent) {
          // success
        } else if (!isSuccess) {
          logger.warn('删除作品失败', idList, affectedRows)
        }
        response(res, {isSuccess, affectedRows})
      })
    }
  })
  // dashboard
  router.get('/op/dashboard', function (req, res) {
    const sql = `SELECT a.article_num,t.tag_num,w.work_num,c.comment_num,u.user_num FROM
    (SELECT COUNT(id) article_num FROM ${tableName.article} WHERE is_enable > 0) AS a,
    (SELECT COUNT(id) tag_num FROM ${tableName.op_tag} WHERE is_enable > 0) AS t,
    (SELECT COUNT(id) work_num FROM ${tableName.work} WHERE is_enable > 0) AS w,
    (SELECT COUNT(id) comment_num FROM ${tableName.web_comment} WHERE is_enable > 0) AS c,
    (SELECT COUNT(id) user_num FROM ${tableName.web_user} WHERE is_enable > 0) AS u`
    sqlUtils.execute(sql).then(result => {
      response(res, result[0])
    })
  })
  router.get('/op/dash/article/rank', function (req, res) {
    const {orderBy} = req.query
    const count = 5
    let sql = ''
    if (orderBy === 'comment_count') {
      sql = `SELECT art.id,art.title,COUNT(com.resource_id) AS value FROM ${tableName.web_comment} AS com
      LEFT JOIN ${tableName.article} as art ON art.id = com.resource_id
      WHERE art.is_enable > 0 AND com.is_enable > 0 AND com.type=0
      GROUP BY com.resource_id
      ORDER BY value DESC LIMIT 0,${count}`
    } else {
      sql = `SELECT title,${orderBy} AS value FROM ${tableName.article} WHERE is_enable > 0  AND ${orderBy} > 0 ORDER BY ${orderBy} DESC LIMIT 0,${count}`
    }
    sqlUtils.execute(sql).then(result => {
      response(res, result)
    })
  })
  router.get('/op/dash/message', function (req, res) {
    const count = 10
    const sql = `SELECT com.id,com.content,com.create_datetime,com.ip,user.name,user.avatar FROM ${tableName.web_comment} AS com
    LEFT JOIN ${tableName.web_user} AS user ON com.userId = user.id
    WHERE com.is_enable > 0
    ORDER BY create_datetime DESC
    LIMIT 0,${count}`
    sqlUtils.execute(sql).then(result => {
      response(res, result)
    })
  })
  router.get('/op/dash/visitor', function (req, res) {
    var count = parseInt(req.query.days)
    let now = new Date()
    let arr = [], sql = ''
    if ([7, 30].includes(count)) {
      for (let i = 0; i < count; i++) {
        arr.push('d' + formatDate(now, 'MMpdd'))
        now.setDate(now.getDate() - 1)
      }
      let dayDis = 0
      sql = `SELECT ${arr.join(',')} FROM
      ${arr.map(name => {
        return `(SELECT COUNT(id) AS ${name} FROM ${tableName.visit} WHERE datediff(CURDATE(), create_datetime) = ${dayDis++}) AS t${dayDis},`
      }).join('\n')}`
      sql = sql.replace(/\n*,+$/, '')
    } else {
      // recent 12 month
      let begin = new Date(formatDate(now, 'yyyy/MM/01 00:00:00'))
      let end = new Date(begin.valueOf())
      end.setMonth(end.getMonth() + 1)
      for (let i = 0; i < count; i++) {
        arr.push({
          begin: formatDate(begin),
          end: formatDate(end),
          monthName: 'm' + (begin.getMonth() + 1)
        })
        begin.setMonth(begin.getMonth() - 1)
        end.setMonth(end.getMonth() - 1)
      }
      sql = `SELECT ${arr.map(i => i.monthName).join(',')} FROM
      ${
        arr.map((item, idx) => {
          return `(SELECT COUNT(id) AS ${item.monthName} FROM ${tableName.visit} WHERE create_datetime > '${item.begin}' AND create_datetime < '${item.end}') AS m${idx},`
        }).join('\n')}`
      sql = sql.replace(/\n*,+$/, '')
    }
    
    sqlUtils.execute(sql).then(result => {
      let obj = result[0], visitArr = []
      for (let key in obj) {
        let date = key.replace(/^d/, '').replace(/^(\d+)p(\d+)$/, '$1/$2').replace(/^m/, '')
        let value = obj[key]
        visitArr.push({date, value})
      }
      response(res, visitArr.sort((item1,item2) => {
        if (/^\d+$/.test(item1.date) && /^\d+$/.test(item2.date)) {
          return parseInt(item1.date) < parseInt(item2.date) ? -1 : 1
        } else {
          return item1.date < item2.date ? -1 : 1
        }
      }))
    })
  })
}
// 新建文章
async function createArticle (res, req, {title, tagList, isTop, isDraft, html, md, summary}) {
  const resBody = {isSuccess: false}
  // check title valid
  const titleCheckSql = `SELECT * FROM ${tableName.article} WHERE title = '${title}' AND is_enable > 0`
  if (await sqlHasRecords(titleCheckSql)) {
    resBody.errorMsg = '文章标题重复'
    response(res, resBody)
  } else {
    const newId = uuid()
    const createSql = `INSERT INTO ${tableName.article} 
    (id,title,tags,md,summary,create_by,create_datetime,is_top,is_draft) VALUES 
    ('${newId}','${XSS(title)}','${tagList.join(',')}','${parseUserInput(md)}','${XSS(summary||'')}','${getUserIdFromReq(req)}',NOW(),${isTop ? 1 : 0},${isDraft ? 1 : 0})`
    sqlUtils.execute(createSql).then(result => {
      resBody.isSuccess = result.affectedRows > 0
      if (resBody.isSuccess) {
        changeTagReferCount(tagList, 1)
      }
      response(res, resBody)
    })
  }
}
// 编辑文章
async function editArticle (res, {id, title, tagList, isTop, isDraft, html, md, summary, isEnable}) {
  const resBody = {isSuccess: false}
  // check title valid
  const titleCheckSql = `SELECT * FROM ${tableName.article} WHERE title = '${title}' AND is_enable > 0 AND id NOT IN ('${id}')`
  if (await sqlHasRecords(titleCheckSql)) {
    resBody.errorMsg = '文章标题重复'
    response(res, resBody)
  } else {
    var createSql = `UPDATE ${tableName.article} SET `
    const setArr = [
      title ? `title='${XSS(title)}'` : '',
      tagList ? `tags='${tagList.join(',')}'` : '',
      md ? `md='${parseUserInput(md)}'` : '',
      summary ? `summary='${XSS(summary||'')}'` : '',
      'modify_datetime=NOW()',
      typeof(isTop) === 'boolean' ? `is_top=${isTop ? 1 : 0}` : '',
      typeof(isDraft) === 'boolean' ? `is_draft=${isDraft ? 1 : 0}` : '',
      typeof(isEnable) === 'boolean' ? `is_enable=${isEnable ? 1 : 0}` : '',
    ]
    createSql += setArr.filter(i => !!i).join(',') + ` WHERE id='${id}'`
    sqlUtils.execute(createSql).then(async result => {
      resBody.isSuccess = result.affectedRows > 0
      if (resBody.isSuccess) {
        await asyncTag()
      }
      response(res, resBody)
    })
  }
}
// 新建tag
async function createTag (res, req, {name}) {
  const resBody = {isSuccess: false}
  // check name is valid
  const nameCheckSql = `SELECT * FROM ${tableName.op_tag} WHERE title='${name}' AND is_enable > 0`
  if (await sqlHasRecords(nameCheckSql)) {
    resBody.errorMsg = '标签名称重复'
    response(res, resBody)
  } else {
    const newId = uuid()
    const sql = `INSERT INTO ${tableName.op_tag} (id,title,create_by,create_datetime) VALUES ('${newId}','${parseUserInput(name)}','${getUserIdFromReq(req)}',NOW())`
    sqlUtils.execute(sql).then(result => {
      resBody.isSuccess = result.affectedRows > 0
      if (resBody.isSuccess) {
        resBody.id = newId
        Cache.tag = null
      }
      response(res, resBody)
    })
  }
}
// 编辑tag
async function editTag (res, {id, name}) {
  const resBody = {isSuccess: false}
  // check name is valid
  const nameCheckSql = `SELECT * FROM ${tableName.op_tag} WHERE title='${name}' AND is_enable > 0 AND id NOT IN ('${id}')`
  if (await sqlHasRecords(nameCheckSql)) {
    resBody.errorMsg = '标签名称重复'
    response(res, resBody)
  } else {
    const sql = `UPDATE ${tableName.op_tag} SET title='${name}' WHERE id='${id}'`
    sqlUtils.execute(sql).then(result => {
      resBody.isSuccess = result.affectedRows > 0
      if (resBody.isSuccess) {
        Cache.tag.find(t => t.id === id).name = name
      }
      response(res, resBody)
    })
  }
}
// async tag ref count
async function asyncTag () {
  return new Promise(async (resolve) => {
    const tagList = await getTagList()
    if (tagList.length > 0) {
      const articleList = await sqlUtils.execute(`SELECT id,title,tags FROM ${tableName.article} WHERE is_enable > 0 AND is_draft = 0`)
      let sql = `UPDATE ${tableName.op_tag} SET refer_count = CASE id `
      tagList.forEach(tag => {
        tag.articleList = articleList.filter(a => (a.tags || '').includes(tag.id))
        tag.refer_count = tag.articleList.length
        sql += `
        WHEN '${tag.id}' then ${tag.refer_count}
        `
      })
      sql += `END`
      await sqlUtils.execute(sql)
      Cache.tag = tagList
    }
    resolve(true)
  })
}
// 删除tag
function deleteTag (deleteTagId) {
  return new Promise(async (resolve, reject) => {
    const tag = await getTagItem(deleteTagId)
    if (tag.refer_count > 0) {
      // 先取消article里的tag
      const articleList = await sqlUtils.execute(`SELECT id,tags FROM ${tableName.article} WHERE tags LIKE '%${deleteTagId}%'`)
      let sql = `UPDATE ${tableName.article} SET tags = CASE id`
      articleList.forEach(({id, tags}) => {
        let tagArr = tags.split(',').filter(t => t !== deleteTagId)
        sql += `
        WHEN '${id}' THEN '${tagArr.join(',')}'
        `
      })
      sql += 'END'
      const disassociateArtSuccess = ((await sqlUtils.execute(sql)).changedRows === articleList.length)
      if (!disassociateArtSuccess) {
        logger.error(`Disassociate article with tag `, deleteTagId, ' failed.')
      }
    }
    const deleteSql = `DELETE FROM ${tableName.op_tag} WHERE id = '${deleteTagId}'`
    sqlUtils.execute(deleteSql).then(result => {
      const isSuccess = (result.affectedRows === 1)
      if (isSuccess) {
        Cache.tag = Cache.tag.filter(t => t.id !== deleteTagId)
      }
      resolve(isSuccess)
    })
  })
}
// 获取Tag
function getTagList () {
  return new Promise(function (resolve, reject) {
    if (Cache.tag) {
      resolve(Cache.tag)
    } else {
      const sql = `SELECT id, title, refer_count, create_datetime FROM ${tableName.op_tag} WHERE is_enable > 0 ORDER BY create_datetime DESC`
      sqlUtils.execute(sql).then(list => {
        Cache.tag = list
        resolve(list)
      })
    }
  })
}
function getTagItem (id) {
  return new Promise(function (resolve, reject) {
    if (Cache.tag) {
      resolve(Cache.tag.find(t => t.id === id))
    } else {
      const sql = `SELECT id, title, refer_count FROM ${tableName.op_tag} WHERE is_enable > 0 AND id = '${id}'`
      sqlUtils.execute(sql).then(tags => {
        resolve(tags.length > 0 ? tags[0] : null)
      })
    }
  })
}
function getArticleListByTag (tagIdList) {
  return new Promise((resolve, reject) => {
    const idCondition = tagIdList.map(tagId => `tags LIKE '%${tagId}%'`).join(' OR ')
    let sql = `SELECT id,title,tags,summary,create_datetime,visit_count,like_count,is_top,is_draft FROM ${tableName.article}
    WHERE is_enable > 0 AND is_draft <= 0 AND (${idCondition})`
    sqlUtils.execute(sql).then(list => {
      resolve(list)
    })
  })
}
function changeTagReferCount (tagIdList, dis) {
  const idStr = tagIdList.map(id => `'${id}'`).join(',')
  const sql = `UPDATE ${tableName.op_tag} SET refer_count = refer_count ${dis > 0 ? '+' : '-'} ${Math.abs(dis)} WHERE id IN (${idStr}) AND is_enable > 0`
  sqlUtils.execute(sql).then(() => {
    Cache.tag = null
  })
}
function parseArticleList (list) {
  return new Promise(async function (resolve, reject) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i]
      item.tags = await parseTagId2Name(item.tags)
      item.comment_count = await getArticleCommentCount(item.id)
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
          logger.warn(`Tag id ${id} can not match.`)
        }
        return tag || {id}
      })
      resolve(titleList)
    } else {
      resolve([])
    }
  })
}
function getArticleCommentCount (id) {
  return new Promise(async (resolve, reject) => {
    const sql = `SELECT id FROM ${tableName.web_comment} WHERE resource_id = '${id}' AND is_enable > 0`
    resolve(await getCount(sql))
  })
}
function responseSqlResult (sql, res) {
  sqlUtils.execute(sql).then(result => {
    response(res, result)
  })
}
function sqlHasRecords (sql) {
  return new Promise((resolve, reject) => {
    sqlUtils.execute(sql).then(result => {
      resolve(result.length > 0)
    })
  })
}
function getCount (sql) {
  return new Promise((resolve, reject) => {
    sqlUtils.execute(sql).then(result => {
      resolve(result.length)
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
  const sql = `INSERT INTO ${tableName.op_user_login} (user_id,login_datetime,ip) VALUES ('${userid}', now(), '${ip}')`
  sqlUtils.execute(sql)
}

function articleVisitCountAdd (id) {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${tableName.article} SET visit_count = visit_count + 1 WHERE id = '${id}'`
    sqlUtils.execute(sql).then(result => {
      resolve(result.affectedRows === 1)
    })
  })
}
function articleLikeCountAdd (req, articleId, userId) {
  return new Promise((resolve, reject) => {
    const newId = uuid()
    const sql = `INSERT INTO ${tableName.like}
    (id,userId,resource_id,type,create_datetime,ip)
    VALUES
    ('${newId}','${userId || ''}','${articleId || ''}',0,NOW(),'${getIpFromReq(req)}')`
    sqlUtils.execute(sql).then(result => {
      const isSuccess = (result.affectedRows === 1)
      if (isSuccess) {
        let addCount = `UPDATE ${tableName.article} SET like_count = like_count + 1 WHERE id='${articleId}'`
        sqlUtils.execute(addCount)
      }
      resolve(isSuccess)
    })
  })
}
async function patchIpRegion (ip) {
  const existSql = `SELECT * FROM ${tableName.ipRegion} WHERE ip = '${ip}'`
  if (!(await sqlHasRecords(existSql))) {
    const region = await getIpRegion(ip)
    if (region.city || region.province) {
      const insertSql = `INSERT INTO ${tableName.ipRegion}
      (ip,city,province)
      VALUES
      ('${ip}','${region.city}','${region.province}')`
      sqlUtils.execute(insertSql)
    }
  }
}
function getIpRegion (ip) {
  return new Promise((resolve, reject) => {
    httpGet(`http://ip.ws.126.net/ipquery?ip=${ip}`, 'GBK').then(result => {
      const obj = {city: '', province: ''}
      if (result && /city:"([^"]+)"/.test(result)) {
        obj.city = result.match(/city:"([^"]+)"/)[1]
        obj.province = result.match(/province:"([^"]+)"/)[1]
      }
      resolve(obj)
    })
  })
}