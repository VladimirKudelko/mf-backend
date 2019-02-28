import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import mainRouter from '../routes';
import logger from './logger';
import notFoundHandler from './not-found';
import errorHandler from './error';

export default app => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger);
  app.use(mainRouter);
  app.all('*', notFoundHandler);
  app.use(errorHandler);
};
