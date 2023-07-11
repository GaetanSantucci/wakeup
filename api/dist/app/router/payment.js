import express, { Router } from 'express';
const router = Router();
import { createStripeSession, createPaypalOrder, capturePaypalPayment, stripeWebhook } from '../controller/payment.js';
router.post('/payment/stripe', createStripeSession);
router.post('/payment/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.post('/payment/create-paypal-order', createPaypalOrder);
router.post('/payment/capture-paypal-order', capturePaypalPayment);
export { router };
