const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: 'postgres',        // same as pgAdmin
  password: "ayushgaurav@30", // same as pgAdmin
  database: 'ems_db',
  port: 5432
});

// Optional test
db.connect()
  .then(() => console.log('PostgreSQL connected'))
  .catch(err => console.error(err));

module.exports = db;
