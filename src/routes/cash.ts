import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import { getUserCash } from '../controllers/cash';
import { retrievingViaUseIdSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get('/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), asyncHandler(getUserCash));

export default router;
