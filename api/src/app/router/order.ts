import { Router } from 'express';
const router = Router();

import { getAllOrdersForCalendar, getAllOrdersByUser, getAllOrders } from '../controller/order.js';
import { closedDays } from '../controller/closed.js';


router.get('/orders', getAllOrders)
router.get('/orders/closed', closedDays)
router.get('/orders/availability', getAllOrdersForCalendar)

router.post('/orders/:userId', getAllOrdersByUser)

export { router };