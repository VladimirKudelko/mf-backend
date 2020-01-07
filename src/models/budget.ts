import mongoose from '../context';

import { BudgetTypeEnum } from '../enums';

export interface BudgetDocument extends mongoose.Document {
  userId: string;
  budgetType: BudgetTypeEnum;
  limit: number;
  isActive: boolean;
  from: Date;
  to: Date;
  modifiedDate: Date;
  currency: String;
}
