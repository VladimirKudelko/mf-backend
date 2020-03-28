import { Controller } from '../types';
import { UserDocument, Response, BudgetDocument } from '../models';
import { budgetHelper, authHelper } from '../db/helpers';

export const addBudgets: Controller = async(req, res) => {
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

export const updateBudgets: Controller = async(req, res) => {
  const { body: { budgets } } = req;
  const updatedBudgets = [];

  for (const budget of budgets) {
    const updatedBudget = await budgetHelper.updatedById(budget._id, budget);

    updatedBudgets.push(updatedBudget);
  }

  res.json(new Response({ budgets: updatedBudgets }));
};
