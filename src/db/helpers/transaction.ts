import * as moment from 'moment';

import { Transaction } from '../schemas';
import { TransactionDocument } from '../../models';
import { TransactionPeriodEnum } from '../../enums';

const create = (data: TransactionDocument) => Transaction.create(data);

const getByUserId = (userId: string) => Transaction.find({ userId });

const getByInterval = (userId: string, period: TransactionPeriodEnum) => Transaction.find(
  {
    userId,
    createdDate: {
      $gte: moment().add(-1 as any, period),
      $lt: Date.now()
    }
  }
);

const getByPeriod = (userId: string, startDate: string, endDate: string) => Transaction.find(
  {
    userId,
    createdDate: {
      $gte: startDate,
      $lt: endDate
    }
  }
);

export default {
  create,
  getByUserId,
  getByInterval,
  getByPeriod
};
