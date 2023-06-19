import { Closing } from '../datamapper/closed.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const closedDays = async (req, res) => {
    try {
        const isClosed = await Closing.findAll();
        return res.status(200).json(isClosed);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { closedDays };
