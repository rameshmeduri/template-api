import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import router from './router';
import responses from './constants/responses';


// Create Express app
const app = express();

// Define middlewares
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
// Attach express error to logger
app.use(
  morgan('tiny', {
    stream: {
      write: message => console.info(message.trim()),
    },
  }),
);

/*
  All routes
*/
app.use('/', router);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: responses.NOT_FOUND.status,
    message: responses.NOT_FOUND.message,
  });
});

// Error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const error = {
    status: err.status || responses.SERVER_ERROR.status,
    message: err.message || responses.SERVER_ERROR.message,
  };
  res.status(err.status).json(error);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});