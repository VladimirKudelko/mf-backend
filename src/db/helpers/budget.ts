import { Budget } from '../schemas';
import { BudgetDocument } from '../../models';

const create = (data: BudgetDocument) => Budget.create(data);

const updatedById = (id: string, data: BudgetDocument | any) =>
  Budget.findByIdAndUpdate(id, data, { new: true });

export default {
  create,
  updatedById
};
