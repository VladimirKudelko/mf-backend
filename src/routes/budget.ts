import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as expressJoi from 'express-joi-validator';

import { addBudget } from '../controllers/budget';
import { authenticate } from '../middlewares/authentication';
import { addNewBudgetSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/', authenticate, expressJoi(addNewBudgetSchema), asyncHandler(addBudget));

export default router;
