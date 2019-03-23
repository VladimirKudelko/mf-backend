import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { createCategory, getExpensesCategories, getIncomesCategories } from '../controllers/category';
import { creationCategorySchema } from '../utils/validation-schemas';
import { Category } from '../db/schemas';

const router = express.Router();

router.get('/expenses/:userId', getExpensesCategories);
router.get('/incomes/:userId', getIncomesCategories);
router.post('/:userId', expressJoi(creationCategorySchema), createCategory);
router.post('/', async(req, res, next) => {
  const categories = [
    { isDefault: true, title: 'Presents', type: 'Expenses' },
    { isDefault: true, title: 'Salary', type: 'Expenses' },
    { isDefault: true, title: 'Savings', type: 'Expenses' },
    { isDefault: true, title: 'Food', type: 'Incomes' },
    { isDefault: true, title: 'Health', type: 'Incomes' },
    { isDefault: true, title: 'Car', type: 'Incomes' },
    { isDefault: true, title: 'Clothes', type: 'Incomes' },
    { isDefault: true, title: 'Pets', type: 'Incomes' },
    { isDefault: true, title: 'Presents', type: 'Incomes' },
    { isDefault: true, title: 'Sport', type: 'Incomes' },
    { isDefault: true, title: 'Transport', type: 'Incomes' },
    { isDefault: true, title: 'Housing', type: 'Incomes' },
    { isDefault: true, title: 'Hygiene', type: 'Incomes' }
  ];

  const categoriesNew = await Category.insertMany(categories);

  res.json({categoriesNew});
});

export default router;
