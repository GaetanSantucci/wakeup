// ~ ROUTER CONFIG ~ //

import { Router } from 'express'
const router = Router()

import { getOneVoucher, createVoucher } from '../controller/voucher.js'

router.post('/vouchers', getOneVoucher)
router.post('/vouchers/create', createVoucher)

export { router }
