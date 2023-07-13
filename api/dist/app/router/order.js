import { Router } from 'express';
const router = Router();
import { getAllOrdersForCalendar, createOrder } from '../controller/order.js';
router.get('/orders', getAllOrdersForCalendar);
router.get('/orders/create', createOrder);
export { router };
