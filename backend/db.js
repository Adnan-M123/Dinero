const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'debeli',
  password: 'Lekson123!',
  database: 'dinero',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
