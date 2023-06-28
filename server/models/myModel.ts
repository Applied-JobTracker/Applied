import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config';

const PG_URI: string = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

pool.connect((err: Error) => {
  if (err) console.error('Error connecting to database');
  else console.log('connected to database');
  return;
});

const db = {
  query: async (string: string, params?: any[]): Promise<any> => {
    try {
      return await pool.query(string, params);
    } catch (err) {
      console.error('Error execuiting query:', err);
      throw err;
    }
  },
};

export default db;
