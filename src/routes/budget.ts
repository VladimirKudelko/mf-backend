import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as expressJoi from 'express-joi-validator';

import { addBudgets, updateBudgets } from '../controllers/budget';
import { authenticate } from '../middlewares/authentication';
import { addNewBudgetsSchema, updateBudgetsSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/', authenticate, expressJoi(addNewBudgetsSchema), asyncHandler(addBudgets));
router.patch('/', authenticate, expressJoi(updateBudgetsSchema), asyncHandler(updateBudgets));

export default router;
