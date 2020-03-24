import * as moment from 'moment';

import mongoose from '../../context';
import { BudgetDocument } from '../../models';
import { BudgetStatusEnum } from '../../enums';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [BudgetStatusEnum.Active, BudgetStatusEnum.Closed, BudgetStatusEnum.Pending]
  },
  from: {
    type: mongoose.Schema.Types.Date,
    default: moment().format('YYYY-MM-DD')
  },
  to: {
    type: mongoose.Schema.Types.Date,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  modifiedDate: {
    type: mongoose.Schema.Types.Date,
    default: new Date().toISOString()
  }
}, { versionKey: false });

export default mongoose.model<BudgetDocument>('budget', budgetSchema);
