import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { getUserCash } from '../controllers/cash';
import { retrievingViaUseIdSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get('/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getUserCash);

export default router;
