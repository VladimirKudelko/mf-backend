import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import { createCategory, getExpensesCategories, getIncomesCategories } from '../controllers/category';
import { authenticate } from '../middlewares/authentication';
import { creationCategorySchema, retrievingViaUseIdSchema } from '../utils/validation-schemas';

const router = express.Router();

router.get(
  '/expenses/:userId',
  authenticate,
  expressJoi(retrievingViaUseIdSchema),
  asyncHandler(getExpensesCategories)
);
router.get('/incomes/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), asyncHandler(getIncomesCategories));
router.post('/:userId', authenticate, expressJoi(creationCategorySchema), asyncHandler(createCategory));

export default router;
