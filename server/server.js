const Koa = require('koa')
const fs = require('fs')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
var router = require('./routes/router')
const KoaStatic = require('koa-static');
const session = require('koa-session');   // 导入koa-session

const session_signed_key = ["some secret hurr"];
const session_config = {
    key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
    maxAge: 180000,   /**  session 过期时间，以毫秒ms为单位计算 。*/
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

// 静态资源
app.use(KoaStatic('./dist'));

// app.use(koaBody({ multipart: true }));
app.use(bodyParser({
    strict:false,
    jsonLimit: '5mb',
    formLimit: '5mb',
    xmlLimit: '5mb'
}))

// 允许跨域
app.use(cors())

app.use(router.routes())

app.use(async ctx => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./dist/index.html')
    // ctx.body = 'hello word'
})

app.listen(8888)
console.log('服务器已启动... http://localhost:8888/')
