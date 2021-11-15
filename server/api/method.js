const sqlUtils = require('../sql/index')
const utils = require('../utils')

module.exports = {
  getRandomQuestion ({type, category, count, excludeIdList = []}) {
    return new Promise((resolve, reject) => {
      const whereArr = ['Q.is_enable > 0']
      if (type && utils.isArray(type)) {
        whereArr.push(`Q.type IN (${type.map(i => `'${i}'`).join(',')})`)
      }
      if (excludeIdList && excludeIdList.length > 0) {
        whereArr.push(`Q.id NOT IN (${excludeIdList.map(i => `'${i}'`).join(',')})`)
      }
      if (category) {
        if (typeof category === 'string') {
          whereArr.push(`Q.category = ${category}`)
        } else if (utils.isArray(category)) {
          whereArr.push(`Q.category IN (${category.map(i => `'${i}'`).join(',')})`)
        }
      }
      const sql = `SELECT * FROM (select Q.id,Q.type,Q.topic,Q.answer,Q.options,Q.description,C.id AS cid,C.name AS cname from  ${utils.tableName.question} AS Q LEFT JOIN ${utils.tableName.category} AS C ON (C.id = Q.category AND C.is_enable > 0)  where ${whereArr.join(' AND ')}) a order by rand(unix_timestamp()) LIMIT ${count || 5}`
      sqlUtils.execute(sql).then(result => {
        resolve(result)
      })
    })
  },
  async saveRecore (type, userList, scoreList, questionList, beginTs, endTs, resultList = [], category = null) {
    console.assert(userList.length == scoreList.length)
    utils.logger.info(`记录比赛结果:`, `类型:${type}`, `结束时间:${endTs}`)
    // 记录本局比赛结果
    const curMatchRecordId = utils.uuid()
    const newRecord = {
      id: curMatchRecordId,
      type,
      scoreList: scoreList.join(','),
      questionList: questionList.join(','),
      beginTime: utils.formatDate(beginTs),
      endTime: utils.formatDate(endTs)
    }
    userList.forEach((u, i) => {
      newRecord['user' + (i + 1)] = u.userId
    })
    if (category) {
      newRecord.category = category
    }
    if (resultList && resultList.length > 0) {
      newRecord.resultList = JSON.stringify(resultList)
    }
    const splitNewRecord = utils.keysValues(newRecord)
    const matchSql = utils.sql.insert(
      utils.tableName.matchRecord,
      splitNewRecord.keys,
      splitNewRecord.values.map(i => `'${i}'`),
    )
    // 记录score list方便统计分值
    const scoreRecordBase = {
      matchRecordId: curMatchRecordId,
      type,
      datetime: newRecord.endTime
    }
    const valueSqlArr = []
    userList.forEach((user, idx) => {
      const score = scoreList[idx]
      const result = utils.getGameResult(type, scoreList, score)
      valueSqlArr.push(Object.assign({}, scoreRecordBase, {
        id: utils.uuid(),
        userId: user.userId,
        department: user.apartment,
        score,
        result,
      }))
    })
    const scoreRecordSql = `INSERT INTO ${utils.tableName.scoreRecord} (userId,type,department,score,result,matchRecordId,datetime) VALUES ` + valueSqlArr.map(r => {
      return `('${r.userId}','${r.type}','${r.department}',${r.score},'${r.result}','${r.matchRecordId}','${r.datetime}')`
    }).join(',') + ';'
    // user list update
    for (let i = 0; i < userList.length; i++) {
      const curUserScore = scoreList[i]
      await this.addAUserScore(userList[i], type, curUserScore)
    }
    
    return new Promise((resolve, reject) => {
      return Promise.all([sqlUtils.execute(matchSql), sqlUtils.execute(scoreRecordSql)]).then(results => {
        resolve(results[0].affectedRows === 1 && results[1].affectedRows === userList.length)
      })
    })
  },
  async addAUserScore (userObj, type, score) {
    const countField = parseType2UserField(type)
    const isUserExisted = (await sqlUtils.execute(`SELECT id FROM ${utils.tableName.user} WHERE userId = '${userObj.userId}' AND id > 0`)).length > 0
    if (isUserExisted) {
      await sqlUtils.execute(`UPDATE ${utils.tableName.user} SET ${(userObj.userName || userObj.name) ? `name='${(userObj.userName || userObj.name)}',` : ''}${userObj.apartment ? `department='${userObj.apartment}',` : ''}${userObj.avatar ? `avatar='${userObj.avatar}',` : ''} score = score + ${score}, ${countField} = ${countField} + 1 WHERE userId='${userObj.userId}' AND id > 0`)
    } else {
      if (!userObj.userName) {
        utils.logger.warn(`用户姓名name非法：`, JSON.stringify(userObj))
      }
      await sqlUtils.execute(`INSERT INTO ${utils.tableName.user} (userId,name,department,avatar,score,${countField}) VALUES ('${userObj.userId}','${userObj.name || userObj.userName}','${userObj.apartment}','${userObj.avatar}',${score},1)`)
    }
  },
  getUserJoinTimes (userId, type) {
    return new Promise(async resolve => {
      const typeArr = typeof type === 'string' ? [type] : type
      const sql = `SELECT COUNT(*) FROM ${utils.tableName.matchRecord} WHERE is_enable > 0 AND (user1 = '${userId}' OR user2 = '${userId}' OR user3 = '${userId}' OR user3 = '${userId}' ) AND type in (${typeArr.map(i => `'${i}'`).join(',')}) AND datediff(CURDATE(),beginTime)=0`
      let hasJoinCountToday = await sqlUtils.execute(sql)
      resolve(utils.lodash.get(utils.lodash.values(hasJoinCountToday[0]), 0, 0))
    })
  }
}
function parseType2UserField (type) {
  if (type == utils.WebSocketConnectEnum.Single_Category || type == utils.WebSocketConnectEnum.Single_Daily) {
    return type
  } else if (type.toLowerCase().indexOf('match2') > -1) {
    return 'match2Count'
  } else {
    return 'match4Count'
  }
}