// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();
import { getEmail } from '../controller/contact.js';
router.post('/contact', getEmail);
export { router };
