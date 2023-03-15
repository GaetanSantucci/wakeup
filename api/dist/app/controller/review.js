var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Review } from '../datamapper/review.js';
import { ErrorApi } from '../services/errorHandler.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getThreeRandomReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield Review.findRandomReviews();
        if (!reviews || reviews.length === 0)
            throw new ErrorApi('Impossible d\'obtenir la liste des commentaires', req, res, 400);
        return res.status(200).json(reviews);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { getThreeRandomReviews };
