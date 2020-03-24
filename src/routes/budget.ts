import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as expressJoi from 'express-joi-validator';

import { addBudgets } from '../controllers/budget';
import { authenticate } from '../middlewares/authentication';
import { addNewBudgetsSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/', authenticate, expressJoi(addNewBudgetsSchema), asyncHandler(addBudgets));

export default router;
