const Article = require('../models/article')

module.exports = {
  async articleAdd(ctx, next) {
    let result = {
      success: false,
      message: '',
      data: null
    }
    let params = ctx.request.body
    const article = new Article(params)
    await article
      .save()
      .then(function (article) {
        result.success = true
        result.message = `${article.title}保存成功`
        ctx.body = result
      })
      .catch(function (err) {
        result.success = false
        result.message = `${article.title}保存失败,${err.message}`
        ctx.body = result
      })
  },
}