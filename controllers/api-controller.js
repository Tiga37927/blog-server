const User = require('../models/user')


module.exports = {
  // 用户查询
  async userInfo(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null,
    }
    await User.find(function (err, users) {
      if (err) {
        result.success = false
        result.msg = err
      } else {
        result.success = true
        result.message = '查询成功'
        result.data = users
      }
    })
    ctx.body = result
  },
  // 用户保存
  async userSave(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null,
    }
    let params = ctx.request.body
    const user = new User(params)
    await user.save(function(err, doc){
      if (err) {
        result.success = false
        result.message = err.message
      } else {
        result.success = true
        result.message = '保存成功'
      }
    })
    ctx.body = result
  },
  async signIn(ctx, next) {
    ctx.body = {
      success: true,
      msg: '登陆成功'
    }
  },
  async signUp(ctx, next) {    
    ctx.body = {
      success: true,
      msg: '注册成功'
    }
  },
}