import express from 'express';
import userController from '../controllers/userController.ts';

const userRouter = express.Router();

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
