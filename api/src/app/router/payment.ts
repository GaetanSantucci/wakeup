import { Router } from 'express';
const router = Router();

import { createStripeSession, createPaypalOrder, capturePaypalPayment } from '../controller/payment.js';

router.post('/payment/stripe', createStripeSession)
router.post('/payment/create-paypal-order', createPaypalOrder)
router.post('/payment/capture-paypal-order', capturePaypalPayment)

export { router };