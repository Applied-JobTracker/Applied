import path from 'path';
import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import cookieParser from 'cookie-parser';
import appsRouter from './routes/appsRouter';
import userRouter from './routes/userRouter';

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/assets', express.static(path.resolve(__dirname, '../src/assets')));

app.use('/apps', appsRouter);

app.use('/user', userRouter);

// 404 error handler
app.use('*', (req, res) => {
  res.status(404).send("This page can't be found");
});

// Global error handler
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An unknown error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;