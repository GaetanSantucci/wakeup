import { createOrder, capturePayment } from '../services/paypal.js';
import { createStripeOrder } from '../services/stripe.js';
const createStripeSession = async (req, res) => {
    const order = await createStripeOrder(req, res);
    res.json(order);
};
const createPaypalOrder = async (req, res) => {
    const order = await createOrder(req, res);
    res.json(order);
};
const capturePaypalPayment = async (req, res) => {
    const { orderID } = req.body;
    const captureData = await capturePayment(orderID, res);
    res.json(captureData);
};
export { createStripeSession, createPaypalOrder, capturePaypalPayment };
