import bcrypt from "bcryptjs";
import db from "../models/myModel";
import { Request, Response, NextFunction } from "express";

interface UserRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}
interface UserController {
  checkUser: (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  createAccount: (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  verifyPassword: (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}
const userController: UserController = {
  //upon login or create account request, query database for account under username passed in
  //save result in res.locals, even if user does not exist
  checkUser: async (req: UserRequest, res: Response, next: NextFunction) => {
    console.log("checkUser hit");

    const { username, password } = req.body;
    console.log({ password });
    if (!username || !password)
      return next({
        log: `Username or password not passed in to userController.checkUser`,
        status: 401,
        message: "Please input a username and a password",
      });

    try {
      const queryString = "SELECT user_id FROM users WHERE username=($1)";
      const result = await db.query(queryString, [username]);
      res.locals.userExists = result.rows[0];
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.checkUser: ${err}`,
        status: 500,
        message: "Error checking username",
      });
    }
  },
  //check if username already exists
  //if not, continue with account creation and send user_id to frontend else send error saying username already exists
  createAccount: async (req: UserRequest, res: Response, next: NextFunction) => {
    console.log("createAccount hit");
    if (res.locals.userExists)
      return next({
        log: "username passed in to createAccount already exists",
        status: 406,
        message: "username already exists",
      });
    const { username, password } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      const queryString =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id";
      const result = await db.query(queryString, [username, hashed]);
      res.locals.id = result.rows[0].user_id;
      return next();
    } catch (err) {
      return next({
        log: `Error in userController.createAccount: ${err}`,
        status: 500,
        message: "unable to create account",
      });
    }
  },

  //if checkUser does not find an account with passed in username, throw error
  //otherwise query database for user_id and password for passed in username
  //compare the hashed passwords to verify
  //if comparison is true, send user_id to front end else return error
  verifyPassword: async (req: UserRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!res.locals.userExists)
      return next({
        log: `No account found with ${username}`,
        status: 401,
        message: "Incorrect username or password",
      });
    try {
      const queryString =
        "SELECT user_id, password FROM users WHERE username=($1)";
      const result = await db.query(queryString, [username]);
      const comparison = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (comparison) {
        res.locals.id = result.rows[0].user_id;
        return next();
      } else {
        return next({
          log: `incorrect username and password combination`,
          status: 401,
          message: "incorrect username or password",
        });
      }
    } catch (err) {
      return next({
        log: `Error in verifyPassword: ${err}`,
        status: 500,
        message: "Error verifying account",
      });
    }
  },
};

export default userController;
