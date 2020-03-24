import mongoose from '../context';
import { BudgetStatusEnum } from '../enums';

export interface BudgetDocument extends mongoose.Document {
  userId: string;
  limit: number;
  status: BudgetStatusEnum;
  from: Date;
  to: Date;
  modifiedDate: Date;
  currency: String;
}
