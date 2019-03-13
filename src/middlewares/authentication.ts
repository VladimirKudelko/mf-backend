import * as passport from 'passport';
import * as _ from 'lodash';
import * as httpStatus from 'http-status-codes';

import { Controller } from '../types';
import { ErrorMessages } from '../enums';
import { ErrorModel } from '../models';

export const authenticate: Controller = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    try {
      if (_.isEmpty(user) || !_.isEmpty(err)) {
        throw new ErrorModel(httpStatus.UNAUTHORIZED, ErrorMessages.Unauthorized);
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};
