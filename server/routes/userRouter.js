const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post(
  '/create',
  userController.checkUser,
  userController.createAccount,
  (req, res) => {
    return res.status(200).json({ user_id: res.locals.id });
  }
);

userRouter.post(
  '/login',
  userController.checkUser,
  userController.verifyPassword,
  (req, res) => {
    return res.status(200).json({ user_id: res.locals.id });
  }
);

module.exports = userRouter;
