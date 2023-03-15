var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Delivery } from '../datamapper/delivery.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAreas = yield Delivery.findAll();
        if (!allAreas)
            throw new ErrorApi('Impossible d\'obtenir les blogs', req, res, 400);
        return res.status(200).json(allAreas);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { getAllAreas };
