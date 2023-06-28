const db = require("../models/myModel");

const appsController = {
  getApps: async (req, res, next) => {
    const tableName = "application";
    const user_id = req.params.user_id;
    const query = `SELECT * FROM ${tableName}  WHERE user_id = ${user_id}`;
    try {
      const result = await db.query(query);
      res.locals.tableData = result.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.getApp: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
  addApp: async (req, res, next) => {
    const tableName = "application";
    console.log("addApp controller req body", req.body);
    const values = [
      req.body.company_name,
      req.body.date,
      req.body.app_form,
      req.body.stack,
      req.body.progress,
      req.body.user_id,
    ];
    const addAppQuery = `INSERT INTO ${tableName}(company_name, date, app_form, stack, progress, user_id) VALUES($1, $2, $3, $4, $5, $6)`;
    try {
      const result = await db.query(addAppQuery, values);
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.addApp: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
  editApp: async (req, res, next) => {
    const { company_name, date, app_form, stack, progress } = req.body;
    const tableName = 'application';
    const { application_id } = req.params;
    const query = `UPDATE ${tableName} SET company_name = '${company_name}', date = '${date}', app_form = '${app_form}', stack = '${stack}', progress='${progress}' WHERE application_id = ${application_id} RETURNING *`;
    try {
      const result = await db.query(query);
      res.locals.updatedTableData = result.rows[0];
      return next();
    } catch (err) {
      return next({
        log: `Error in appController.editApp: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },

  deleteApp: async (req, res, next) => {
    const tableName = "application";
    const { application_id } = req.params.application_id;
    const deleteAppQuery = `DELETE FROM ${tableName} WHERE application_id = ${application_id}`;
    try {
      const result = await db.query(deleteAppQuery);
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.deleteApp: ${err}`,
        status: 500,
        message: "Internal server error",
      });
    }
  },
};

module.exports = appsController;
