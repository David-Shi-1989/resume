const utils = require('../../utils')
const sqlUtil = require('../../sql/index')
const proxy = require('../proxy')
const api = require('../method')
const configCenter = require('../../config')

module.exports = function (router) {
  router.get('/dt/category/question', async function (req, res) {
    const {categoryId} = req.query
    const userId = utils.getUserIdFromReq(req)
    let count = 5
    let score = 10
    const condition = [
      'is_enable > 0'
    ]
    let limit = -1
    if (categoryId) {
      condition.push(`category = '${categoryId}'`)
      count = await configCenter.getConfigItemValue('category_count_game')
      score = await configCenter.getConfigItemValue('category_per_score')
      limit = parseInt(await configCenter.getConfigItemValue('category_freq_limit'))
    } else {
      count = await configCenter.getConfigItemValue('daily_count_game')
      score = await configCenter.getConfigItemValue('daily_per_score')
      limit = parseInt(await configCenter.getConfigItemValue('daily_freq_limit'))
    }
    if (limit > 0) {
      // 检查用户参与次数限制
      const type = categoryId ? utils.WebSocketConnectEnum.Single_Category : utils.WebSocketConnectEnum.Single_Daily
      let hasJoinCountToday = await api.getUserJoinTimes(userId, type)
      if (hasJoinCountToday >= limit) {
        utils.response(res, {isSuccess: false, message: `每天只能参加${limit}次,请明天再来。`})
        return false
      }
    }
    const sql = `SELECT * from ${utils.tableName.question} WHERE (${condition.join(' AND ')}) order by rand(unix_timestamp()) LIMIT ${count}`
    sqlUtil.execute(sql).then(result => {
      utils.response(res, {isSuccess: true, list: result.map(row => {
        row.score = parseInt(score)
        return row
      })})
    })
  })
  router.get('/dt/user/:code', function (req, res) {
    const code = req.params.code
    proxy.get('/xapi/user/user', {uid: code}).then(async result => {
      if (result.data && result.data.user_name) {
        const user = {
          name: result.data.user_name,
          id: result.data.uid,
          userId: result.data.uid,
          fid: result.data.user_fid,
          avatar: result.data.user_thumb,
          apartment: result.data.department
        }
        utils.logger.login(user.name + `[${user.apartment}]`)
        // user info save in session
        req.session.user = user
        const config = await configCenter.getAllConfig()
        utils.response(res, {isSuccess: true, data: {user, config}})
      } else {
        utils.logger.login(`Error 获取用户信息失败,code=${code}`)
        utils.response(res, {msg: '获取用户信息失败', isSuccess: false})
      }
    }).catch(err => {
      utils.response(res, {msg: '获取用户信息失败', isSuccess: false})
    })
  })
  // 保存单人比赛的结果
  router.post('/dt/match/record', function (req, res) {
    const {userId, type, categoryId, questionIdList, resultList, score, begin, end} = req.body
    api.saveRecore(
      type,
      [utils.getUserInfoFromReq(req)],
      [score],
      questionIdList,
      begin,
      end,
      resultList,
      categoryId || null
    ).then(isSuccess => {
      utils.response(res, {data: isSuccess})
    })
  })
  router.get('/dt/match/record/:userId', function (req, res) {
    const {userId} = req.params
    const sql = `SELECT * from ${utils.tableName.matchRecord} WHERE is_enable > 0 AND (user1 = '${userId}' OR user2 = '${userId}' OR user3 = '${userId}' OR user4 = '${userId}') ORDER BY endTime DESC`
    sqlUtil.execute(sql).then(result => {
      utils.response(res, {data: result})
    })
  })
  // 
  router.get('/dt/match/rank', function (req, res) {
    const sql = `SELECT * FROM ${utils.tableName.user} WHERE is_enable > 0 ORDER BY score DESC LIMIT 0, 50`
    sqlUtil.execute(sql).then(result => {
      utils.response(res, {data: result})
    })
  })
}