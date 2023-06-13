import { Router } from 'express';
const router = Router();
import { createStripeSession, createPaypalSession } from '../controller/payment.js';
router.post('/payment/stripe', createStripeSession);
router.post('/payment/paypal', createPaypalSession);
export { router };
