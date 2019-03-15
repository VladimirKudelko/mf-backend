import * as Joi from 'joi';

import { RoleEnum } from '../../enums';

export const creationUserSchema = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(RoleEnum.User, RoleEnum.Admin)
  }
};
