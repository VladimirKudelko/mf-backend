import * as Joi from 'joi';

import { CategoryTypeEnum } from '../../enums';

export const creationCategorySchema = {
  params: {
    userId: Joi.string().required()
  },
  body: {
    title: Joi.string().required(),
    type: Joi.string().valid(CategoryTypeEnum.Expenses, CategoryTypeEnum.Incomes).required(),
    isDefault: Joi.boolean()
  }
};
