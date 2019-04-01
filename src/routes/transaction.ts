import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { createTransaction, getUserTransactions } from '../controllers/transaction';
import { creationTransactionSchema, retrievingViaUseIdSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get('/user/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getUserTransactions);
router.post('/:userId', authenticate, expressJoi(creationTransactionSchema), createTransaction);

export default router;
