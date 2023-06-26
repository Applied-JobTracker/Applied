const express = require('express');
const appsRouter = express.Router();
const appsController = require('../controllers/appsController');

appsRouter.get('/', appsController.getApps, (req, res) => {
  res.status(200).send('Hello GET world!');
});

appsRouter.post('/', appsController.addApp, (req, res) => {
  res.status(201).send('Hello POST world!');
});

appsRouter.put('/:application_id', appsController.editApp, (req, res) => {
  res.status(204).send('Hello PUT world!');
});

appsRouter.delete('/:application_id', appsController.deleteApp, (req, res) => {
  res.status(204).send('Hello PUT world!');
});

module.exports = appsRouter;
