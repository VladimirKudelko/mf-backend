import mongoose from '../../context';
import { WalletDocument } from '../../models';
import { WalletTypeEnum, CurrencyEnum } from '../../enums';

const walletSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    default: 'Default'
  },
  type: {
    type: String,
    enum: [WalletTypeEnum.Default, WalletTypeEnum.CreditCard],
    default: WalletTypeEnum.Default
  },
  balance: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    enum: [CurrencyEnum.AmericanDollar, CurrencyEnum.Euro, CurrencyEnum.BelarusianRuble, CurrencyEnum.RussianRuble],
    default: CurrencyEnum.AmericanDollar
  },
  createdDate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  lastUpdate: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  }
}, { versionKey: false });

export default mongoose.model<WalletDocument>('wallet', walletSchema);
