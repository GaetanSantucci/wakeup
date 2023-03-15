var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Plate } from '../datamapper/plate.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllPlates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const platesList = yield Plate.findAll();
        logger('platesList: ', platesList);
        if (!platesList)
            throw new ErrorApi('Impossible d\'obtenir la liste des articles', req, res, 400);
        return res.status(200).json(platesList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
const getPlateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plateId = +req.params.plateId;
        // console.log('plateId: ', plateId);
        // const plate = await Plate.findOne(plateId);
        //todo utiliser uniquement la deuxieme requete
        const associatedSale = yield Plate.findByPlateId(plateId);
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
});
const createNewPlate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { name, description, image, price } = req.body
        const newPlate = yield Plate.create(req.body);
        if (newPlate)
            return res.status(200).json('L\'article a bien été crée');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { getAllPlates, getPlateById, createNewPlate };
