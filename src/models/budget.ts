import mongoose from '../context';
import { BudgetStatusEnum } from '../enums';

export interface BudgetDocument extends mongoose.Document {
  _id: string;
  userId: string;
  limit: number;
  status: BudgetStatusEnum;
  from: Date;
  to: Date;
  modifiedDate: Date;
  currency: String;
}
