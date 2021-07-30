
const mysql = require('../../utils/query')
const Admin = require('../../utils/admin')

module.exports = {
    // 获取文章
    async getArticle() {
        let sql = `SELECT * FROM articles`
        let data = null
        try {
            data = await mysql.query(sql)
            console.log(data)
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
        if (!await Admin.isAuthenticated(ctx)) {
            console.log('没有认证通过')
            return
        }

        let author = body.author
        let content = body.content
        content = content.replace(/\"/g, '\\\"').replace(/\'/g, '\\\'')
        let module = body.module
        let token = body.token
        let createtime = '' + timestamp
        // let star = ''
        // let state = ''
        let tag = body.tag
        let title = body.title
        let updatetime = '' + timestamp
        let sql = `INSERT INTO articles (author, content, module, createtime, tag, title, updatetime) VALUES ('${author}', '${content}', '${module}', '${createtime}', '${tag}', '${title}', '${updatetime}');`
        try {
            await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', returnMessage: '创建成功', token }
        } catch (err) {
            console.log(err)
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 删除文章
    async deleteArticle(ctx) {
        let body = ctx.request.body
        let id = body.id
        if (!id) {
            ctx.response.body = {returnCode: '999999', returnMessage: 'id 字段必输'}
            return
        }
        let sql = `DELETE FROM articles WHERE(id=${id})`
        try {
            data = await mysql.query(sql)
            console.log(data)
            ctx.response.body = {returnCode: '000000', data, returnMessage: '删除成功'}
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 更新文章
    async updateArticle(ctx, next) {
        let body = ctx.request.body
        if (!await Admin.isAuthenticated(ctx)) {
            console.log('没有认证通过,没有登录')
            return
        }
        let id = body.id
        let content = body.content.replace(/\"/g, "\\\"").replace(/\'/g, "\\\'")

        if (!content) {
            ctx.response.body = {returnCode: '999999', returnMessage: '"content"字段必输'}
            return;
        }
        let sql = `UPDATE articles SET content='${content}' WHERE(id='${id}');`
        try {
            await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', returnMessage: '更新成功'}
        } catch (err) {
            console.log('更新文章失败')
            console.log(err)
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 测试
    async test(ctx, next) {
        await next();
    }
}