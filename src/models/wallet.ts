import mongoose from '../context';

export interface WalletDocument extends mongoose.Document {
  _id: string;
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  createdDate: Date;
}
