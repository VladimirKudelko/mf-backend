import { UserQuestions } from '../schemas';
import { UserQuestionsDocument } from '../../models';

const create = (data: UserQuestionsDocument | any) => UserQuestions.create(data);

const getByEmail = (userEmail: string) => UserQuestions.findOne({ userEmail });

const getByUserId = (userId: string) => UserQuestions.findOne({ userId });

export default {
  create,
  getByEmail,
  getByUserId
};
