const utils = require('../utils')
class Question {
  id = ''
  type = utils.QuestionType.Single
  category = ''
  categoryName = ''
  topic = ''
  options = []
  answer = []
  score = 0
  create_time = null
  create_by = null
  create_method = utils.QuestionCreateMethod.PageCreate
  description = ''
  userAnswer = []
  is_enable = 1
  hasSend = false
  constructor ({id, type, category, topic, options, answer, score, create_time, create_by, create_method, description, categoryName}) {
    if (id) {
      this.id = id
    }
    if (type) {
      this.type = type
    }
    if (category) {
      this.category = category
    }
    if (topic) {
      this.topic = topic
    }
    if (options) {
      if (Array.prototype.isPrototypeOf(options)) {
        this.options = options
      } else if (typeof options === 'string') {
        this.options = JSON.parse(options)
      }
    }
    if (answer) {
      if (Array.prototype.isPrototypeOf(answer)) {
        this.answer = answer
      } else if (typeof answer === 'string') {
        answer = answer.replace(/[^a-zA-Z01正确错误]/g, '')
        if (/^[a-z]+$/.test(answer.toLowerCase())) {
          this.answer = answer.split('')
        } else if (this.type === utils.QuestionType.Judgement) {
          this.answer = (['正确', '1', 'true'].includes(answer))
        } else {
          utils.logger.warn('位置答案格式', answer)
        }
      } else if (typeof answer === 'boolean') {
        this.answer = answer ? '1' : '0'
      }
    }
    if (score) {
      this.score = parseInt(score)
    }
    if (create_time) {
      this.create_time = create_time
    }
    if (create_by) {
      this.create_by = create_by
    }
    if (create_method) {
      this.create_method = create_method
    }
    if (description) {
      this.description = description
    }
    if (categoryName) {
      this.categoryName = categoryName
    }
  }
  get comment () {
    return this.description
  }
  get questionType () {
    return this.type
  }
  get isJudgement () {
    return this.type === utils.QuestionType.Judgement
  }
  get isSingle () {
    return this.type === utils.QuestionType.Single
  }
  get isMultiple () {
    return this.type === utils.QuestionType.Multiple
  }
  getUserScoreById (userId) {
    let answer = this.userAnswer.find(a => a.userId === userId)
    if (answer) {
      return answer.score || 0
    }
    return 0
  }
  addUserAnswer (userId, answer, ts, isOffline = false) {
    let ua = this.userAnswer.find(a => a.userId === userId && !a.answer)
    if (ua) {
      if (ua.answer) {
        utils.logger.warn(`用户[${userId}]已作答,无法修改. questionId:`, this.id)
        return false
      }
      if (isOffline && !ua.answer) {
        utils.logger.info(`用户[${userId}]恢复,支持修改答案.`)
      }
    }
    let newUserAnswer = {userId, answer, ts}
    this.userAnswer.push(newUserAnswer)
    // console.log(`用户${userId}完成作答:${this.topic.slice(0,10)},answer=${answer},ts=${ts}`)
    this.calUserResult(userId)
    return true
  }
  isJudegementIsTrue (answer) {
    return answer == true || answer > 0 || parseInt(answer) > 0
  }
  calUserResult (userId) {
    let result = utils.QuestionResult.WaitAnswer, score = 0
    let ua = this.userAnswer.find(a => a.userId == userId)
    if (ua) {
      const answer = ua.answer
      if (answer !== undefined && answer !== null && !(typeof answer === 'string' && answer.trim().length === 0)) {
        if (this.isMultiple) {
          let answerArr = answer.toLowerCase().split('').sort()
          let rightAnswerArr = utils.isArray(this.answer) ? this.answer.map(i => i.toLowerCase()) : this.answer.toString().toLowerCase().split('').sort()
          if (answerArr.some(a => !rightAnswerArr.includes(a))) {
            result = utils.QuestionResult.Wrong
          } else if (answerArr.length === rightAnswerArr.length) {
            result = utils.QuestionResult.AllRight
            score = this.score
          } else {
            // result = utils.QuestionResult.Wrong
            result = utils.QuestionResult.HalfRight
            // score = this.score / 2
          }
        } else if (this.isSingle) {
          if (answer.toLowerCase() === this.answer.join('').toLowerCase()) {
            result = utils.QuestionResult.AllRight
            score = this.score
          } else {
            result = utils.QuestionResult.Wrong
          }
        } else if (this.isJudgement) {
          const isRight = (this.isJudegementIsTrue(this.answer) === this.isJudegementIsTrue(answer))
          result = isRight ? utils.QuestionResult.AllRight : utils.QuestionResult.Wrong
          score += isRight ? this.score : 0
        }
      } else {
        result = utils.QuestionResult.Empty
      }
      ua.result = result
      ua.score = score
    }
  }
}

module.exports = Question