// ~ ROUTER CONFIG ~ //

import { Router } from 'express';
const router = Router();

import { getThreeRandomReviews } from '../controller/review.js';

router.get('/reviews', getThreeRandomReviews);

export { router };