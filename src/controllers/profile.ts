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
    const condition = body.isUpdateTask
      ? { ...body, $set: { 'tasks.3.isCompleted': body.isUpdateTask } }
      : body;
    const updatedUser = await authHelper.updateById(userId, condition);

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
    const { body: { lastPassword, newPassword, isUpdateTask }, user } = req;
    const isMatchedPasswords = await bcrypt.compare(lastPassword, user.password);

    if (!isMatchedPasswords) {
      throw new ErrorModel(httpStatus.BAD_REQUEST, ErrorMessageEnum.IncorrectPassword);
    }

    const condition = isUpdateTask
      ? { password: await encrypt(newPassword), $set: { 'tasks.3.isCompleted': isUpdateTask } }
      : { password: await encrypt(newPassword) };
    const updatedUser = await authHelper.updateById(user._id, condition);

    res.json(new Response({ updatedUser }));
  } catch (error) {
    next(error);
  }
};
