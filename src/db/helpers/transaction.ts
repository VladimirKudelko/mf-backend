import * as moment from 'moment';

import { Transaction } from '../schemas';
import { TransactionDocument } from '../../models';
import { TransactionPeriodEnum } from '../../enums';

const create = (data: TransactionDocument) => Transaction.create(data);

const getByUserId = (userId: string) => Transaction.find({ userId });

const getByInterval = (userId: string, period: TransactionPeriodEnum) => {
  const queryConditions: any = {
    userId
  };

  if (period) {
    queryConditions.createdDate = {
      $gte: moment().add(-1 as any, period),
      $lt: Date.now()
    };
  }

  return Transaction.find(queryConditions);
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

export default {
  create,
  getByUserId,
  getByInterval,
  getByPeriod
};
