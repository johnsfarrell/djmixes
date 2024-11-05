// config/db.js
// Place Holders for database for now
// TODO: Update this when implement database
const mysql = require('mysql2');


// Place Holders for database for now
// TODO: Update this when implement database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', 
  database: 'mixes'
});

db.connect((err) => {
  if (err) throw err; 
  console.log('Connected to the database');
});

module.exports = db;