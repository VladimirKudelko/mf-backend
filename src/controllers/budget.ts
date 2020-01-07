import { Controller } from '../types';
import { UserDocument, Response } from '../models';
import { budgetHelper, authHelper } from '../db/helpers';

export const addBudget: Controller = async(req, res, next) => {
  const { body } = req;
  const user = req.user as UserDocument;
  const budget = await budgetHelper.create({ ...body, userId: user._id });

  await authHelper.updateById(user._id, { budget: { allExpenses: budget._id } });

  res.json(new Response({ budget }));
};
