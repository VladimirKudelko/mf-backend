import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import { authenticate } from '../middlewares/authentication';
import { getConversionRates, updateCurrency } from '../controllers/currency';
import { getConversionRatesSchema, updateCurrencySchema } from '../utils/validation-schemas/currency';

const router = express.Router();

router.get(
  '/conversion-rates',
  authenticate,
  expressJoi(getConversionRatesSchema),
  asyncHandler(getConversionRates)
);
router.patch('/', authenticate, expressJoi(updateCurrencySchema), asyncHandler(updateCurrency));

export default router;
