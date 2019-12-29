import { Controller } from '../types';
import { categoryHelper, authHelper } from '../db/helpers';
import { Response, UserDocument } from '../models';

export const createCategory: Controller = async(req, res, next) => {
  const { params: { userId }, body } = req;
  const category = await categoryHelper.create({ ...body, userId });

  if (body.isUpdateTask) {
    const { _id } = req.user as UserDocument;

    await authHelper.updateById(_id, { $set: { 'tasks.1.isCompleted': body.isUpdateTask } });
  }

  res.json(new Response({ category }));
};

export const getExpensesCategories: Controller = async(req, res, next) => {
  const { userId } = req.params;
  const expensesCategories = await categoryHelper.getExpenses(userId);
  const defaultCategories = await categoryHelper.getDefaultExpenses();

  res.json(new Response({
    categories: [ ...expensesCategories, ...defaultCategories ]
  }));
};

export const getIncomesCategories: Controller = async(req, res, next) => {
  const { userId } = req.params;
  const incomesCategories = await categoryHelper.getIncomes(userId);
  const defaultCategories = await categoryHelper.getDefaultIncomes();

  res.json(new Response({
    categories: [ ...incomesCategories, ...defaultCategories ]
  }));
};
