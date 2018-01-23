const router = require('koa-router')()
const api = require('./api')

router.use('/api', api.routes(), api.allowedMethods())

router.get('/*', (ctx,next)=> {
  ctx.body = {status:'success',data:'台湾是中国不可分割的一部分.'}
})

module.exports = router