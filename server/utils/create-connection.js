var mysql  = require('mysql')
const MYSQL_CONFIG = require('../config/mysql_config')

var connection = mysql.createConnection(MYSQL_CONFIG);


const query = function(sql, val) {
    return new Promise((resolve, reject) => {
        // 连接mysql
        connection.connect((err) => {
            if (err) {
                reject(err)
                return;
            }
            console.log('connected as id ' + connection.threadId);
            connection.query(sql,function (err, result) {
                if(err) reject(err)
                resolve(result);
            });
        })
    })
}

// 连接mysql
connection.connect((err) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('connected as id ' + connection.threadId);
    var  sql = 'SELECT * FROM article'
    connection.query(sql,function (err, result) {
        if(err){
          return;
        }
    
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
    });
})

module.exports = connection