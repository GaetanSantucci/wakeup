import { Request, Response } from 'express'

import { Voucher } from '../datamapper/voucher.js'
import { ErrorApi } from '../services/errorHandler.js'

// ~ DEBUG CONFIG ~ //
import debug from 'debug'
const logger = debug('Controller')

const getOneVoucher = async (req: Request, res: Response) => {
  const { voucherId } = req.body
  try {
    const result = await Voucher.findVoucherByNumber(voucherId)
    if (!result) throw new ErrorApi('Bon cadeau inexistant', req, res, 400)
    return res.status(200).json(result)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const createVoucher = async (req: Request, res: Response) => {
  const { voucher_id, initial_amount, expiration_date } = req.body
  try {
    const result = await Voucher.create({
      voucher_id,
      initial_amount,
      expiration_date,
    })
    return res.status(200).json(result)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getOneVoucher, createVoucher }
