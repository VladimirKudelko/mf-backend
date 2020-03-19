import * as Joi from 'joi';

import { CategoryTypeEnum } from '../../enums';

export const creationTransactionSchema = {
  params: {
    userId: Joi.string().required()
  },
  body: {
    walletId: Joi.string().required(),
    categoryId: Joi.string().required(),
    type: Joi.string().valid(CategoryTypeEnum.Expenses, CategoryTypeEnum.Incomes).required(),
    amountMoney: Joi.number().required(),
    note: Joi.string(),
    currency: Joi.string().required(),
    createdDate: Joi.date(),
    isUpdateTask: Joi.boolean()
  }
};

export const retrieveTransactionsByPeriodSchema = {
  params: {
    userId: Joi.string().required()
  },
  query: {
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    categoryType: Joi.string().required()
  }
};

export const retrieveUserExpensesSchema = {
  query: {
    from: Joi.string().required(),
    to: Joi.string().required()
  }
};
