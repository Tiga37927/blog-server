const path = require('path')
const koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const koajwt = require('koa-jwt')

const router = require('./routes')
const config = require('./config')
const error = require('./middlewares/error')
const logger = require('./middlewares/logger')

// 链接数据库
mongoose
  .connect(config.mongodb)
  .then(() => {
    console.log("数据库连接成功");
  }, err => {
    console.log("数据库连接失败：" + error);
  });

const app = new koa()

app.use(error())
app.use(logger())
app.use(bodyParser())
app.use(koajwt({secret: config.tokenSecert}).unless({path: [/^\/auth\/signIn/, /^\/auth\/signUp/]}))
// 引用路由
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port)

console.log(`app started at port:${config.port}`)