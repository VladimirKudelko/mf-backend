import * as express from 'express';

import authRouter from './auth';
import cashRouter from './cash';
import categoryRouter from './category';
import transactionRouter from './transaction';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/cash', cashRouter);
router.use('/category', categoryRouter);
router.use('/transactions', transactionRouter);

export default router;
