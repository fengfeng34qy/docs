const mysql = require('mysql')
const MYSQL_CONFIG = require('../config/mysql_config')

// mysql
const pool = mysql.createPool(MYSQL_CONFIG)

module.exports = pool