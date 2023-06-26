const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const myRouter = require('./routes/myRoute');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/assets', express.static(path.resolve(__dirname, '../src/assets')));

app.use('/server', myRouter);

// 404 error handler
app.use((req, res) => {
  res.status(404).send("This is not the page you're looking for");
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

// Starting server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
