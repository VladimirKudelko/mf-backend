import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';
import * as httpStatus from 'http-status-codes';

import { Controller } from '../types';
import { authHelper } from '../db/helpers';
import { Response, ErrorModel } from '../models';
import { ErrorMessageEnum } from '../enums';
import { encrypt } from '../utils';

export const getUserProfile: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await authHelper.getById(userId);

    res.json(new Response({ user }));
  } catch (error) {
    next(error);
  }
};

export const updateSettings: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, body } = req;
    const updatedUser = await authHelper.updateById(userId, body);

    if (!_.isEmpty(updatedUser)) {
      updatedUser.password = undefined;
    }

    res.json(new Response({
      updatedUser,
      isUpdated: !_.isEmpty(updatedUser)
    }));
  } catch (error) {
    next(error);
  }
};

export const changePassword: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, body: { lastPassword, newPassword }, user } = req;
    const isMatchedPasswords = await bcrypt.compare(lastPassword, user.password);

    if (!isMatchedPasswords) {
      throw new ErrorModel(httpStatus.BAD_REQUEST, ErrorMessageEnum.IncorrectPassword);
    }

    const updatedUser = await authHelper.updateById(
      user._id,
      { password: await encrypt(newPassword) }
    );

    res.json(new Response({ updatedUser }));
  } catch (error) {
    next(error);
  }
};
