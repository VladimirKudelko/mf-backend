import * as express from 'express';
import * as asyncHandler from 'express-async-handler';

import { getAllUsers, deleteAccount } from '../controllers/user';
import { authenticate, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();

router.get('/all', authenticate, verifyAdminRole, asyncHandler(getAllUsers));
router.delete('/:id', authenticate, verifyAdminRole, asyncHandler(deleteAccount));

export default router;
