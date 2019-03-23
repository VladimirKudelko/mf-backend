import { Controller } from '../types';
import { walletHelper } from '../db/helpers';

export const getUserCash: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const wallet = await walletHelper.getByUseId(userId);

    res.json(wallet);
  } catch (error) {
    next(error);
  }
};
