import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';

import errorHandler from './error';
import logger from './logger';
import mainRouter from '../routes';
import notFoundHandler from './not-found';

export default app => {
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    skipFailedRequests: true
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger);
  app.use('/api', mainRouter);
  app.all('*', notFoundHandler);
  app.use(errorHandler);
};
