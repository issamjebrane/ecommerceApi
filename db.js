const mysql = require('mysql');

// Create a MySQL connection pool
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root12345',
  database: 'ecommerce'
});



module.exports = db;
