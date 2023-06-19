/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';

// import { createOrder, capturePayment }from "../utils/paypalApi.js";
import * as paypal from '../utils/paypalApi.js';

// import path from "path"; // for dotenv config 
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = path.dirname(__filename);
// const dotenvPath = path.resolve(__dirname, "../.env");
// import dotenv from "dotenv";
// dotenv.config({ path: dotenvPath });

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

// import { generateAccessToken, handleResponse } from '../utils/paypalApi.js'; // import method for Paypal payment
// const base = "https://api-m.sandbox.paypal.com";

import Stripe from 'stripe';
import { ErrorApi } from '../services/errorHandler.js';
// import { CartItems } from '../type/stripe.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { // Stripe config with actual version
  apiVersion: '2022-11-15',
})



const createStripeSession = async (req: Request, res: Response) => {

  const test/* : CartItems  */ = req.body;
  console.log('test:', test);

  test.cart.map((item: any) => {
    console.log('Je suis l item dans le controller payment', item)
    // price_data: {
    //   currency: "eur",
    //   product_data: {
    //     name: item.name,
    //   },
    //   unit_amount: item.price * 100,
    // },
    // quantity: item.quantity,
  });
  console.log('test:', test);
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
  res.json({ id: session.id, url: session.url });


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



const createPaypalOrder = async (req: Request, res: Response) => {

  try {
    const order = await paypal.createOrder(req);
    console.log('order:', order);
    res.json(order);
    console.log('order:', order);
  } catch (err) {
    if (err instanceof Error) return res.status(500).json(err.message)
  }
}


const capturePaypalPayment = async (req: Request, res: Response) => {
  const { orderID } = req.body;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    if (err instanceof Error) return new ErrorApi("Impossible de valider votre paiement", req, res, 500)
  }
}

export { createStripeSession, createPaypalOrder, capturePaypalPayment }