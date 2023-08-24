import { Router } from 'express';
const router = Router();
import { getAllOrdersForCalendar, getAllOrdersByUser } from '../controller/order.js';
router.get('/orders', getAllOrdersForCalendar);
router.get('/orders/:userId', getAllOrdersByUser);
export { router };
