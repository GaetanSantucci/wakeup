import { Router } from 'express';
const router = Router();
import { getAllOrdersForCalendar, createOrder } from '../controller/order.js';
const data = 'success';
router.get('/orders', getAllOrdersForCalendar);
router.get('/orders/create', createOrder(data));
export { router };
