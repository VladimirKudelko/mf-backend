import { Controller } from '../types';
import { categoryHelper, authHelper } from '../db/helpers';
import { Response } from '../models';

export const createCategory: Controller = async(req, res, next) => {
  try {
    const { params: { userId }, body } = req;
    const category = await categoryHelper.create({ ...body, userId });

    if (body.isUpdateTask) {
      await authHelper.updateById(req.user._id, { $set: { 'tasks.1.isCompleted': body.isUpdateTask } });
    }

    res.json(new Response({ category }));
  } catch (error) {
    next(error);
  }
};

export const getExpensesCategories: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const expensesCategories = await categoryHelper.getExpenses(userId);
    const defaultCategories = await categoryHelper.getDefaultExpenses();

    res.json(new Response({
      categories: [ ...expensesCategories, ...defaultCategories ]
    }));
  } catch (error) {
    next(error);
  }
};

export const getIncomesCategories: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const incomesCategories = await categoryHelper.getIncomes(userId);
    const defaultCategories = await categoryHelper.getDefaultIncomes();

    res.json(new Response({
      categories: [ ...incomesCategories, ...defaultCategories ]
    }));
  } catch (error) {
    next(error);
  }
};
