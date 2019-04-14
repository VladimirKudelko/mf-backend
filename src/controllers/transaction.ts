import { Controller } from '../types';
import { transactionHelper, walletHelper, authHelper } from '../db/helpers';
import { CategoryTypeEnum } from '../enums';
import { Response } from '../models';

export const createTransaction: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, body } = req;
    const transaction = await transactionHelper.create({ userId, ...body });
    const wallet = await walletHelper.getById(body.walletId);
    const balance = body.type === CategoryTypeEnum.Expenses
      ? wallet.balance + body.amountMoney
      : wallet.balance - body.amountMoney;

    await walletHelper.update(body.walletId, { balance, lastUpdate: Date.now() });

    if (body.isUpdateTask) {
      await authHelper.updateById(req.user._id, { $set: { 'tasks.2.isCompleted': body.isUpdateTask } });
    }

    res.json(new Response({ transaction }));
  } catch (error) {
    next(error);
  }
};

export const getUserTransactions: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const { period } = req.query;
    const transactions = await transactionHelper.getByInterval(userId, period);

    res.json(new Response({ transactions }));
  } catch (error) {
    next(error);
  }
};
