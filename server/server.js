const Koa = require('koa')
// const fs = require('fs')
const route = require('koa-route')
const cors = require('koa2-cors')
const mysql = require('./utils/query')
const bodyParser = require('koa-bodyparser')
const { Language, User } = require('./routes')
const session = require('koa-session');   // 导入koa-session

const session_signed_key = ["some secret hurr"];
const session_config = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 4000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
    autoCommit: true, /** 自动提交到响应头。(默认是 true) */
    overwrite: true, /** 是否允许重写 。(默认是 true) */
    httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
    signed: true, /** 是否签名。(默认是 true) */
    rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
    renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

const app = new Koa()
app.keys = session_signed_key;
app.use(session(session_config, app));

// app.use(koaBody({ multipart: true }));
app.use(bodyParser({strict:false}))

// 允许跨域
app.use(cors())

/* 路由 */
app.use(route.post('/post', (ctx) => {
    console.log(ctx.request.body)
    ctx.response.body = {data: '测试post返回数据'}
}))

// 添加语言模块
app.use(route.post('/addLanguage', Language.addLanguage))

// 查询语言模块
app.use(route.post('/getLanguages', Language.getLanguages))

// 注册
app.use(route.post('/signup', User.signup))

// 登录
app.use(route.post('/signin', User.signin))

// 获取用户信息
app.use(route.post('/getUserInfo', User.getUserInfo))

app.use(async ctx => {
    // console.log('-------------')
    // console.log(ctx.method)
    // console.log(ctx.request)
    // let data = await mysql.query(`SELECT * FROM article`)
    // ctx.body = {data: data}
    console.log(ctx.session)
    ctx.response.type = 'html'
    // ctx.response.body = fs.createReadStream('./home/index.html')
    ctx.body = 'hello word'
})

app.listen(8888)
console.log('服务器已启动... http://localhost:8888/')
