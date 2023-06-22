/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';

import { createOrder, capturePayment } from '../services/paypal.js';
import { createStripeOrder } from '../services/stripe.js';

const createStripeSession = async (req: Request, res: Response) => {
  const order = await createStripeOrder(req, res);
  res.json(order)
}



const createPaypalOrder = async (req: Request, res: Response) => {
  const order = await createOrder(req, res);
  res.json(order);

}

const capturePaypalPayment = async (req: Request, res: Response) => {
  const { orderID } = req.body;
  const captureData = await capturePayment(orderID, res);
  res.json(captureData);
}


export { createStripeSession, createPaypalOrder, capturePaypalPayment }