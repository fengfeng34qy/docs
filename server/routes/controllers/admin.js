const mysql = require('../../utils/query')

module.exports = {
    async isAuthenticated(ctx, next) {
        let timestamp = +new Date()
        let token = ctx.request.body.token
        try {
            let data = await mysql.query(`SELECT * FROM users where token='${token}'`)
            if (data.length > 0) {
                if (data[0].timeout <= timestamp) {
                    ctx.response.body = {returnCode: '999999',returnMessage: '登录超时' }
                    return false
                } else {
                    return true
                }
            } else {
                ctx.response.body = {returnCode: '999999',returnMessage: '请先登录' }
                return false
            }
        } catch (error) {
            ctx.body = {returnCode: '999999',returnMessage: error.sqlMessage, error }
            return false
        }
    },
    async deleteArticleAuthority(ctx, next) {
        let body = ctx.request.body
        let id = body.id
        let token = body.token
        let username = body.userInfo.username
        let isAuthenticated = body.isAuthenticated || false
        if (isAuthenticated === false) {
            ctx.response.body = {returnCode: '999999',returnMessage: '请先登录！' }
            return;
        }
        if (!id) {
            ctx.response.body = {returnCode: '999999',returnMessage: 'id字段必输' }
            return;
        }
        if (!token) {
            ctx.response.body = {returnCode: '999999',returnMessage: 'token字段必输' }
            return;
        }
        if (!username) {
            ctx.response.body = {returnCode: '999999',returnMessage: 'username字段必输' }
            return;
        }
        if (username !== 'admin') {
            ctx.response.body = {returnCode: '999999',returnMessage: '没有管理员权限，请联系站长！' }
            return;
        }
        await next()
    }
}