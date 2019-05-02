import { Controller } from '../types';
import { transactionHelper, walletHelper, authHelper } from '../db/helpers';
import { CategoryTypeEnum } from '../enums';
import { Response } from '../models';

export const createTransaction: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, body } = req;
    const transaction = await transactionHelper.create({ userId, ...body });
    const wallet = await walletHelper.getById(body.walletId);
    const balance = body.type === CategoryTypeEnum.Incomes
      ? wallet.balance + body.amountMoney
      : wallet.balance - body.amountMoney;

    const updatedWallet = await walletHelper.update(
      body.walletId,
      { balance, lastUpdate: Date.now() }
    ).select({ balance: 1, _id: 0 });

    if (body.isUpdateTask) {
      await authHelper.updateById(req.user._id, { $set: { 'tasks.2.isCompleted': body.isUpdateTask } });
    }

    res.json(new Response({ transaction, balance: updatedWallet.balance }));
  } catch (error) {
    next(error);
  }
};

export const getUserTransactionsByInterval: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, query: { period } } = req;
    const transactions = await transactionHelper.getByInterval(userId, period);

    res.json(new Response({ transactions }));
  } catch (error) {
    next(error);
  }
};

export const getUserTransactionsByPeriod: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, query: { startDate, endDate } } = req;
    const transactions = await transactionHelper.getByPeriod(userId, startDate, endDate);

    res.json(new Response({ transactions }));
  } catch (error) {
    next(error);
  }
};
