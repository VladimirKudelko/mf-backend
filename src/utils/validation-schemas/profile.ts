import * as Joi from 'joi';
import { BudgetTypeEnum } from '../../enums';

export const addNewBudgetSchema = {
  body: {
    budgetType: Joi.number().valid(BudgetTypeEnum.AllExpenses, BudgetTypeEnum.SpecificCategory).required(),
    to: Joi.string().required(),
    limit: Joi.number().required(),
    currency: Joi.string().required()
  }
};
