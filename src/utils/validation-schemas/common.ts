import * as Joi from 'joi';

export const retrievingViaUseIdSchema = {
  params: {
    userId: Joi.string().required()
  }
};
