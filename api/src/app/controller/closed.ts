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

  try {
    const specialDates = await Closing.findSpecialDayByDate(req.body.date)

    if (Array.isArray(specialDates) && specialDates.length > 0) {
      const { id } = specialDates[0];
      // //todo need a function to update specialDate
      req.body = { ...req.body, id }
      await Closing.updateSpecialDate(req.body)
    } else {
      const addDate = await Closing.create(req.body)
      return res.status(200).json(addDate)

    }
  } catch (err) {
    if (err instanceof Error)
      logger(err.message);
  }
}

export { closedDays, addSpecialDay };