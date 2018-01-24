const router = require('koa-router')()
const auth = require('./auth')
const article = require('./article')

router.use('/auth', auth.routes(), auth.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())

router.get('/*', (ctx,next)=> {
  ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
})

module.exports = router