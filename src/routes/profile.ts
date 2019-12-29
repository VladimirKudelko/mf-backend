import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';
import * as rateLimit from 'express-rate-limit';

import { updateSettings, getUserProfile, changePassword } from '../controllers/profile';
import { changeUserSettingsSchema, retrievingViaUseIdSchema, changePasswordSchema } from '../utils/validation-schemas';
import { authenticate } from '../middlewares/authentication';

const router = express.Router();
const changePasswordLimiter = rateLimit({
  windowMs: 1000 * 60 * 60 * 24,
  max: 3,
  skipFailedRequests: true,
  message: 'You have only 3 attempts to change your password in one day'
});

router.get('/:userId', authenticate, expressJoi(retrievingViaUseIdSchema), asyncHandler(getUserProfile));
router.patch('/settings/:userId', authenticate, expressJoi(changeUserSettingsSchema), asyncHandler(updateSettings));
router.patch(
  '/settings/change-password/:userId',
  authenticate,
  changePasswordLimiter,
  expressJoi(changePasswordSchema),
  asyncHandler(changePassword)
);

export default router;
