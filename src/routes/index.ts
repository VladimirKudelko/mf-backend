import * as express from 'express';

import authRouter from './auth';
import cashRouter from './cash';
import categoryRouter from './category';
import transactionRouter from './transaction';
import profileRouter from './profile';
import userRouter from './user';
import budgetRouter from './budget';
import currencyRouter from './currency';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/budgets', budgetRouter);
router.use('/cash', cashRouter);
router.use('/category', categoryRouter);
router.use('/profile', profileRouter);
router.use('/transactions', transactionRouter);
router.use('/user', userRouter);
router.use('/currencies', currencyRouter);

export default router;
