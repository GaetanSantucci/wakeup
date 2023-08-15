import { Router } from 'express';
const router = Router();

import { getAllOrdersForCalendar } from '../controller/order.js';


router.get('/orders', getAllOrdersForCalendar)

export { router };