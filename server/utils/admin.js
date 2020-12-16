const mysql = require('./query')

module.exports = {
    async isAuthenticated(ctx) {
        let timestamp = +new Date()
        let token = ctx.request.body.token
        try {
            let data = await mysql.query(`SELECT * FROM users where token='${token}'`)
            if (data.length > 0) {
                console.log(data)
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
            console.log(error)
            ctx.body = {returnCode: '999999',returnMessage: error.sqlMessage, error }
            return false
        }
    },
    async isAdmin(ctx) {
        
    }
}