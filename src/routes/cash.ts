import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { getUserCash } from '../controllers/cash';
import { retrievingUserCashSchema } from '../utils/validation-schemas';

const router = express.Router();

router.get('/:userId', expressJoi(retrievingUserCashSchema), getUserCash);

export default router;
