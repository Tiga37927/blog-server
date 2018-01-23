const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
  username: {// 真实姓名
    type: String,
    required: true
  },
  password: { // 密码
    type: String,
    required: true
  }  
}, {
  timestamps: { createdAt: 'created_at' }
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel