import { Controller } from '../types';
import { categoryHelper } from '../db/helpers';

export const createCategory: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const category = await categoryHelper.create({ ...req.body, userId });

    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const getExpensesCategories: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const expensesCategories = await categoryHelper.getExpenses(userId);
    const defaultCategories = await categoryHelper.getDefaultExpenses();

    res.json({ categories: [ ...expensesCategories, ...defaultCategories ] });
  } catch (error) {
    next(error);
  }
};

export const getIncomesCategories: Controller = async(req, res, next) => {
  try {
    const { userId } = req.params;
    const incomesCategories = await categoryHelper.getIncomes(userId);
    const defaultCategories = await categoryHelper.getDefaultIncomes();

    res.json({ categories: [ ...incomesCategories, ...defaultCategories ] });
  } catch (error) {
    next(error);
  }
};
