import { Controller } from '../types';
import { transactionHelper, walletHelper, authHelper } from '../db/helpers';
import { CategoryTypeEnum } from '../enums';
import { Response, UserDocument } from '../models';
import { pushNewWallet } from '../socket/wallet';

export const createTransaction: Controller = async(req, res, next) => {
  const { params: { userId }, body } = req;

  const transaction = await transactionHelper.create({ userId, ...body });
  const transactionBalance = body.type === CategoryTypeEnum.Incomes ? body.amountMoney : -body.amountMoney;
  const updatedWallet = await walletHelper.update(
    body.walletId,
    { $inc: { balance: transactionBalance }, lastUpdate: Date.now() }
  );

  await pushNewWallet(updatedWallet);

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
  let totalExpenses = 0;
  let totalIncomes = 0;

  transactions.forEach(transaction => {
    switch (transaction.type) {
      case CategoryTypeEnum.Expenses:
        totalExpenses += transaction.amountMoney;
        break;
      case CategoryTypeEnum.Incomes:
        totalIncomes += transaction.amountMoney;
        break;
    }
  });

  res.json(new Response({ transactions, totalExpenses, totalIncomes }));
};

export const getUserTransactionsByPeriod: Controller = async(req, res, next) => {
  const { params: { userId }, query: { startDate, endDate, categoryType } } = req;
  const transactions = await transactionHelper.getByPeriod(userId, startDate, endDate, { type: categoryType });

  res.json(new Response({ transactions }));
};

export const getUserExpenses: Controller = async(req, res, next) => {
  const { query: { from, to } } = req;
  const user = req.user as UserDocument;

  const transactions = await transactionHelper.getByPeriod(user._id, from, to, { type: CategoryTypeEnum.Expenses });
  const used = transactions.reduce((accumulator, currentValue) => accumulator + currentValue.amountMoney, 0);

  res.json(new Response({ from, to, transactions, used }));
};

export const getNewestUserTransactions: Controller = async(req, res, next) => {
  const { params: { userId }, query: { limit } } = req;
  const transactions = await transactionHelper.getNewest(userId, +limit);

  res.json(new Response({ transactions }));
};

export const deleteTransaction: Controller = async(req, res) => {
  const { params: { id } } = req;
  const deletedTransaction = await transactionHelper.deleteById(id);

  res.json(new Response({ deletedTransaction }));
};

export const updateTransaction: Controller = async(req, res) => {
  const { params: { id }, body } = req;
  const updatedTransaction = await transactionHelper.updateById(id, body);

  res.json(new Response({ updatedTransaction }));
};
