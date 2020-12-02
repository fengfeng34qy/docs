
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
    async addArticle(ctx) {
        let body = ctx.request.body
        let timestamp = +new Date()
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
            ctx.body = {returnCode: '000000', returnMessage: '创建成功' }
        } catch (err) {
            ctx.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 删除文章
    delArticle(ctx) {
        let body = ctx.request.body
        let id = body.id
    }
}