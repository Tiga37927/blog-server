const router = require('koa-router')()
const apiController = require('../controllers/api-controller')

const routers = router
  .get('/userInfo', apiController.getUserInfo)
  .get('/saveUser', apiController.createUser)
  .post('/saveUser', apiController.saveUser)

module.exports = routers