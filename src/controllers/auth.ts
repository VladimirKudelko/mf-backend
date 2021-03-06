
import * as passport from 'passport';
import * as _ from 'lodash';
import * as crypto from 'crypto';
import * as httpStatus from 'http-status-codes';

import { authHelper, walletHelper, userQuestionsHelper } from '../db/helpers';
import { Controller } from '../types';
import { Response, ErrorModel } from '../models';
import { sendMail, getConfirmationEmailTemplate } from '../utils/mail';
import { ErrorMessageEnum } from '../enums';

export const registerUser: Controller = async(req, res, next) => {
  const { body } = req;
  const hash = crypto.createHash('md5').update('some_string').digest('hex');
  const createdUser = await authHelper.create({ hash, ...body });

  await walletHelper.create({ userId: createdUser._id });
  await userQuestionsHelper.create({
    userId: createdUser._id,
    question1: body.question1,
    question2: body.question2,
    userEmail: body.email
  });

  sendMail(
    'Email Verification',
    createdUser.email,
    getConfirmationEmailTemplate(createdUser.firstName, createdUser.email, hash)
  );

  createdUser.password = undefined;
  createdUser.hash = undefined;

  res.json(new Response({
    token: createdUser.generateJWT(),
    user: createdUser.toJSON(),
  }));
};

export const loginUser: Controller = async(req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (!_.isEmpty(err) || _.isEmpty(user)) {
        throw err;
      }

      user.password = undefined;
      user.hash = undefined;

      res.json(new Response({
        token: user.generateJWT(),
        user: user.toJSON(),
      }));
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export const verifyEmail: Controller = async(req, res, next) => {
  const { body: { email, hash } } = req;
  const user = await authHelper.getOneByQuery({ email, hash });

  if (!user) {
    throw new ErrorModel(
      httpStatus.FORBIDDEN,
      ErrorMessageEnum.IncorrectData,
      { isVerified: false }
    );
  }

  await authHelper.updateById(user._id, { isEmailVerified: true });

  res.json({ isVerified: true });
};
