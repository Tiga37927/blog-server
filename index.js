const path = require('path')
const koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')

const router = require('./routes')
const config = require('./config')

// 链接数据库
mongoose.connect(config.mongodb).then(
  () => { console.log("数据库连接成功");  },
  err => { console.log("数据库连接失败：" + error); }
);

const app = new koa()

// 切换模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 引用路由
app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(config.port)

console.log(`app started at port:${config.port}`)