import { Request, Response } from 'express';

import { Closing } from '../datamapper/closed.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const closedDays = async (req: Request, res: Response) => {
  try {
    const isClosed = await Closing.findAllClosedDays();
    return res.status(200).json(isClosed)
  } catch (err) {
    if (err instanceof Error)
      logger(err.message);
  }
}

const addSpecialDay = async (req: Request, res: Response) => {
  // const { closingDate } = req.body
  // console.log('req.body addSpecialDay:', req.body);
  try {
    const addDate = await Closing.create(req.body)
    return res.status(200).json(addDate)
  } catch (err) {
    if (err instanceof Error)
      logger(err.message);
  }
}

export { closedDays, addSpecialDay };