import * as express from 'express';
import * as asyncHandler from 'express-async-handler';

import { getAllUsers, deleteAccount, getUserQuestionsByEmail, verifyUserQuestions, resetPassword } from '../controllers/user';
import { authenticate, verifyAdminRole } from '../middlewares/authentication';

const router = express.Router();

router.get('/all', authenticate, verifyAdminRole, asyncHandler(getAllUsers));
router.get('/user-questions', asyncHandler(getUserQuestionsByEmail));
router.post('/user-questions/verification', asyncHandler(verifyUserQuestions));
router.post('/:id/password-reset', asyncHandler(resetPassword));
router.delete('/:id', authenticate, verifyAdminRole, asyncHandler(deleteAccount));

export default router;
