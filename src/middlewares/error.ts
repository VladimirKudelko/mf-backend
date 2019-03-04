import * as httpStatus from 'http-status-codes';
import * as _ from 'lodash';

import { ErrorController } from '../types/error-controller';
import { MongoError } from 'mongodb';

const errorHandler: ErrorController = (error, req, res, next) => {
  console.error(error.stack || error.message || error);

  const { statusCode, message } = error;

  if (statusCode && message) {
    res.status(statusCode).json(error);
  } else if (error.errors) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: _.values(error.errors)[0].message,
      isSuccessfully: false
    });
  } else if (error instanceof MongoError) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.errmsg,
      isSuccessfully: false
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
      isSuccessfully: false
    });
  }
};

export default errorHandler;
