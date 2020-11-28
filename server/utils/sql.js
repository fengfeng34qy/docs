
// 创建表
const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS user(
    user_id INT(5) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_phone VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);`.replace(/[\r\n]/g, '')

// 查询数据表
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName}`

// 插入数据
const INSERT_TABLE = (tableName, {key, val}) => `INSERT INFO ${tableName}(${key}) VALUE (${val})`

// 更新数据
const UPDATE_TABLE = (tableName, {primaryKey, primaryVal}, {key, val}) => `UPDATE ${tableName} SET ${key}=${val}
WHERE(${primaryKey}=${primaryVal});`

// 删除数据
const DELETE_TABLE = (tableName, {primaryKey, primaryVal}) => `DELETE FROM user WHERE(${primaryKey}=${primaryVal})`

module.exports = {
    CREATE_TABLE,
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE
}