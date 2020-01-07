import { Budget } from '../schemas';
import { BudgetDocument } from '../../models';

const create = (data: BudgetDocument) => Budget.create(data);

export default {
  create,
};
