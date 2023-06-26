import db from '../models/myModel';

const appsController = {
  getApps: (req, res, next) => {
    return next();
  },

  addApp: async (req, res, next) => {
    const tableName = 'application';
    const values = [
      req.params.application_id,
      req.body.date,
      req.body.app_form,
      req.body.stack,
      req.user.user_id,
    ];
    const addAppQuery = `INSERT INTO ${tableName}(application_id, company_name, date, app_form, stack, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    try {
      const result = await db.query(addAppQuery, values);
      console.log(result.rows);
      res.tableData = result.rows;
      return next();
    } catch (err) {
      console.error('Error executing addApp query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  editApp: (req, res, next) => {
    return next();
  },

  deleteApp: (req, res, next) => {
    return next();
  },
};

module.exports = appsController;
