const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'webcourse.cs.nuim.ie',
  user: 'u240322',
  password: 'Ni4pu6quie2Oosai',
  database: 'cs230_u240322'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;
