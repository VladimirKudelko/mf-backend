import * as express from 'express';
import * as _ from 'lodash';

import { registerUser, loginUser } from '../controllers/auth';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

export default router;
