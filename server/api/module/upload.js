const path = require('path')
const utils = require('../../utils')
const multer = require('multer')
const sqlUtils = require('../../sql')

const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, path.join(__dirname, '../../../static/demo'))
    },
    filename (req, file, cb) {
      const fileName = utils.formatDate(new Date(), 'yyyy-MM-dd_hh-mm-ss') + ' - ' + file.originalname
      cb(null, fileName)
    }
  })
})
module.exports = function (router) {
  router.post('/op/work', upload.single('workUploadImg'),async function (req, res) {
    let img = ''
    if (req && req.file) {
      const {filename} = req.file
      img = `/public/demo/${filename}`
    }
    const {id} = req.body
    req.body.img = img
    const resData = {
      isSuccess: false
    }
    if (id) {
      resData.isSuccess = await editWork(req.body)
    } else {
      resData.id = await addWork(req.body)
      resData.isSuccess = !!resData.id
    }
    utils.response(res, resData)
  })
}

function addWork ({title, type, link, description, category, img}) {
  return new Promise((resolve, reject) => {
    const newId = utils.uuid()
    const sql = `INSERT INTO ${utils.tableName.work}
    (id,title,description,img,type,link,category,create_date) VALUES
    ('${newId}','${title}','${description}','${img || ''}',${type},'${link}','${category}',NOW())`
    sqlUtils.execute(sql).then(result => {
      const appendSuccess = result.affectedRows === 1
      resolve(appendSuccess ? newId : false)
    })
  })
}
function editWork ({id, title, type, link, description, category, img}) {
  return new Promise((resolve, reject) => {
    var editSql = `UPDATE ${utils.tableName.work} SET `
    const setArr = [
      title ? `title='${utils.parseUserInput(title)}'` : '',
      description ? `description='${utils.parseUserInput(description)}'` : '',
      `img='${utils.parseUserInput(img)}'`,
      `type=${type}`,
      link ? `link='${utils.parseUserInput(link)}'` : '',
      category ? `category='${category}'` : '',
    ]
    editSql += setArr.filter(i => !!i).join(',') + ` WHERE id='${id}'`
    sqlUtils.execute(editSql).then(result => {
      resolve(result.affectedRows === 1)
    })
  })
}