import mongoose from '../../context';
import { TransactionDocument } from '../../models';
import { CategoryTypeEnum } from '../../enums';

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  walletId: mongoose.Schema.Types.ObjectId,
  categoryId: mongoose.Schema.Types.ObjectId,
  currency: String,
  createdDate: {
    type: mongoose.Schema.Types.Date,
    default: new Date().toISOString()
  },
  type: {
    type: String,
    enum: [CategoryTypeEnum.Expenses, CategoryTypeEnum.Incomes],
    required: true
  },
  amountMoney: {
    type: Number,
    required: true
  },
  note: String
}, { versionKey: false });

export default mongoose.model<TransactionDocument>('transaction', transactionSchema);
