const express = require('express');
const appsRouter = express.Router();
const appsController = require('../controllers/appsController');

// appsRouter.use('/', myController.test, (req, res) => {
//   console.log('in apps router');
//   res.status(200).send('Hello world!');
// });

appsRouter.get('/', appsController.getApps, (req, res) => {
  res.status(200).send('Hello GET world!');
});

appsRouter.post('/', appsController.addApp, (req, res) => {
  res.status(201).send('Hello POST world!');
});

appsRouter.put('/:appId', appsController.editApp, (req, res) => {
  res.status(204).send('Hello PUT world!');
});

appsRouter.delete('/:appId', appsController.deleteApp, (req, res) => {
  res.status(204).send('Hello PUT world!');
});

module.exports = appsRouter;
