import * as Joi from 'joi';

import { RoleEnum } from '../../enums';

export const authenticationUserSchema = {
  body: {
    email: Joi.string().required(),
    password: Joi.string().required()
  }
};

export const creationUserSchema = {
  body: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(RoleEnum.User, RoleEnum.Admin),
    question1: Joi.object({
      question: Joi.string().default('admin 1'),
      answer: Joi.string().default('admin 1')
    }).default({ question: 'admin 1', answer: 'admin 1' }),
    question2: Joi.object({
      question: Joi.string().default('admin 2'),
      answer: Joi.string().default('admin 2')
    }).default({ question: 'admin 2', answer: 'admin 2' })
  }
};

export const changeUserSettingsSchema = {
  params: {
    userId: Joi.string().required()
  },
  body: {
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    isUpdateTask: Joi.boolean()
  }
};

export const changePasswordSchema = {
  params: {
    userId: Joi.string().required()
  },
  body: {
    lastPassword: Joi.string(),
    newPassword: Joi.string(),
    isUpdateTask: Joi.boolean()
  }
};

export const verifyEmailSchema = {
  body: {
    email: Joi.string().email().required(),
    hash: Joi.string().length(32).error(new Error('Hash must consist of 32 characters!')),
  }
};
