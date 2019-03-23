import { Wallet } from '../schemas';

const create = (data) => Wallet.create(data);

const getByUseId = (userId: string) => Wallet.findOne({ userId });

export default {
  create,
  getByUseId
};
