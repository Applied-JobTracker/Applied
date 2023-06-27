const express = require('express');
const appsRouter = express.Router();
const appsController = require('../controllers/appsController');

appsRouter.get('/', appsController.getApps, (req, res) => {
  res.sendStatus(200);
});

appsRouter.post('/', appsController.addApp, (req, res) => {
  res.sendStatus(201);
});

appsRouter.put('/:application_id', appsController.editApp, (req, res) => {
  res.sendStatus(204);
});

appsRouter.delete('/:application_id', appsController.deleteApp, (req, res) => {
  res.sendStatus(204);
});

module.exports = appsRouter;
