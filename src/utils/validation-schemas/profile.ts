import * as Joi from 'joi';
import { BudgetStatusEnum } from '../../enums';

export const addNewBudgetsSchema = {
  body: {
    budgets: Joi.array().items({
      from: Joi.string().required(),
      to: Joi.string().required(),
      limit: Joi.number().required(),
      status: Joi.string().valid(BudgetStatusEnum.Active, BudgetStatusEnum.Pending, BudgetStatusEnum.Closed).required(),
      currency: Joi.string().required()
    }),
  }
};
