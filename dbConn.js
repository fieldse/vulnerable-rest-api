// MySQL database connection
const mysql = require('mysql');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('./config.js');

// Initialize database connection
function newConn() {
  return mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
}

module.exports = {
  newConn,
};
