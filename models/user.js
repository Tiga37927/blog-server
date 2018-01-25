const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true, 'name is required'
    ],
    unique: true
  },
  salt: String,
  hashpassword: String,
  phone: Number,
  email: {
    type: String,
    lowercase: true
  },
  sex: {
    type: String,
    enum: [
      'male', 'female'
    ],
    default: 'male'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  like_list: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Article'
  }
})
// 校验name重复
UserSchema
  .path('name')
  .validate({
    isAsync: true,
    validator: (v, cb) => {
      const self = this;
      self
        .constructor
        .findOne({
          name: v
        }, (err, user) => {
          if (user && self.id !== user.id) {
            cb(false)
          }
          cb(true)
        })
    },
    message: '这个呢称已经被使用!'
  })
UserSchema
  .virtual('password')
  .set((password) => {
    const self = this
    const saltBounds = 10
    this._password = password
    this.salt = this.makeSalt(saltBounds)
    this.hashpassword = this.encryptPassword(password, this.salt)
  })
  .get(() => {
    return this._password
  })

UserSchema.statics = {
	//生成盐
	makeSalt: (saltBounds) => {
	  return bcrypt.genSaltSync(saltBounds)
	},
	//生成密码
	encryptPassword: (password, salt) => {
	  return bcrypt.hashSync(password, salt)
  },
  // 比较
  compare: (data, encrypted) => {
    return bcrypt.compare(data, encrypted)
  }
}
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel