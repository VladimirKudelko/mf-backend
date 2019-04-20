import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { createCategory, getExpensesCategories, getIncomesCategories } from '../controllers/category';
import { authenticate } from '../middlewares/authentication';
import { creationCategorySchema, retrievingViaUseIdSchema } from '../utils/validation-schemas';
import { Category } from '../db/schemas';

const router = express.Router();

router.get('/expenses/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getExpensesCategories);
router.get('/incomes/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getIncomesCategories);
router.post('/:userId', authenticate, expressJoi(creationCategorySchema), createCategory);
router.post('/', async(req, res, next) => {
  const categories = [
    { isDefault: true, title: 'Presents', icon: 'gift', type: 'Incomes' },
    { isDefault: true, title: 'Salary', icon: 'coins', type: 'Incomes' },
    { isDefault: true, title: 'Savings', icon: 'piggy-bank', type: 'Incomes' },
    { isDefault: true, title: 'Food', icon: 'restaurant', type: 'Expenses' },
    { isDefault: true, title: 'Health', icon: 'heartbeat', type: 'Expenses' },
    { isDefault: true, title: 'Car', icon: 'car', type: 'Expenses' },
    { isDefault: true, title: 'Clothes', icon: 'tshirt', type: 'Expenses' },
    { isDefault: true, title: 'Pets', icon: 'dog', type: 'Expenses' },
    { isDefault: true, title: 'Presents', icon: 'gift', type: 'Expenses' },
    { isDefault: true, title: 'Sport', icon: 'dumbbell', type: 'Expenses' },
    { isDefault: true, title: 'Transport', icon: 'bus-alt', type: 'Expenses' },
    { isDefault: true, title: 'Housing', icon: 'home', type: 'Expenses' },
    { isDefault: true, title: 'Hygiene', icon: 'tooth', type: 'Expenses' }
  ];

  const categoriesNew = await Category.insertMany(categories);

  res.json({categoriesNew});
});

export default router;
