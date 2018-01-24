const router = require('koa-router')()
const articleController = require('../controllers/article-controller')

const routers = router
  .post('/articleAdd', articleController.articleAdd)

module.exports = routers