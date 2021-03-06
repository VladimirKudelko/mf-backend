import mongoose from '../context';

export interface UserQuestionsDocument extends mongoose.Document {
  _id: string;
  userId: string;
  userEmail: string;
  question1: {
    question: string,
    answer: string
  };
  question2: {
    question: string,
    answer: string
  };
  modifiedDate: Date;
}
