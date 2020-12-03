const mysql = require('../../utils/query')

module.exports = {
    async addLanguage(ctx) {
        let timestamp = +new Date()
        let body = ctx.request.body
        let language = body.language
        let name = body.language
        let tag = body.tag
        let createtime = timestamp
        let updatetime = timestamp
        let sql = `INSERT INTO languages (language, name, tag, createtime, updatetime) VALUES ('${language}', '${name}', '${tag}', '${createtime}', '${updatetime}');`
        let data = null
        try {
            await mysql.query(sql)
            data = await mysql.query(`SELECT * FROM languages`)
            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}
        } catch (err) {
            console.log(err)
            if  (err.code === 'ER_DUP_ENTRY') {
                ctx.response.body = {returnCode: err.code, returnMessage: '已经存在，不能重复添加！', err}
            } else {
                ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
            }
        }
    },
    async getLanguages(ctx) {
        let sql = `SELECT * FROM languages`
        let data = null
        try {
            data = await mysql.query(sql)
            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}
        } catch (err) {
            ctx.response.body = {returnCode: err.code, returnMessage: err.sqlMessage, err}
        }
    }
}