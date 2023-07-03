import { createOrder, capturePayment } from '../services/paypal.js';
import { createStripeOrder } from '../services/stripe.js';
// ? Create a Stripe session for processing a payment
const createStripeSession = async (req, res) => {
    const order = await createStripeOrder(req, res);
    res.json(order);
};
// ? creates a PayPal order for processing a payment
const createPaypalOrder = async (req, res) => {
    const order = await createOrder(req, res);
    res.json(order);
};
// ? captures a PayPal payment for a given order ID
const capturePaypalPayment = async (req, res) => {
    const { orderID } = req.body;
    const captureData = await capturePayment(orderID, res);
    res.json(captureData);
};
export { createStripeSession, createPaypalOrder, capturePaypalPayment };
