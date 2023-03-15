import { Request, Response } from 'express';

import { Review } from '../datamapper/review.js';
import { ErrorApi } from '../services/errorHandler.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const getThreeRandomReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findRandomReviews();
    if (!reviews || reviews.length === 0) throw new ErrorApi('Impossible d\'obtenir la liste des commentaires', req, res, 400);

    return res.status(200).json(reviews)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getThreeRandomReviews }