import { Plate } from '../datamapper/plate.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllPlates = async (req, res) => {
    try {
        const platesList = await Plate.findAll();
        if (!platesList)
            throw new ErrorApi('Impossible d\'obtenir la liste des articles', req, res, 400);
        return res.status(200).json(platesList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const getPlateById = async (req, res) => {
    try {
        const plateId = +req.params.plateId;
        console.log('plateId:', plateId);
        // console.log('plateId: ', plateId);
        // const plate = await Plate.findOne(plateId);
        //todo utiliser uniquement la deuxieme requete
        const associatedSale = await Plate.findByPlateId(plateId);
        console.log('associatedSale:', associatedSale);
        // logger('associatedSale: ', associatedSale);
        // logger('product: ', plate);
        if (!associatedSale)
            throw new ErrorApi('Article non trouvé', req, res, 400);
        return res.status(200).json(associatedSale);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const createNewPlate = async (req, res) => {
    try {
        // const { name, description, image, price } = req.body
        const newPlate = await Plate.create(req.body);
        if (newPlate)
            return res.status(200).json('L\'article a bien été crée');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getAllPlates, getPlateById, createNewPlate };
