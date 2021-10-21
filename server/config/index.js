const sqlUtils = require('../sql/index')
const utils = require('../utils')

Cache = {
  // category_time: null,
  // category_count_game: null,
  // category_per_score: null,
  // category_freq_limit: null,
  // daily_time: null,
  // daily_count_game: null,
  // daily_per_score: null,
  // daily_freq_limit: null,
  // multiple_time: null,
  // multiple_finish_score: null,
  // multiple_per_score: null,
  // multiple_freq_limit: null
}
const categoryNameList = ['category_count_game', 'category_time', 'category_per_score', 'category_freq_limit']
const dailyNameList = ['daily_count_game', 'daily_time', 'daily_per_score', 'daily_freq_limit']
const multipleNameList = ['multiple_time', 'multiple_per_score', 'multiple_finish_score', 'multiple_freq_limit']

module.exports = {
  getConfig (nameList) {
    if (nameList.every(name => !!Cache[name])) {
      // read from Cache
      return Promise.resolve(nameList.map(name => Cache[name]))
    } else {
      return new Promise((resolve) => {
        const sql = `SELECT * FROM ${utils.tableName.config} WHERE name IN (${nameList.map(i => `'${i}'`).join(',')}) AND is_enable > 0`
        sqlUtils.execute(sql).then(result => {
          result.forEach(row => {
            row.value = parseInt(row.value)
          })
          this.updateCahce(result)
          resolve(result)
        })
      })
    }
  },
  updateConfig (obj) {
    return new Promise((resolve) => {
      const sqlArr = []
      const updateTime = utils.formatDate(Date.now())
      for (let key in obj) {
        let value = obj[key]
        let sql = `WHEN name = '${key}' AND is_enable > 0 AND value != '${value}' THEN ${value}\n`
        sqlArr.push(sql)
      }
      const sql = `UPDATE ${utils.tableName.config} SET update_time = '${updateTime}', value = CASE \n${sqlArr.join('')} ELSE value END;`
      sqlUtils.execute(sql).then(result => {
        this.resetCache()
        resolve({isSuccess: result.affectedRows >= 0})
      })
    })
  },
  resetCache () {
    for (let key in Cache) {
      Cache[key] = null
    }
  },
  updateCahce (list) {
    list.forEach(row => {
      Cache[row.name] = row
    })
  },
  getAllConfig () {
    return new Promise(async resolve => {
      const result = await this.getConfig([...categoryNameList, ...dailyNameList, ...multipleNameList])
      resolve(utils.lodash.arr2obj(result, 'name', 'value'))
    })
  },
  getConfigItemValue (name) {
    if (Cache[name]) {
      return Promise.resolve(utils.lodash.get(Cache, [name, 'value'], ''))
    } else {
      return new Promise(resolve => {
        this.getConfig([name]).then(result => {
          if (result.length >= 1) {
            resolve(result[0].value)
          } else {
            resolve(null)
          }
        })
      })
    }
  },
  getSingleCategoryConfig () {
    return new Promise(async resolve => {
      const result = await this.getConfig(categoryNameList)
      resolve(utils.lodash.arr2obj(result, 'name', 'value'))
    })
  },
  getSingleDailyConfig () {
    return new Promise(async resolve => {
      const result = await this.getConfig(dailyNameList)
      resolve(utils.lodash.arr2obj(result, 'name', 'value'))
    })
  },
  getMultipleConfig () {
    return new Promise(async resolve => {
      const result = await this.getConfig(multipleNameList)
      resolve(utils.lodash.arr2obj(result, 'name', 'value'))
    })
  }
}
