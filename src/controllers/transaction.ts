import { Controller } from '../types';
import { transactionHelper, walletHelper, authHelper } from '../db/helpers';
import { CategoryTypeEnum } from '../enums';
import { Response, UserDocument } from '../models';
import { pushNewBalance } from '../socket';

export const createTransaction: Controller = async(req, res, next) => {
  const { params: { userId }, body } = req;
  const transaction = await transactionHelper.create({ userId, ...body });
  const wallet = await walletHelper.getById(body.walletId);
  const balance = body.type === CategoryTypeEnum.Incomes
    ? wallet.balance + body.amountMoney
    : wallet.balance - body.amountMoney;

  pushNewBalance(balance);

  const updatedWallet = await walletHelper.update(
    body.walletId,
    { balance, lastUpdate: Date.now() }
  ).select({ balance: 1, _id: 0 });

  if (body.isUpdateTask) {
    const { _id } = req.user as UserDocument;

    await authHelper.updateById(_id, { $set: { 'tasks.2.isCompleted': body.isUpdateTask } });
  }

  res.json(new Response({
    transaction,
    balance: updatedWallet.balance
  }));
};

export const getUserTransactionsByInterval: Controller = async(req, res, next) => {
  const { params: { userId }, query: { period, limit } } = req;
  const transactions = await transactionHelper.getByInterval(userId, period).limit(+limit || 1000);

  res.json(new Response({ transactions }));
};

export const getUserTransactionsByPeriod: Controller = async(req, res, next) => {
  const { params: { userId }, query: { startDate, endDate } } = req;
  const transactions = await transactionHelper.getByPeriod(userId, startDate, endDate);

  res.json(new Response({ transactions }));
};

export const getUserExpenses: Controller = async(req, res, next) => {
  const { query: { from, to } } = req;
  const user = req.user as UserDocument;
  const transactions = await transactionHelper.getByPeriod(user._id, from, to, { type: CategoryTypeEnum.Expenses });
  const left = transactions.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amountMoney,
    0
  );

  res.json(new Response({
    from,
    to,
    transactions,
    left
  }));
};
