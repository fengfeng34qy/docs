const mysql = require('../utils/query')

module.exports = {
    // 注册用户
    async signup(ctx) {
        console.log(ctx.request.body)
        let body = ctx.request.body
        let currentDate = +new Date()
        let username = body.username
        let password = body.password
        let face = body.face || ''
        let role = body.role || 0
        let token = ''
        let createtime = currentDate
        let updatetime = currentDate
        let sql = `INSERT INTO users (username, password, face, role, token, createtime, updatetime) VALUES ('${username}', '${password}', '${face}', '${role}', '${token}', '${createtime}', '${updatetime}');`
        let data = null
        try {
            data = await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}
        } catch (err) {
            if  (err.code === 'ER_DUP_ENTRY') {
                ctx.response.body = {returnCode: err.code, returnMessage: '用户已存在！', err}
            } else {
                ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
            }
        }
    },
    // 用户登录
    async signin(ctx) {
        console.log(ctx.request.body)
        let body = ctx.request.body
        let timestamp = String(+new Date())
        let username = body.username
        let password = body.password
        let sql = `SELECT * FROM users where username='${username}'`
        let data = null
        try {
            data = await mysql.query(sql)
        let password = body.password
            if (data[0].password === password) {
                let token = Buffer.from(timestamp).toString('base64')
                let s = `UPDATE users SET token='${token}' WHERE username="${username}";`
                try {
                    let result = await mysql.query(s)
                    ctx.response.body = {returnCode: '000000', data: result, returnMessage: '成功', token }
                } catch (err) {
                    ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
                    return;
                }
                ctx.response.body = {returnCode: '000000', data, returnMessage: '成功', token }
            } else {
                ctx.response.body = {returnCode: '999999', data, returnMessage: '密码错误'}
            }
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    }
}