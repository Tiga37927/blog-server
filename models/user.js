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
  }
})

UserSchema
  .virtual('password')
  .set(function (password) {
    const self = this
    const saltBounds = 10
    this._password = password
    this.salt = this.makeSalt(saltBounds)
    this.encryptPassword(password, function(hashpassword) {
      this.hashpassword = hashpassword
    })
  })
  .get(function() {
    return this._password
  })
// 校验name重复
UserSchema
  .path('name')
  .validate({
    isAsync: true,
    validator: function (v, cb) {
      const self = this;
      self
        .constructor
        .findOne({
          name: v
        }, function (err, user) {
          if (user && self.id !== user.id) {
            cb(false)
          }
          cb(true)
        })
    },
    message: '这个呢称已经被使用!'
  })
// login
UserSchema.statics.login = function (name, password, cb) {
  this
    .findOne({
      name: name
    }, function (err, user) {
      if (err || !user) {
        if (err) 
          console.log(err);
        return cb(err, {
          code: -1,
          msg: username + ' is not exist!'
        });
      }
      bcrypt
        .compare(password, user.password, function (error, res) {
          if (error) {
            console.log(error);
            return cb(err, {
              code: -2,
              message: 'password is incorrect, please check it again!'
            });
          }

          return cb(null, user);
        })
    })
}
UserSchema.methods = {
	//生成盐
	makeSalt: function(saltBounds) {
	  return bcrypt.genSaltSync(saltBounds)
	},
	//生成密码
	encryptPassword: function(password, cb) {
	  return bcrypt.hash(password, this.salt, cb(hash))
	}
}
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel