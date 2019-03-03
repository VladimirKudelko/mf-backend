
import * as passport from 'passport';

import { authHelper } from '../db/helpers';
import { Controller } from '../types';
import { generateJWT } from '../utils';
import { Response } from '../models';

export const registerUser: Controller = async(req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await authHelper.create(body);

    createdUser.password = undefined;

    res.json(new Response(createdUser.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const loginUser: Controller = async(req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (err || !user) {
        throw err;
      }

      user.password = undefined;

      return res.json(new Response({
        ...user.toJSON(),
        token: generateJWT(user)
      }));
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};
