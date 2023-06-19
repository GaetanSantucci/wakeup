import { Router } from 'express';
const router = Router();
import { createStripeSession, createPaypalOrder, capturePaypalPayment } from '../controller/payment.js';
router.post('/payment/stripe', createStripeSession);
router.post('/payment/paypal-create', createPaypalOrder);
router.post('/payment/paypal-capture', capturePaypalPayment);
export { router };
