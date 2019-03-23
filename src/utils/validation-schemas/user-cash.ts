import * as Joi from 'joi';

export const retrievingUserCashSchema = {
  params: {
    userId: Joi.string().required()
  }
};
