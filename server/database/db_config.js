const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       // 本地地址
  user: 'root',            // MySQL 用户名，默认一般是 root
  password: 'asdfgh321', // MySQL 密码
  database: 'test',     // 数据库名称
});

connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err.stack);
    return;
  }
  console.log('成功连接到数据库');
});

module.exports = connection;
