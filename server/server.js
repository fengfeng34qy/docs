const Koa = require('koa')
// const fs = require('fs')
const route = require('koa-route')
const cors = require('koa2-cors')
const mysql = require('./utils/query')
// var moment = require('moment');
const bodyParser = require('koa-bodyparser')
// require('./routes')
// const koaBody = require('koa-body');


const app = new Koa()

// app.use(koaBody({ multipart: true }));
app.use(bodyParser({strict:false}))

// 允许跨域
app.use(cors())

/* 路由 */
app.use(route.post('/post', (ctx) => {
    console.log(ctx.request.body)
    ctx.response.body = {data: '测试post返回数据'}
}))

// console.log(moment(1606550217059).format('YYYYMMDD'))

// 添加语言模块
// app.use(route.post('/addLanguage', async ctx => {
//     console.log(ctx.req)
    // let language = '';
    // let name = '';
    // let content = '';
    // let createtime = +new Date();
    // let updatetime = +new Date();
    // let sql = `INSERT INTO languages VALUES (${language}, ${name}, ${content}, ${createtime}, ${updatetime});`
    // let data = await mysql.query(sql)
//     ctx.response.body = {data: '测试post返回数据'}
// }))
// app.use(async (ctx) => {
//     console.log('-------------')
    // console.log(ctx.method)
    // console.log(ctx.request)
    // let data = await mysql.query(`SELECT * FROM article`)
    // ctx.body = {data: data}
    // ctx.response.type = 'html'
    // ctx.response.body = fs.createReadStream('./home/index.html')
//     ctx.body = 'hello word'
// })

app.listen(8888)
console.log('服务器已启动... http://localhost:8888/')
