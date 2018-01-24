const router = require('koa-router')()
const authController = require('../controllers/auth-controller')

const routers = router
  .get('/userInfo', authController.userInfo)
  .post('/userSave', authController.userSave)
  .post('/signIn', authController.signIn)

module.exports = routers