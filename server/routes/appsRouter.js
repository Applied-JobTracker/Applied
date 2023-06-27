const express = require('express');
const appsRouter = express.Router();
const appsController = require('../controllers/appsController');

appsRouter.get('/:user_id', appsController.getApps, (req, res) => {
  res.status(200).json(res.locals.tableData);
});

appsRouter.post('/', appsController.addApp, (req, res) => {
  res.sendStatus(201);
});

appsRouter.put('/:application_id', appsController.editApp, (req, res) => {
  res.status(200).json(res.locals.updatedTableData);
});

appsRouter.delete('/:application_id', appsController.deleteApp, (req, res) => {
  res.sendStatus(204);
});

module.exports = appsRouter;
