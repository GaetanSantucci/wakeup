import express, { Router } from 'express';
const router = Router();
import { createStripeSession, createPaypalSession, capturePaypalSession, stripeWebhook, paypalWebhook } from '../controller/payment.js';
router.post('/payment/stripe', createStripeSession);
router.post('/payment/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.post('/payment/create-paypal-order', createPaypalSession);
router.post('/payment/capture-paypal-order', capturePaypalSession);
router.post('/payment/paypal/webhook', paypalWebhook);
export { router };
