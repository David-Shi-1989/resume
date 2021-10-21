const path = require('path')
const utils = require('../../utils')
const multer = require('multer')
const sqlUtils = require('../../sql/index')
const lodash = require('lodash')

const Uploader = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../../upload_files'))
    },
    filename (req, file, cb) {
      cb(null, utils.formatDate(new Date(), 'yyyy-MM-dd_hh-mm-ss') + ' - ' + file.originalname)
    }
  })
})
module.exports = function (router) {
  router.post('/op/question/upload', Uploader.single('questionUpload'), function (req, res) {
  })
}