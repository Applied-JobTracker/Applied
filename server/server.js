const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const appsRouter = require('./routes/appsRouter');

const PORT = process.env.PORT || 3000;
/* UNCOMMENT THE FOLLOWING AFTER YOU INPUT A URI */

// const mongoURI = '';
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: 'myDatabase',
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/assets', express.static(path.resolve(__dirname, '../src/assets')));

app.use('/apps', appsRouter);

// 404 error handler
app.use('*', (req, res) => {
  res.status(404).send("This page can't be found");
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An unknown error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
