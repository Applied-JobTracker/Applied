const { Client } = require('pg');
const connectionString = process.env.PG_URI;
const client = new Client({ connectionString });

const appsController = {
  getApps: async (req, res, next) => {
    const tableName = 'application';
    const query = `SELECT * FROM ${tableName}`;

    try {
      const result = await client.query(query);
      req.tableData = result.rows;
      return next();
    } 
  },

  addApp: (req, res, next) => {
    return next();
  },

  editApp: (req, res, next) => {
    return next();
  },

  deleteApp: (req, res, next) => {
    return next();
  },
};

module.exports = appsController;
