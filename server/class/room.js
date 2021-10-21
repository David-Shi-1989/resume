const utils = require('../utils')
const configCenter = require('../config')
class Room {
  type = ''
  roomOpenTs = 0
  beginTs = 0
  endTs = 0
  code = ''
  userList = []
  SYS = -1
  questionList = []
  questionLength = 0
  winScore = 1
  status = utils.roomStatus.wait
  isInvite = false
  inviteCode = ''
  _isRoom = true
  constructor (type, roomOpenTs, userList, questionLength, isInvite = false) {
    this.type = type
    this.roomOpenTs = roomOpenTs
    this.code = utils.md5Encode(roomOpenTs)
    this.userList = userList
    this.questionLength = questionLength
    this.isInvite = isInvite
  }
  addUser (userObj) {
    const inConflict = this.isUserInRoom(userObj.userId)
    console.assert(!inConflict, `用户${userObj.userName}已存在`)
    if (!inConflict) {
      this.userList.push(userObj)
    }
  }
  getUserNameById (id) {
    let user = this.userList.find(u => u.userId === id)
    return user ? user.userName : null
  }
  getUserInfoById (id) {
    return this.userList.find(u => u.userId === id)
  }
  isUserInRoom (userId) {
    return !!this.getUserInfoById(userId)
  }
  removeUser (userId) {
    this.userList = this.userList.filter(u => u.userId !== userId)
  }
  beginGame () {
    this.beginTs = Date.now()
    this.status = utils.roomStatus.gaming
  }
  endGame () {
    this.endTs = Date.now()
    this.status = utils.roomStatus.over
  }
  get isMatch2 () {
    return [
      utils.WebSocketConnectEnum.Match2Random,
      utils.WebSocketConnectEnum.Match2Random_Old_Rule,
      utils.WebSocketConnectEnum.Match2Invite_Old_Rule
    ].includes(this.type)
  }
  get isOldRuleMatch () {
    return [
      utils.WebSocketConnectEnum.Match2Random_Old_Rule,
      utils.WebSocketConnectEnum.Match4Random_Old_Rule,
      utils.WebSocketConnectEnum.Match2Invite_Old_Rule,
      utils.WebSocketConnectEnum.Match4Invite_Old_Rule
    ].includes(this.type)
  }
  get roomPlayCount () {
    return this.isMatch2 ? 2 : 4
  }
  get isRoomUserEnough () {
    return this.userList.length >= this.roomPlayCount
  }
  isUserInRoom (userId) {
    return this.userList.some(u => u.userId === userId)
  }
  get ACK () {
    return this.userList.length > 0 && this.userList.every(u => u.ACK === true)
  }
  userACKConfirm(userId) {
    let user = this.userList.find(u => u.userId === userId)
    if (user) {
      user.ACK = true
    } else {
      utils.logger.warn(`User(${userId}) is missing in room(${this.code}).`)
    }
  }
  userConnList (excludeUserIdList = []) {
    return this.userList.filter(u => !excludeUserIdList.includes(u.userId)).map(u => u.conn)
  }
  get userIdList () {
    return this.userList.map(u => u.userId) || []
  }
  getScoreList () {
    let func = this.getUserScoreById.bind(this)
    return this.userList.map(u => {
      return func(u.userId)
    })
  }
  getUserScoreById (userId) {
    let score = 0
    this.questionList.forEach(q => {
      score += q.getUserScoreById(userId)
    })
    return score
  }
  getUserBasicInfoList (excludeUserIdList = []) {
    return this.userList.filter(u => !excludeUserIdList.includes(u.userId)).map(u => ({
      userId: u.userId,
      userName: u.userName,
      avatar: u.avatar,
      apartment: u.apartment
    }))
  }
  get isFinish () {
    let isFinish = false
    // 比赛结束的判定
    if (this.isOldRuleMatch) {
      // 有一方达到80分
      const scoreList = this.getScoreList()
      const winUser = scoreList.filter(s => s >= this.winScore)
      if (winUser.length > 0) {
        isFinish = true
        utils.logger.info(`Room结束,用户达到winScore. winScore = ${this.winScore}. userScore=${winUser.join(',')}`)
      }
    } else {
      const userCount = this.userList.length
      isFinish = this.questionList.filter(q => q.userAnswer.length === userCount).length >= this.questionLength
    }
    return isFinish
  }
  get questionIdList () {
    return this.questionList.map(q => q.questionId)
  }
  get isAllUserAlive () {
    return this.userList.length > 0 && this.userList.every(u => u.conn.readyState === 1)
  }
  addNewQuestion (question) {
    this.questionList.push(Object.assign(question, {
      questionId: question.id
    }))
    if (this.questionList.length > this.questionLength && this.questionLength > 0) {
      this.questionList = this.questionList.slice(this.questionList.length - this.questionLength) 
    }
  }
  addMultipleQuestions (list) {
    for (let i = 0; i < list.length; i++) {
      this.addNewQuestion(list[i])
    }
  }
  getQuestionById (questionId) {
    return this.questionList.find(q => q.questionId === questionId)
  }
  hasUserAnswerQuestion (userId, questionId) {
    let question = this.getQuestionById(questionId)
    if (question) {
      return question.userAnswer.some(a => a.userId === userId)
    }
    return false
  }
  isQuestionAllUserAnswer (questionId) {
    return this.getQuestionById(questionId).userAnswer.length == this.userList.length
  }
  // 获取下一个待答题
  getNextQuestion () {
    let waitAnswerQuestions = this.questionList.filter(q => q.userAnswer.length === 0)
    return waitAnswerQuestions.length > 0 ? waitAnswerQuestions[0] : null
  }
  initConfigData () {
    configCenter.getMultipleConfig().then(obj => {
      this.matchTime = parseInt(obj.multiple_time)
      this.expiredTime = Date.now() + (this.matchTime + 60 * 10) * 1000
      this.perScore = parseInt(obj.multiple_per_score)
      this.winScore = parseInt(obj.multiple_finish_score)
    })
  }
  get isExpired () {
    return Date.now() >= this.expiredTime 
  }
  markAllQuestionHasSent () {
    this.questionList.forEach(q => q.hasSend = true)
  }
  get unSendQuestionList () {
    return this.questionList.filter(q => !q.hasSend)
  }
}

module.exports = Room
