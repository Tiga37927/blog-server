const jwt = require('jsonwebtoken')
const tokenSecert = require('../config/index').tokenSecert

module.exports = () => {
  return async (ctx, next) => {
    const token = ctx.header.authorization.split(' ')[1]
    let payload
    if (token) {
      payload = jwt.decode(token, tokenSecert);
      jwt.verify(token, tokenSecert, function(err, payload) {
        console.log(payload)
        payload = payload
      })
      ctx.body = {
        payload
      }
    } else {
      ctx.body = {
        message: 'token 错误',
        code: -1
      }
    }
    await next()
  }
}