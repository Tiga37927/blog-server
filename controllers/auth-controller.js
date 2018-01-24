const User = require('../models/user')

module.exports = {
  // 用户查询
  async userInfo(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null
    }
    await User
      .find()
      .then(function (users) {
        result.success = true
        result.message = '查询成功'
        result.data = users
        ctx.body = result
      })
      .catch(function (err) {
        result.success = false
        result.msg = err
        ctx.body = result
      })
  },
  // 用户保存
  async userSave(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null
    }
    let params = ctx.request.body
    const user = new User(params)
    await user
      .save()
      .then(function (user) {
        result.success = true
        result.message = `${user.name}保存成功`
        ctx.body = result
      })
      .catch(function (err) {
        result.success = false
        result.message = `${user.name}保存失败,${err.message}`
        ctx.body = result
      })
  },
  async signIn(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null
    }
    let params = ctx.request.body
    try {
      const user = await User.findOne({name: params.name})
      if (!user) {
        result.success = false
        result.message = `${params.name}不存在`
        ctx.body = result
      } else {
        await User
          .compare(params.password, user.hashpassword)
          .then(function (equal) {
            if (equal === true) {
              result.success = true
              result.message = "登陆成功"
              ctx.body = result
            } else {
              result.success = false
              result.message = "密码错误"
              ctx.body = result
            }
          })
          .catch(function (error) {
            result.success = false
            result.message = error.message
            ctx.body = result
          })
      }
    } catch (error) {
      result.success = false
      result.message = error.message
      ctx.body = result
    }
  },
  async signUp(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null
    }
    let params = ctx.request.body
    const user = new User(params)
    await user
      .save()
      .then(function (user) {
        result.success = true
        result.message = `${user.name}注册成功`
        ctx.body = result
      })
      .catch(function (err) {
        result.success = false
        result.message = `${user.name}注册失败,${err.message}`
        ctx.body = result
      })
  }
}