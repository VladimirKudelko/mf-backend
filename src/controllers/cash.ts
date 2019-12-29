import { Controller } from '../types';
import { walletHelper } from '../db/helpers';
import { Response } from '../models';

export const getUserCash: Controller = async(req, res, next) => {
  const { userId } = req.params;
  const wallet = await walletHelper.getByUserId(userId);

  res.json(new Response({ wallet }));
};
