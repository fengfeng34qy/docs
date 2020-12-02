
const mysql = require('../../utils/query')

module.exports = {
    // 获取文章
    async getArticle() {
        let sql = `SELECT * FROM articles`
        let data = null
        try {
            data = await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 创建文章
    async addArticle(ctx, next) {
        let body = ctx.request.body
        let timestamp = +new Date()
        // 认证
        let token = body.token
        try {
            let data = await mysql.query(`SELECT * FROM users where token='${token}'`)
            if (data.length > 0) {
                console.log(data)
                if (data[0].timeout <= timestamp) {
                    ctx.response.body = {returnCode: '999999',returnMessage: '登录超时' }
                    return
                }
            } else {
                ctx.response.body = {returnCode: '999999',returnMessage: '请先登录' }
                return
            }
        } catch (error) {
            ctx.body = {returnCode: '999999',returnMessage: error.sqlMessage, error }
            return
        }

        let author = body.author
        let content = body.content
        let module = body.module
        let createtime = '' + timestamp
        // let star = ''
        // let state = ''
        let tag = body.tag
        let title = body.title
        let updatetime = '' + timestamp
        let sql = `INSERT INTO articles (author, content, module, createtime, tag, title, updatetime) VALUES ('${author}', '${content}', '${module}', '${createtime}', '${tag}', '${title}', '${updatetime}');`
        try {
            await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', returnMessage: '创建成功' }
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 删除文章
    delArticle(ctx) {
        let body = ctx.request.body
        let id = body.id
    }
}