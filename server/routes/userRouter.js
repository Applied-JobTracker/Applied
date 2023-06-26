const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/create', userController.createAccount, (req, res) => {
  return res.sendStatus(200);
});

module.exports = userRouter;
