import { Controller } from '../types';
import { walletHelper } from '../db/helpers';
import { Response } from '../models';

export const getUserCash: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const wallet = await walletHelper.getByUserId(userId);

    res.json(new Response({ wallet }));
  } catch (error) {
    next(error);
  }
};
