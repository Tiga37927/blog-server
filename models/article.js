const mongoose = require('mongoose')

let ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  auth_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  content: {
    type: String
  }
})

const ArticleModel = mongoose.model('Article', ArticleSchema)

module.exports = ArticleModel