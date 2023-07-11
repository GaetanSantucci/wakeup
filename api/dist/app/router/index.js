// ~ ROUTER CONFIG ~ //
import { Router } from 'express';
const router = Router();
router.get('/', (req, res) => {
    return res.json('Welcome to the WAKE UP API');
});
import { router as PlateRouter } from './plate.js';
router.use(PlateRouter);
import { router as BlogRouter } from './blog.js';
router.use(BlogRouter);
import { router as DeliveryRouter } from './delivery.js';
router.use(DeliveryRouter);
import { router as ContactRouter } from './contact.js';
router.use(ContactRouter);
import { router as UserRouter } from './user.js';
router.use(UserRouter);
import { router as ReviewRouter } from './review.js';
router.use(ReviewRouter);
import { router as OrderRouter } from './order.js';
router.use(OrderRouter);
import { router as CloseRouter } from './closed.js';
router.use(CloseRouter);
import { router as PaymentRouter } from './payment.js';
router.use(PaymentRouter);
export { router };
