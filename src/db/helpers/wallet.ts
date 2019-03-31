import { Wallet } from '../schemas';

const create = (data) => Wallet.create(data);

const getById = (_id: string) => Wallet.findOne({ _id });

const getByUserId = (userId: string) => Wallet.findOne({ userId });

const update = (_id: string, data) => Wallet.updateOne({ _id }, data, { new: true });

export default {
  create,
  getById,
  getByUserId,
  update
};
