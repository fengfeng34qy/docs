const mysql = require('../../utils/query')

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
    // 退出
    async signout(ctx) {},
    // 用户登录
    async signin(ctx) {
        let body = ctx.request.body
        let timestamp = +new Date()
        let username = body.username
        let password = body.password
        let sql = `SELECT * FROM users where username='${username}'`
        let data = null
        try {
            data = await mysql.query(sql)
            let password = body.password
            // 验证密码
            if (data[0].password === password) {
                let token = Buffer.from("" + timestamp).toString('base64')
                let timeout = String(timestamp + 1000*60*30)
                let s = `UPDATE users SET token='${token}', timeout='${timeout}' WHERE username="${username}";`
                try {
                    await mysql.query(s)
                    ctx.response.body = {returnCode: '000000', data: data[0], returnMessage: '登录成功', token }
                } catch (err) {
                    ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
                }
            } else {
                ctx.response.body = {returnCode: '999999', data, returnMessage: '密码错误'}
            }
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    },
    // 获取用户信息
    async getUserInfo(ctx) {
        let currentTimestamp = +new Date()
        let body = ctx.request.body
        let token = body.token
        let sql = `SELECT * FROM users where token='${token}'`
        let data = null
        try {
            data = await mysql.query(sql)
            if (data.length > 0) {
                if (data[0].timeout > currentTimestamp) {
                    try {
                        let username = data[0].username
                        let newToken = Buffer.from("" + currentTimestamp).toString('base64')
                        let newTimeout = '' + (currentTimestamp + 1000*60*30)
                        let s = `UPDATE users SET token='${newToken}', timeout='${newTimeout}' WHERE username="${username}";`
                        await mysql.query(s)
                        ctx.body = {returnCode: '000000',data: data[0],returnMessage: '成功',token: newToken }
                    } catch (err) {
                        ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
                    }
                } else {
                    ctx.body = {returnCode: '999999',returnMessage: '登录超时' }
                }
            } else {
                ctx.body = {returnCode: '999999',returnMessage: '未登录' }
            }
        } catch (err) {
            ctx.body = {returnCode: '999999',returnMessage: err.sqlMessage, err }
        }
    }
}