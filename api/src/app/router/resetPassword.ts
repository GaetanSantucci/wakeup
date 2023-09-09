// ~ ROUTER CONFIG ~ //

import { Router } from 'express';
const router = Router();

import { resetPassword, sendEmailResetPassword } from '../controller/resetPassword.js';
import { auth } from '../middleware/auth.js';
import { authenticateToken } from '../middleware/authenticateToken.js';


router.post('/send_email_reset', sendEmailResetPassword);

router.post('/reset_password', resetPassword)

export { router };