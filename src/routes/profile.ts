import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { updateSettings, getUserProfile, changePassword } from '../controllers/profile';
import { changeUserSettingsSchema, retrievingViaUseIdSchema, changePasswordSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get('/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), getUserProfile);
router.patch('/settings/:userId', authenticate, expressJoi(changeUserSettingsSchema), updateSettings);
router.patch('/settings/change-password/:userId', authenticate, expressJoi(changePasswordSchema), changePassword);

export default router;
