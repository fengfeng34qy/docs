
const mysql = require('../../utils/query')
module.exports = {
    async index(ctx) {
        try {
            let data = {}

            data.articles = await mysql.query(`SELECT * FROM articles`)

            data.languages = await mysql.query(`SELECT * FROM languages`)

            ctx.response.body = {returnCode: '000000', data, returnMessage: '成功'}

        } catch (err) {
            console.log(err)
            if (typeof err === 'object') {
                ctx.response.body = {returnCode: '999999', err, returnMessage: '失败'}
            } else {
                ctx.response.body = {returnCode: '999999', err: err, returnMessage: '失败'}
            }
        }
    }
}