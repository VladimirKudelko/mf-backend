import * as Joi from 'joi';

export const authenticationUserSchema = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};
