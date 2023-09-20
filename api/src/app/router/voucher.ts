// ~ ROUTER CONFIG ~ //

import { Router } from 'express';
const router = Router();

import { getOneVoucher } from '../controller/voucher.js';

router.post('/vouchers', getOneVoucher);

export { router };