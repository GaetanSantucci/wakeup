import { Delivery } from '../datamapper/delivery.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllAreas = async (req, res) => {
    try {
        const allAreas = await Delivery.getAllCityByName();
        if (!allAreas)
            throw new ErrorApi('Impossible d\'obtenir les blogs', req, res, 400);
        return res.status(200).json(allAreas);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getAllAreas };
