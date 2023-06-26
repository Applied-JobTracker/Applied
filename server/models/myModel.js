const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

pool.connect((err) => {
  if (err) console.error('Error connecting to database');
  else console.log('connected to database');
  return;
});

const db = {
  query: async (string, params, callback) => {
    return pool.query(string, params, callback);
  },
};

module.exports = db;
