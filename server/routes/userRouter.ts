import express, { Router } from 'express';
import userController from '../controllers/userController';

const userRouter: Router = express.Router();

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

export default userRouter;
