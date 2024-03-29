import { Router } from 'express';
const router = Router();

import { getAllOrdersForCalendar, getAllOrdersByUser, getAllOrders } from '../controller/order.js';
import { addSpecialDay, closedDays } from '../controller/closed.js';


router.get('/orders', getAllOrders)

router.get('/orders/closed', closedDays)
router.post('/orders/closed/create', addSpecialDay)

router.get('/orders/availability', getAllOrdersForCalendar)

router.post('/orders/:userId', getAllOrdersByUser)

export { router };