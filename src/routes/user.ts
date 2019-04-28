import * as express from 'express';

import { getAllUsers, deleteAccount } from '../controllers/user';
import { authenticate, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();

router.get('/all', authenticate, verifyAdminRole, getAllUsers);
router.delete('/:id', authenticate, verifyAdminRole, deleteAccount);

export default router;
