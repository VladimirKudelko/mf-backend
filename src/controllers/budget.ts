import { Controller } from '../types';
import { UserDocument, Response, BudgetDocument } from '../models';
import { budgetHelper, authHelper } from '../db/helpers';

export const addBudgets: Controller = async(req, res, next) => {
  const { body: { budgets } } = req;
  const user = req.user as UserDocument;
  const createdBudgets: BudgetDocument[] = [];

  for (const budgetData of budgets) {
    const budget = await budgetHelper.create({ ...budgetData, userId: user._id });

    createdBudgets.push(budget);
  }

  await authHelper.updateById(
    user._id,
    {
      $push: {
        budgets: createdBudgets.map(budget => budget._id)
      }
    }
  );

  res.json(new Response({ budgets: createdBudgets }));
};
