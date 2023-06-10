import { Request, Response } from 'express';
// import { ErrorApi } from '../services/errorHandler.js';
import { Order } from '../datamapper/order.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const getAllOrdersForCalendar = async (req: Request, res: Response) => {
  try {
    const allOrders = await Order.getAllOrders();
    logger('allOrders: ', allOrders);
    // if (!allOrders) throw new ErrorApi('Impossible d\'obtenir les commandes', req, res, 400);

    return res.status(200).json(allOrders)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getAllOrdersForCalendar }