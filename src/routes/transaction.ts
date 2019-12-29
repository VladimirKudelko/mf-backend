import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import {
  createTransaction,
  getUserTransactionsByInterval,
  getUserTransactionsByPeriod
} from '../controllers/transaction';
import {
  creationTransactionSchema,
  retrievingViaUseIdSchema,
  retrieveTransactionsByPeriodSchema
} from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get(
  '/user/:userId',
  authenticate,
  expressJoi(retrievingViaUseIdSchema),
  asyncHandler(getUserTransactionsByInterval)
);
router.get(
  '/user/:userId/date',
  authenticate,
  expressJoi(retrieveTransactionsByPeriodSchema),
  getUserTransactionsByPeriod
);
router.post('/:userId', authenticate, expressJoi(creationTransactionSchema), asyncHandler(createTransaction));

export default router;
