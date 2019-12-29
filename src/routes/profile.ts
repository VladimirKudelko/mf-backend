import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import { updateSettings, getUserProfile, changePassword } from '../controllers/profile';
import { changeUserSettingsSchema, retrievingViaUseIdSchema, changePasswordSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();

router.get('/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), asyncHandler(getUserProfile));
router.patch('/settings/:userId', authenticate, expressJoi(changeUserSettingsSchema), asyncHandler(updateSettings));
router.patch(
  '/settings/change-password/:userId',
  authenticate,
  expressJoi(changePasswordSchema),
  asyncHandler(changePassword)
);

export default router;
