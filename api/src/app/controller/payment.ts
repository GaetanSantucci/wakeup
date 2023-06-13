/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Request, Response } from 'express';
import '../../../dotenv'
// import { ErrorApi } from '../services/errorHandler.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
import Stripe from 'stripe';
import { CartItems } from '../type/stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})



const createStripeSession = async (req: Request, res: Response) => {

  // const cart = req.body;
  const cart = [{
    id: 1,
    name: 'Plateau 1',
    image: 'sunshine.webp',
  }]
  logger(' cart dans le payment session', cart)

  // const lineItems = cart.map((item: CartItems) => ({
  //   price_data: {
  //     currency: "eur",
  //     product_data: {
  //       name: item.name,
  //     },
  //     unit_amount: item.price * 100,
  //   },
  //   quantity: item.quantity,
  // }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: /* lineItems, */
      [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: 'plateau sunshine',
            },
            unit_amount: 29.90 * 100,
          },
          quantity: 2,
        },
      ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL!}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL!}/checkout-cancel`,
  });
  res.json({ id: session.id });


  // stripe.customers
  //   .create({
  //     email: 'customer@example.com',
  //   })
  //   .then((customer) => {
  //     // have access to the customer object
  //     return stripe.invoiceItems
  //       .create({
  //         customer: customer.id, // set the customer id
  //         amount: cart.totalAmount * 100, // 25
  //         currency: 'eur',
  //         description: 'One-time setup fee',
  //       })
  //       .then((invoiceItem) => {
  //         return stripe.invoices.create({
  //           collection_method: 'send_invoice',
  //           customer: invoiceItem.customer,
  //         });
  //       })
  //       .then((invoice) => {
  //         // New invoice created on a new customer
  //       })
  //       .catch((err) => {
  //         // Deal with an error
  //       });
  //   });

}



const createPaypalSession = (req: Request, res: Response) => {
  return "bonjour"
}

export { createStripeSession, createPaypalSession }