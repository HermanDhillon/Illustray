const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  max: 20
});

pool.connect((err, client, release) => {
  if (err) {
    throw new Error('Cannot connect to DB', err.stack);
  }
  console.log('Postgres DB connected!');
  release();
});

module.exports = { pgPool: pool };
