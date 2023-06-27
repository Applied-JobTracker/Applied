import { Request, Response, RequestHandler, NextFunction } from 'express';
import { QueryResult } from 'pg';
import db from '../models/myModel';

interface AppRequest extends Request {
  body: {
    company_name: string;
    date: Date;
    app_form: string;
    stack: string;
    user_id: string;
    application_id?: string;
  };
  params: {
    application_id?: string;
  };
}

interface AppResponse extends Response {
  locals: {
    tableData?: any;
  };
}

const appsController = {
  getApps: async (req: AppRequest, res: AppResponse, next: NextFunction) => {
    const tableName = 'application';
    const user_id = req.params.user_id;
    const query = `SELECT * FROM ${tableName}  WHERE user_id = ${user_id}`;
    try {
      const result: QueryResult = await db.query(query);
      res.locals.tableData = result.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.getApp: ${err}`,
        status: 500,
        message: 'Internal server error',
      });
    }
  },

  addApp: async (req: AppRequest, res: AppResponse, next: NextFunction) => {
    const tableName = 'application';
    const values = [
      req.body.company_name,
      req.body.date,
      req.body.app_form,
      req.body.stack,
      req.body.user_id,
    ];
    const addAppQuery = `INSERT INTO ${tableName}(company_name, date, app_form, stack, user_id) VALUES($1, $2, $3, $4, $5)`;
    try {
      const result: QueryResult = await db.query(addAppQuery, values);
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.addApp: ${err}`,
        status: 500,
        message: 'Internal server error',
      });
    }
  },

<<<<<<< HEAD:server/controllers/appsController.tsx
  editApp: async (req: AppRequest, res: AppResponse, next: NextFunction) => {
    console.log('entered editApps in the appController middleware');
    const { company_name, date, app_form, stack, application_id } = req.body;
=======
  editApp: async (req, res, next) => {
    const { company_name, date, app_form, stack } = req.body;
>>>>>>> dev:server/controllers/appsController.js
    const tableName = 'application';
    const { user_id, application_id } = req.params;
    const query = `UPDATE ${tableName} SET company_name = '${company_name}', date = '${date}', app_form = '${app_form}', stack = '${stack}' WHERE user_id = ${user_id} AND application_id = ${application_id} RETURNING *`;
    try {
<<<<<<< HEAD:server/controllers/appsController.tsx
      const result: QueryResult = await db.query(query);
      console.log(result.rows);
      res.tableData = result.rows;
=======
      const result = await db.query(query);
      res.locals.updatedTableData = result.rows[0];
>>>>>>> dev:server/controllers/appsController.js
      return next();
    } catch (err) {
      return next({
        log: `Error in appController.editApp: ${err}`,
        status: 500,
        message: 'Internal server error',
      });
    }
  },

  deleteApp: async (req: AppRequest, res: AppResponse, next: NextFunction) => {
    const tableName = 'application';
    const { application_id } = req.params;
    const deleteAppQuery = `DELETE FROM ${tableName} WHERE application_id = ${application_id}`;
    try {
      const result: QueryResult = await db.query(deleteAppQuery);
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.deleteApp: ${err}`,
        status: 500,
        message: 'Internal server error',
      });
    }
  },
};

module.exports = appsController;
