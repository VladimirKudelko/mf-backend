import * as httpStatus from 'http-status-codes';

import { Controller } from '../types/controller';

const notFoundHandler: Controller = (req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    message: httpStatus.getStatusText(httpStatus.NOT_FOUND)
  });
};

export default notFoundHandler;
