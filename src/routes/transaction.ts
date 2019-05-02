import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

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

router.get('/user/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getUserTransactionsByInterval);
router.get(
  '/user/:userId/date',
  authenticate,
  expressJoi(retrieveTransactionsByPeriodSchema),
  getUserTransactionsByPeriod
);
router.post('/:userId', authenticate, expressJoi(creationTransactionSchema), createTransaction);

export default router;
