const mongoose = require('mongoose')

ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

module.exports = ArticleModel