import express, { Router } from 'express';
import metricController from '../controllers/metricController';

const metricRouter: Router = express.Router();

metricRouter.get('/stats/:user_id', metricController.getMetrics, (req, res) => {
    res.status(200).json(res.locals.tableData);
  });

export default metricRouter;