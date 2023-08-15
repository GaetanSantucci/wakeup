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
  const { cart, deliveryCost, bookingDate } = req.body.cart;
  const user = req.body.user

  const customer = await stripe.customers.create({
    name: `${user.lastname} ${user.firstname}`,
    phone: user.phone,
    address: {
      city: user.address.city,
      line1: user.address.name,
      line2: user.address.complement,
      postal_code: user.address.postcode
    }
  })

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


  // ? Create a new Stripe checkout session using the line items and delivery cost
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer: customer.id,
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
    }],
    metadata: {
      lastname: user.lastname.toString(),
      firstname: user.firstname.toString(),
      phone: user.phone.toString(),
      bookingDate: bookingDate.toString(),
      cart: JSON.stringify(cart)
    }

  });
  console.log("session", session);
  res.json({ url: session.url });
}

export { createStripeOrder }
