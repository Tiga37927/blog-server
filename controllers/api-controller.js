const User = require('../models/user')

module.exports = {
  async getUserInfo(ctx, next) {
    await User.find(function (err, users) {
      if (err) return console.error(err);
      ctx.render('index', {
        title: 'some select',
        users: users
      })
    })
  },
  async saveUser(ctx, next) {    
    const user = new User({
      username: 'aaa',
      password: '0123456'
    })
    await user.save(function(err, doc){
      if (err) {
        console.log('save error:' + err);
      }
    
      console.log('save sucess \n' + doc);
    })
  },
  async createUser(ctx, next) {
    await ctx.render('signup', {
      title: 'create user'
    })
  }
}