import * as moment from 'moment';

import mongoose from '../../context';
import { BudgetDocument } from '../../models';
import { BudgetTypeEnum } from '../../enums';

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  budgetType: {
    type: String,
    enum: [BudgetTypeEnum.AllExpenses, BudgetTypeEnum.SpecificCategory],
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
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
