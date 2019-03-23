import mongoose from '../context';

export interface WalletDocument extends mongoose.Document {
  userId: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  cardNumber?: string;
  cardService?: string;
  bank?: string;
}
