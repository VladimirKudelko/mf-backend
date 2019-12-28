
import * as passport from 'passport';
import * as _ from 'lodash';
import * as xml2js from 'xml2js';
import * as httpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { authHelper, walletHelper } from '../db/helpers';
import { Controller } from '../types';
import { Response, ErrorModel } from '../models';
import { ErrorMessageEnum } from '../enums';
import { sendMail, someContent } from '../utils/mail';

export const registerUser: Controller = async(req, res, next) => {
  try {
    const { body } = req;
    const hash = crypto.createHash('md5').update('some_string').digest('hex');
    const createdUser = await authHelper.create({ hash, ...body });

    await walletHelper.create({ userId: createdUser._id });
    sendMail('Email Verification', createdUser.email, someContent(createdUser.firstName, createdUser.email, hash));
    createdUser.password = undefined;

    res.json(new Response({
      token: createdUser.generateJWT(),
      user: createdUser.toJSON(),
    }));
  } catch (error) {
    next(error);
  }
};

export const loginUser: Controller = async(req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (!_.isEmpty(err) || _.isEmpty(user)) {
        throw err;
      }

      user.password = undefined;

      return res.json(new Response({
        token: user.generateJWT(),
        user: user.toJSON(),
      }));
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};
