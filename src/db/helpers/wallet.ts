import { Wallet } from '../schemas';
import { WalletDocument } from '../../models';

const create = (data: WalletDocument | any) => Wallet.create(data);

const getById = (_id: string) => Wallet.findOne({ _id });

const getByUserId = (userId: string) => Wallet.findOne({ userId });

const update = (_id: string, data: WalletDocument | any) => Wallet.findOneAndUpdate({ _id }, data, { new: true });

const updateByUserId = (userId: string, data: WalletDocument | any) =>
  Wallet.findOneAndUpdate({ userId }, data, { new: true });

export default {
  create,
  getById,
  getByUserId,
  update,
  updateByUserId
};
