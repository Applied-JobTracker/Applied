const bcrypt = require('bcryptjs');
const db = require('../models/myModel');
const userController = {};

//upon login or create account request, query database for account under username passed in
//save result in res.locals, even if user does not exist
userController.checkUser = async (req, res, next) => {
  console.log('checkUser hit');
  const { username, password } = req.body;

  if (!username || !password)
    return next({
      log: `Username or password not passed in to userController.checkUser: ${err}`,
      status: 401,
      message: 'Please input a username and a password',
    });

  try {
    const queryString = 'SELECT user_id FROM users WHERE username=($1)';
    const result = await db.query(queryString, [username]);
    res.locals.userExists = result.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.checkUser: ${err}`,
      status: 500,
      message: 'Error checking username',
    });
  }
};

//check if username already exists
//if not, continue with account creation and send user_id to frontend else send error saying username already exists
userController.createAccount = async (req, res, next) => {
  console.log('createAccount hit');
  if (res.locals.userExists)
    return next({
      log: 'username passed in to createAccount already exists',
      status: 401,
      message: 'username already exists',
    });

  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const queryString =
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id';
    const result = await db.query(queryString, [username, hashed]);
    res.locals.id = result.rows[0].user_id;
    return next();
  } catch (err) {
    return next({
      log: `Error in userController.createAccount: ${err}`,
      status: 500,
      message: { err: 'unable to create account' },
    });
  }
};

//query database for user_id and password for passed in username
//compare the hashed passwords to verify
//if comparison is true, send user_id to front end else return error
userController.verifyPassword = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const queryString =
      'SELECT user_id, password FROM users WHERE username=($1)';
    const result = await db.query(queryString, [username]);
    const comparison = await bcrypt.compare(password, result.rows[0].password);
    if (comparison) {
      res.locals.id = result.rows[0].user_id;
      return next();
    } else {
      return next({
        log: `incorrect username and password combination`,
        status: 401,
        message: 'incorrect username or password',
      });
    }
  } catch (err) {
    return next({
      log: `Error in verifyPassword: ${err}`,
      status: 500,
      message: 'Error verifying account',
    });
  }
};

module.exports = userController;
