const router = require('koa-router')()
const apiController = require('../controllers/api-controller')

const routers = router
  .get('/userInfo', apiController.userInfo)
  .post('/userSave', apiController.userSave)

module.exports = routers