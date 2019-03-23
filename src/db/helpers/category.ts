import { Category } from '../schemas';
import { CategoryDocument } from '../../models';
import { CategoryTypeEnum } from '../../enums';

const create = (data: CategoryDocument) => Category.create(data);

const getDefaultExpenses = () => Category.find({ isDefault: true, type: CategoryTypeEnum.Expenses });

const getDefaultIncomes = () => Category.find({ isDefault: true, type: CategoryTypeEnum.Incomes });

const getExpenses = (userId: string) => Category.find({ userId, type: CategoryTypeEnum.Expenses });

const getIncomes = (userId: string) => Category.find({ userId, type: CategoryTypeEnum.Incomes });

export default {
  create,
  getDefaultExpenses,
  getDefaultIncomes,
  getExpenses,
  getIncomes
};
