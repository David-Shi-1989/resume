const isProduction = process.argv.slice(1,7).includes('production')
process.env.NODE_ENV = isProduction ? 'production' : 'development'
const express = require('express')
const http = require('http')
const session = require('express-session')
const MemoryStore = require('session-memory-store')(session)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const utils = require('./utils')
const ROOTPath = path.join(__dirname, '../')

const APIRouter = require('./api')
const HTTP_PORT = require('./setting').port()

const app = express()

app.use(cookieParser())
app.use(bodyParser.json({limit: '10Mb'}))
app.use(bodyParser.urlencoded({limit: '10Mb', extended: true}))
app.use(session({
  name: 'ssid',
  secret: 'lyman shi',
  store: new MemoryStore(),
  resave: false,
  saveUninitialized: true
}))

app.use('/public', express.static(path.join(ROOTPath, 'static')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
  res.header("x-zm-trackingemail","lyman.shi@zoom.us")
  if (!req.session.user) {
    req.session.user = {}
  }
  next()
})

app.use('/api', APIRouter)
http.createServer(app).listen(HTTP_PORT, function () {
  utils.logger.info('Shiwang.wang OP系统App(http) listen on port ' + HTTP_PORT + '!', utils.formatDate(new Date()))
})
