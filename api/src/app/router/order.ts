import { Router } from 'express';
const router = Router();

import { getAllOrdersForCalendar, getAllOrdersByUser, getAllOrders } from '../controller/order.js';
import { addClosedDays, closedDays } from '../controller/closed.js';


router.get('/orders', getAllOrders)

router.get('/orders/closed', closedDays)
router.post('/orders/closed/create', addClosedDays)

router.get('/orders/availability', getAllOrdersForCalendar)

router.post('/orders/:userId', getAllOrdersByUser)

export { router };