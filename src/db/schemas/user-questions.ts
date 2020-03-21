import mongoose from '../../context';
import { UserQuestionsDocument } from '../../models';

const userQuestionsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  question1: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  question2: {
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  modifiedDate: {
    type: mongoose.Schema.Types.Date,
    default: new Date().toISOString()
  }
}, { versionKey: false });

export default mongoose.model<UserQuestionsDocument>('user-questions', userQuestionsSchema);
