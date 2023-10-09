import { Voucher } from '../datamapper/voucher.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getOneVoucher = async (req, res) => {
    const { voucherId } = req.body;
    try {
        const result = await Voucher.findVoucherByNumber(voucherId);
        console.log('result dans le controller:', result);
        if (!result)
            throw new ErrorApi('Bon cadeau inexistant', req, res, 400);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getOneVoucher };
