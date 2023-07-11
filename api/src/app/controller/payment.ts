/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';

import { createOrder, capturePayment } from '../services/paypal.js';
import { createStripeOrder, /* createStripeWebhook */ } from '../services/stripe.js';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { //? Stripe config with actual version
  apiVersion: '2022-11-15',
})

// const webhookSecret: string = process.env.STRIPE_SECRET_WEBHOOK!;

// ? Create a Stripe session for processing a payment
const createStripeSession = async (req: Request, res: Response) => {
  const order = await createStripeOrder(req, res);
  // console.log('order:', order);
  // res.json(order)
  return order;
}


// // Create order function

// const createOrder = async (customer, data) => {
//   const Items = JSON.parse(customer.metadata.cart);

//   const products = Items.map((item) => {
//     return {
//       productId: item.id,
//       quantity: item.cartQuantity,
//     };
//   });

//   const newOrder = new Order({
//     userId: customer.metadata.userId,
//     customerId: data.customer,
//     paymentIntentId: data.payment_intent,
//     products,
//     subtotal: data.amount_subtotal,
//     total: data.amount_total,
//     shipping: data.customer_details,
//     payment_status: data.payment_status,
//   });

//   try {
//     const savedOrder = await newOrder.save();
//     console.log("Processed Order:", savedOrder);
//   } catch (err) {
//     console.log(err);
//   }
// };

// ! test en local : stripe listen --forward-to localhost:7777/api/v1/payment/stripe/webhook
// 4242424242424242
// stripe trigger checkout.session.completed

// ? Create Stripe Webhook to capture completed payment intent 
const stripeWebhook = async (req: Request, res: Response): Promise<void> => {

  let data;
  let eventType;

  // Check if webhook signing is configured.
  const webhookSecret: string = process.env.STRIPE_WEB_HOOK!;
  console.log('webhookSecret:', webhookSecret, typeof (webhookSecret));

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event: Stripe.Event;
    const signature = req.headers["stripe-signature"]!;
    console.log('signature:', signature);
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        res.sendStatus(400);
      }
      return;
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    console.log('data:', data);
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === "checkout.session.completed") {
    console.log("Checkout session completed");
    console.log('data:', data);
    console.log('eventType:', eventType);

  }

  res.status(200).end();
}


// const sig = req.headers['stripe-signature']!;

// let event: Stripe.Event;

// try {
//   const rawBody = JSON.stringify(req.body)
//   // console.log('rawBody:', rawBody);
//   event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
// } catch (err) {
//   // On error, log and return the error message
//   if (err instanceof Error) {
//     console.log(`❌ Error message: ${err.message}`);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   return;
// }

// // Successfully constructed event
// console.log('✅ Success:', event.id);

// // Cast event data to Stripe object
// if (event.type === 'payment_intent.succeeded') {
//   const stripeObject: Stripe.PaymentIntent = event.data
//     .object as Stripe.PaymentIntent;
//   console.log(`💰 PaymentIntent status: ${stripeObject.status}`);
// } else if (event.type === 'charge.succeeded') {
//   const charge = event.data.object as Stripe.Charge;
//   console.log(`💵 Charge id: ${charge.id}`);
// } else {
//   console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
// }

// // Return a response to acknowledge receipt of the event
// res.json({ received: true });
// }



// ? creates a PayPal order for processing a payment
const createPaypalOrder = async (req: Request, res: Response) => {
  const order = await createOrder(req, res);
  res.json(order);

}

// ? captures a PayPal payment for a given order ID
const capturePaypalPayment = async (req: Request, res: Response) => {
  const { orderID } = req.body;
  console.log('req.body:', req.body);
  const captureData = await capturePayment(orderID, res);
  console.log('captureData:', captureData);
  res.json(captureData);
}


export { createStripeSession, stripeWebhook, createPaypalOrder, capturePaypalPayment }