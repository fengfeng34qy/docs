
const mysql = require('../../utils/query')
module.exports = {
    async index(ctx) {
        try {
            let data = {}

            data.articles = await mysql.query(`SELECT * FROM articles`)
            data.articles.sort((a, b) => {
                return b.createtime - a.createtime
            })
            data.languages = await mysql.query(`SELECT * FROM languages`)

            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}

        } catch (err) {
            console.log(typeof err)
            console.log(err)
            if (typeof err === 'object') {
                ctx.response.body = {returnCode: '999999', err, returnMessage: err.sqlMessage}
            } else {
                ctx.response.body = {returnCode: '999999', err: err, returnMessage: '失败'}
            }
        }
    }
}