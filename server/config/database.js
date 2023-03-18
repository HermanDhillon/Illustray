const { Pool } = require('pg');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config('./.env.prod');
} else {
  dotenv.config('./.env.dev');
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Postgres DB connected!');
  release();
});

module.exports = { pool };
