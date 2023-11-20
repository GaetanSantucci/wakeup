/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express'

import { createPaypalOrder, capturePaypalPayment } from '../services/paypal.js'
import {
  createStripeOrder /* createStripeWebhook */,
} from '../services/stripe.js'

import { Payment } from '../datamapper/payment.js'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Stripe from 'stripe'
import { createOrderWithPaypal, createOrderWithStripe } from './order.js'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //? Stripe config with actual version
  apiVersion: '2022-11-15',
})

import paypal from 'paypal-rest-sdk'
// Configure the PayPal SDK
paypal.configure({
  mode: 'live', // or 'sandbox'
  client_id: process.env.PAYPAL_CLIENT_ID!,
  client_secret: process.env.PAYPAL_SECRET_KEY!,
})

// ? Create a Stripe session for processing a payment
const createStripeSession = async (req: Request, res: Response) => {
  const order = await createStripeOrder(req, res)
  return order
}

// ? Create Stripe Webhook to capture completed payment intent
const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
  let data
  let eventType

  // Check if webhook signing is configured.
  const webhookSecret: string = process.env.STRIPE_WEB_HOOK!

  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event: Stripe.Event
    const signature = req.headers['stripe-signature']!
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret)
    } catch (err) {
      if (err instanceof Error) {
        res.sendStatus(400)
      }
      return
    }
    // Extract the object from the event.
    data = event.data.object
    eventType = event.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    // launch createPaypalOrder to set differents data in database
    await createOrderWithStripe(data, req, res)
  }
  res.status(200).end()
}

// ? creates a PayPal order for processing a payment
const createPaypalSession = async (req: Request, res: Response) => {
  const order = await createPaypalOrder(req, res)
  await createOrderWithPaypal(order, req)
  res.json(order)
}

// ? captures a PayPal payment for a given order ID
const capturePaypalSession = async (req: Request, res: Response) => {
  const captureData = await capturePaypalPayment(req, res)
  if (captureData.status === 'COMPLETED') {
    await Payment.findPaymentToUpdateStatus(captureData.id)
  }
  res.json(captureData)
}

export {
  createStripeSession,
  stripeWebhook,
  createPaypalSession,
  capturePaypalSession,
}
