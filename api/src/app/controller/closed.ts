import { Request, Response } from 'express';

import { Closing } from '../datamapper/closed.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const closedDays = async (req: Request, res: Response) => {
  try {
    const isClosed = await Closing.findAllClosedDays();
    console.log('isClosed:', isClosed);
    return res.status(200).json(isClosed)
  } catch (err) {
    if (err instanceof Error)
      logger(err.message);
  }
}

const addClosedDays = async (req: Request, res: Response) => {
  const { closingDate } = req.body
  try {
    const addDate = await Closing.create(closingDate)
    return res.status(200).json(addDate)
  } catch (err) {
    if (err instanceof Error)
      logger(err.message);
  }
}

export { closedDays, addClosedDays };