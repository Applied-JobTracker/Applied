const bcrypt = require('bcryptjs');
const db = require('../models/myModel');
const userController = {};

userController.createAccount = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    //create middleware function to check if user exists and use it both in login and here when creating account to ensure username isn't taken
    if (!username || !password)
      return next({
        log: `Username or password not passed in to userController.createAccount: ${err}`,
        status: 400,
        message: 'Please fill out both username and password fields',
      });
    const hashed = await bcrypt.hash(password, 10);
    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2)';
    await db.query(queryString, [username, hashed]);
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createAccount: ${err}`,
      status: 500,
      message: { err: 'unable to create account' },
    });
  }
};
module.exports = userController;
