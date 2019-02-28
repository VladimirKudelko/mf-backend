import * as httpStatus from 'http-status-codes';
import * as _ from 'lodash';

import { ErrorController } from '../types/error-controller';

const errorHandler: ErrorController = (error, req, res, next) => {
  console.log(error.stack || error.message || error);

  const { statusCode, message, additions } = error;

  if (statusCode && message) {
    res.status(statusCode).json({ message, ...additions });
  } else if (error.errors) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: _.values(error.errors)[0].message
    });
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR)
    });
  }
};

export default errorHandler;
