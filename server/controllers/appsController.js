import db from '../models/myModel';

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

  editApp: async(req, res, next) => {
    console.log('entered editApps in the appController middleware');
    const { company_name, date, app_form, stack} = req.body;
    const tableName = 'application';
    const query = `UPDATE ${tableName} SET company_name = ${company_name}, SET dat = ${date}, SET app_form = ${app_form} SET stack = ${stack}`;
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

  deleteApp: (req, res, next) => {
    return next();
  },
};

module.exports = appsController;
