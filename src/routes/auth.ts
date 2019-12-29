import * as express from 'express';
import * as expressJoi from 'express-joi-validator';
import * as asyncHandler from 'express-async-handler';

import { registerUser, loginUser, verifyEmail } from '../controllers/auth';
import { creationUserSchema, authenticationUserSchema, verifyEmailSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/signup', expressJoi(creationUserSchema), asyncHandler(registerUser));
router.post('/login', expressJoi(authenticationUserSchema), asyncHandler(loginUser));
router.post('/email-verification', expressJoi(verifyEmailSchema), asyncHandler(verifyEmail));

export default router;
