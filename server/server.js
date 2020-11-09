const Koa = require('koa')
const fs = require('fs')
const route = require('koa-route')
const cors = require('koa2-cors')

const app = new Koa()

// 允许跨域
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
});

// 允许跨域
app.use(cors())

app.use(route.post('/post', (ctx) => {
    ctx.response.body = {name: 'sff'}
}))

app.use(async ctx => {
    
    console.log(ctx)
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('./home/index.html')
    
})

app.listen(8888)
console.log('服务器已启动...')
