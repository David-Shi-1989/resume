var express = require('express')
var router = express.Router()

require('./module/op')(router)
require('./module/upload')(router)
module.exports = router