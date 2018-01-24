const jwt = require('jsonwebtoken')
const verify = jwt.verify

module.exports = function () {
  return async function checkAuth(ctx, next) {
    console.log('验证的中间件')
    await next()
  }
}