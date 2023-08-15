import { createPaypalOrder, capturePaypalPayment } from '../services/paypal.js';
import { createStripeOrder, /* createStripeWebhook */ } from '../services/stripe.js';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Stripe from 'stripe';
import { createOrderWithPaypal, createOrderWithStripe } from './order.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
import paypal from 'paypal-rest-sdk';
// Configure the PayPal SDK
paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY
});
// ? Create a Stripe session for processing a payment
const createStripeSession = async (req, res) => {
    const order = await createStripeOrder(req, res);
    return order;
};
//  test en local : stripe listen --forward-to localhost:7777/api/v1/payment/stripe/webhook
// 4242424242424242 
// stripe trigger checkout.session.completed
// ? Create Stripe Webhook to capture completed payment intent 
const stripeWebhook = async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    const webhookSecret = process.env.STRIPE_WEB_HOOK;
    if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        const signature = req.headers["stripe-signature"];
        try {
            event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(`⚠️  Webhook signature verification failed:  ${err}`);
                res.sendStatus(400);
            }
            return;
        }
        // Extract the object from the event.
        data = event.data.object;
        eventType = event.type;
    }
    else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data.object;
        eventType = req.body.type;
    }
    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
        // launch createPaypalOrder to set differents data in database
        await createOrderWithStripe(data, req, res);
    }
    res.status(200).end();
};
// ? creates a PayPal order for processing a payment
const createPaypalSession = async (req, res) => {
    const order = await createPaypalOrder(req, res);
    console.log('order:', order);
    await createOrderWithPaypal(order, req, res);
    res.json(order);
};
// ? captures a PayPal payment for a given order ID
const capturePaypalSession = async (req, res) => {
    const captureData = await capturePaypalPayment(req, res);
    console.log('captureData:', captureData);
    if (captureData.status === 'COMPLETED') {
        // todo need to create new row with payment id for stripe and paypal
        // todo create update to validate payment success in database using payment_id to finb order and update payment status
        // await updateOrderWithPaypal('paid', captureData.id)
    }
    res.json(captureData);
};
const paypalWebhook = async (req, res) => {
    const eventType = req.body.event_type;
    console.log('eventType:', eventType);
    const webhookData = req.body.resource;
    console.log('webhookData:', webhookData);
    // Verify the webhook signature
    const headers = req.headers;
    const webhookId = '49M10291CR9800545';
    try {
        const verificationStatus = await new Promise((resolve, reject) => {
            paypal.notification.webhookEvent.verify(headers, req.body, webhookId, (error, response) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }
                else {
                    resolve(response.verification_status);
                }
            });
        });
        if (verificationStatus === 'SUCCESS') {
            if (eventType === 'CHECKOUT.ORDER.APPROVED') {
                // Extract necessary information from webhookData
                // Save bookingDate and customer address to your database
                console.log("YESSSS YESSSS YESSSSS ca passseeeeeeeeeeeeeee");
            }
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};
export { createStripeSession, stripeWebhook, createPaypalSession, capturePaypalSession, paypalWebhook };
