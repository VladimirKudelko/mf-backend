import * as httpStatus from 'http-status-codes';
import * as _ from 'lodash';

import { ErrorController } from '../types/error-controller';
import { MongoError } from 'mongodb';
import { ErrorModel } from '../models';

const errorHandler: ErrorController = (error, req, res, next) => {
  console.error(error.stack || error.message || error);

  const { statusCode, message } = error;

  if (statusCode && message) {
    res.status(statusCode).json(new ErrorModel(statusCode, message));
  } else if (error.errors) {
    res.status(httpStatus.BAD_REQUEST).json(new ErrorModel(
      httpStatus.BAD_REQUEST,
      _.values(error.errors)[0].message
    ));
  } else if (error instanceof MongoError) {
    res.status(httpStatus.BAD_REQUEST).json(new ErrorModel(
      httpStatus.BAD_REQUEST,
      error.errmsg
    ));
  } else if (error.isBoom) {
    res.status(httpStatus.BAD_REQUEST).json(new ErrorModel(
      httpStatus.BAD_REQUEST,
      error.message
    ));
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new ErrorModel(
      httpStatus.INTERNAL_SERVER_ERROR,
      httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
    ));
  }
};

export default errorHandler;
