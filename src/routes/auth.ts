import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { registerUser, loginUser, verifyEmail } from '../controllers/auth';
import { creationUserSchema, authenticationUserSchema, verifyEmailSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/signup', expressJoi(creationUserSchema), registerUser);
router.post('/login', expressJoi(authenticationUserSchema), loginUser);
router.post('/email-verification', expressJoi(verifyEmailSchema), verifyEmail);

export default router;
