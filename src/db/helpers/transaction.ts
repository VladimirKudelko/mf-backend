import * as moment from 'moment';

import { Transaction } from '../schemas';
import { TransactionDocument } from '../../models';
import { TransactionPeriodEnum } from '../../enums';

const create = (data: TransactionDocument) => Transaction.create(data);

const getByUserId = (userId: string) => Transaction.find({ userId });

const getByInterval = (userId: string, period: TransactionPeriodEnum) =>
  Transaction.find({
    userId,
    createdDate: {
      $gte: moment().add(-1 as any, period),
      $lt: Date.now()
    }
  });

const getNewest = (userId: string, limit: number) => {
  return Transaction.find({ userId }, null, { sort: { createdDate: -1 }, limit });
};

const getByPeriod = (userId: string, startDate: string, endDate: string, conditions = {}) => Transaction.find(
  {
    userId,
    createdDate: {
      $gte: startDate,
      $lt: endDate
    },
    ...conditions
  }
);

const deleteById = (id: string) => Transaction.findByIdAndDelete(id);

const updateById = (id: string, data: TransactionDocument | any) =>
  Transaction.findOneAndUpdate({ _id: id }, data, { new: true });

export default {
  create,
  getByUserId,
  getByInterval,
  getByPeriod,
  getNewest,
  updateById,
  deleteById
};
