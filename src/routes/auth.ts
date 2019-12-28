import * as express from 'express';
import * as expressJoi from 'express-joi-validator';

import { registerUser, loginUser } from '../controllers/auth';
import { creationUserSchema, authenticationUserSchema } from '../utils/validation-schemas';

const router = express.Router();

router.post('/signup', expressJoi(creationUserSchema), registerUser);
router.post('/login', expressJoi(authenticationUserSchema), loginUser);

export default router;
