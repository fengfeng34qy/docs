const route = require('koa-route')
const fs = require('fs')

route.get('/', (ctx) => {
    ctx.response.type = 'html'
    ctx.response.body = fs.createReadStream('../home/index.html')
})

route.post('/post', (ctx) => {
    ctx.response.body = {data: '测试post请求'}
})

module.exports = route