import * as _ from 'lodash';

import { authHelper } from '../db/helpers';
import { Controller } from '../types';
import { Response, UserDocument } from '../models';

export const getAllUsers: Controller = async(req, res, next) => {
  const { _id } = req.user as UserDocument;
  const users = await authHelper.getAllWithoutCurrentUser(_id).select({ password: 0, tasks: 0 });

  res.json(new Response({ users }));
};

export const deleteAccount: Controller = async(req, res, next) => {
  const { params: { id } } = req;
  const deletedAccount = await authHelper.deleteById(id);

  res.json({
    isDeleted: !_.isEmpty(deletedAccount)
  });
};
