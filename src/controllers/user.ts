import * as _ from 'lodash';
import * as bcrypt from 'bcrypt';

import { authHelper, userQuestionsHelper } from '../db/helpers';
import { Controller } from '../types';
import { Response, UserDocument } from '../models';

export const getAllUsers: Controller = async(req, res, next) => {
  const { _id } = req.user as UserDocument;
  const users = await authHelper.getAllWithoutCurrentUser(_id).select({ password: 0, tasks: 0 });

  res.json(new Response({ users }));
};

export const deleteAccount: Controller = async(req, res, next) => {
  const { params: { id } } = req;
  const deletedAccount = await authHelper.deleteById(id);

  res.json({
    isDeleted: !_.isEmpty(deletedAccount)
  });
};

export const getUserQuestionsByEmail: Controller = async(req, res, next) => {
  const { query: { email } } = req;
  const questions = await userQuestionsHelper.getByEmail(email);
  let response;

  if (questions && questions.question1 && questions.question2) {
    response = {
      userId: questions.userId,
      questions: {
        question1: questions.question1.question,
        question2: questions.question2.question
      }
    };
  }

  res.json(new Response(response));
};

export const verifyUserQuestions: Controller = async(req, res, next) => {
  const { body: { userId, question1, question2 } } = req;
  const userQuestions = await userQuestionsHelper.getByUserId(userId);
  const isSuccessfully = userQuestions && (
    userQuestions.question1.answer === question1 &&
    userQuestions.question2.answer === question2
  );

  res.json(new Response({ isSuccessfully }));
};

export const resetPassword: Controller = async(req, res, next) => {
  const { body: { newPassword }, params: { id } } = req;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await authHelper.updateById(id, { password: hashedPassword });

  res.json(new Response({ isSuccessfully: !!updatedUser }));
};
