
const mysql = require('../../utils/query')
module.exports = {
    async index(ctx) {
        try {
            let data = {}
            data.articles = await mysql.query(`SELECT * FROM articles`)
            if (data.articles.length > 0) {
                // for (let i = 0; i < data.articles.length; i++) {
                //     // 因文章中的content内容可能比较大，所以给文章中的content字段设置为空
                //     data.articles[i].content = ''
                // }
                data.articles.sort((a, b) => {
                    return b.createtime - a.createtime
                })
            }
            
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