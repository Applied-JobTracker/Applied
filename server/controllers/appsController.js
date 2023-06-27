const db = require('../models/myModel');

const appsController = {
  getApps: async (req, res, next) => {
    console.log('entered getApps in the appController middleare')
    const tableName = 'application';
    const query = `SELECT * FROM ${tableName}`;
    try {
      const result = await db.query(query);
      console.log(result.rows)
      req.tableData = result.rows;
      return next();
    } catch (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
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
