import mongoose from '../context';
import { CategoryTypeEnum } from '../enums';

export interface TransactionDocument extends mongoose.Document {
  userId: string;
  walletId: string;
  categoryId: string;
  type: CategoryTypeEnum;
  note: string;
  createdDate?: Date;
}
