/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import { Cart } from '../type/cart';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { //? Stripe config with actual version
  apiVersion: '2022-11-15',
})

// const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK!;

const createStripeOrder = async (req: Request, res: Response) => {

  // ? Extract the cart and delivery cost from the request body
  const { cart, deliveryCost } = req.body.cart;

  console.log('cart:', cart);

  // ? Map on cart to list all articles
  const lineItems = cart.map((item: Cart) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
      },
      unit_amount: (item.price * 100).toFixed(0),
    },
    quantity: item.quantity,
  }));
  console.log('lineItems:', lineItems);

  try {
    // ? Create a new Stripe checkout session using the line items and delivery cost
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // customer: customer.id,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
      shipping_options: [{
        shipping_rate_data: {
          display_name: 'Frais de livraison',
          type: 'fixed_amount',
          fixed_amount: {
            currency: 'eur',
            amount: deliveryCost * 100,
          }
        }
      }]

    });
    console.log("session", session);
    res.json({ url: session.url });

  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }

}



// const createStripeWebhook = async (req: Request, res: Response) => {
//   const sig = req.headers['stripe-signature']!;
//   let event: Stripe.Event | undefined;


//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     if (err instanceof Error) return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
//   console.log('event after try catch:', event);

//   // Handle the event
//   if (event?.type === 'checkout.session.completed') {
//     console.log(" je passe dans le if eventType = checkout.session");
//     const paymentIntentSucceeded = event.data.object;
//     console.log('paymentIntentSucceeded:', paymentIntentSucceeded);
//     // Then define and call a function to handle the event payment_intent.succeeded
//     // ... handle other event types
//     console.log(`Unhandled event type ${event.type}`);
//   }
//   res.status(200).end;
// }

export { createStripeOrder /* createStripeWebhook */ }