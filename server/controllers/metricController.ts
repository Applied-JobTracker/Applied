import { Request, Response, RequestHandler, NextFunction } from 'express';
import { QueryResult } from 'pg';
import db from '../models/myModel';

interface AppRequest extends Request {
  body: {
    app_form: string;
    stack: string;
    progress: string;
    user_id: string;
    application_id?: string;
  };
  params: {
    user_id?: string;
    application_id?: string;
  };
}

interface AppResponse extends Response {
  locals: {
    tableData?: {
      'Total Apps': string;
      'Apps by Stack Percentage': {
        full: string;
        frontend: string;
        backend: string;
      };
      'Response Rate': {
        noResponse: string;
        anyResponse: string;
      };
      'Response Rate by App Style': {
        traditional: {
          noResponse: string;
          anyResponse: string;
        };
        quick: {
          noResponse: string;
          anyResponse: string;
        };
        codesmith: {
          noResponse: string;
          anyResponse: string;
        };
      };
    };
    updatedTableData?: { key: string; value: string };
  };
}
const metricController = {
  getMetrics: async (req: AppRequest, res: AppResponse, next: NextFunction) => {
    try {
      const [tableName, userID] = ['application', req.params.user_id];
      const query = `SELECT COUNT(*) AS total_apps,
                              SUM(CASE WHEN stack = 'Full' THEN 1 ELSE 0 END) AS full_stack,
                              SUM(CASE WHEN stack = 'Frontend' THEN 1 ELSE 0 END) AS frontend_stack,
                              SUM(CASE WHEN stack = 'Backend' THEN 1 ELSE 0 END) AS backend_stack,
                              SUM(CASE WHEN progress = 'No Response' THEN 1 ELSE 0 END) AS no_response,
                              SUM(CASE WHEN progress != 'No Response' THEN 1 ELSE 0 END) AS any_response,
                              SUM(CASE WHEN app_form = 'Traditional' AND progress = 'No Response' THEN 1 ELSE 0 END) AS traditional_no_response,
                              SUM(CASE WHEN app_form = 'Traditional' AND progress != 'No Response' THEN 1 ELSE 0 END) AS traditional_any_response,
                              SUM(CASE WHEN app_form = 'Quick' AND progress = 'No Response' THEN 1 ELSE 0 END) AS quick_no_response,
                              SUM(CASE WHEN app_form = 'Quick' AND progress != 'No Response' THEN 1 ELSE 0 END) AS quick_any_response,
                              SUM(CASE WHEN app_form = 'Codesmith' AND progress = 'No Response' THEN 1 ELSE 0 END) AS codesmith_no_response,
                              SUM(CASE WHEN app_form = 'Codesmith' AND progress != 'No Response' THEN 1 ELSE 0 END) AS codesmith_any_response
                      FROM ${tableName} 
                      WHERE user_id = ${userID}`;

      //obtain actually calculations from the saved date in query
      const result: QueryResult = await db.query(query);
      const row = result.rows[0];
      const totalApps = Number(row.total_apps);
      const totalTraditional = Number(
        row.traditional_no_response + row.traditional_any_response
      );
      const totalQuick = Number(row.quick_no_response + row.quick_any_response);
      const totalCodesmith = Number(
        row.codesmith_no_response + row.codesmith_any_response
      );
      const fullStackPercentage = (
        (Number(row.full_stack) / totalApps) *
        100
      ).toFixed(2);
      const frontendStackPercentage = (
        (Number(row.frontend_stack) / totalApps) *
        100
      ).toFixed(2);
      const backendStackPercentage = (
        (Number(row.backend_stack) / totalApps) *
        100
      ).toFixed(2);
      const noResponseRate = (
        (Number(row.no_response) / totalApps) *
        100
      ).toFixed(2);
      const anyResponseRate = (
        (Number(row.any_response) / totalApps) *
        100
      ).toFixed(2);
      const traditionalNoResponseRate = (
        (Number(row.traditional_no_response) / totalTraditional) *
        100
      ).toFixed(2);
      const traditionalAnyResponseRate = (
        (Number(row.traditional_any_response) / totalTraditional) *
        100
      ).toFixed(2);
      const quickNoResponseRate = (
        (Number(row.quick_no_response) / totalQuick) *
        100
      ).toFixed(2);
      const quickAnyResponseRate = (
        (Number(row.quick_any_response) / totalQuick) *
        100
      ).toFixed(2);
      const codesmithNoResponseRate = (
        (Number(row.codesmith_no_response) / totalCodesmith) *
        100
      ).toFixed(2);
      const codesmithAnyResponseRate = (
        (Number(row.codesmith_any_response) / totalCodesmith) *
        100
      ).toFixed(2);

      res.locals = {
        tableData: {
          'Total Apps': totalApps.toString(),
          'Apps by Stack Percentage': {
            full: `${fullStackPercentage}%`,
            frontend: `${frontendStackPercentage}%`,
            backend: `${backendStackPercentage}%`,
          },
          'Response Rate': {
            noResponse: `${noResponseRate}%`,
            anyResponse: `${anyResponseRate}%`,
          },
          'Response Rate by App Style': {
            traditional: {
              noResponse: `${traditionalNoResponseRate}%`,
              anyResponse: `${traditionalAnyResponseRate}%`,
            },
            quick: {
              noResponse: `${quickNoResponseRate}%`,
              anyResponse: `${quickAnyResponseRate}%`,
            },
            codesmith: {
              noResponse: `${codesmithNoResponseRate}%`,
              anyResponse: `${codesmithAnyResponseRate}%`,
            },
          },
        },
      };
      return next();
    } catch (err) {
      return next({
        log: `Error in getMetrics controller: ${err}`,
        status: 500,
        message: 'Internal server error',
      });
    }
  },
};
export default metricController;
