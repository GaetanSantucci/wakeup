var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Closing } from '../datamapper/closed.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const closedDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isClosed = yield Closing.findAll();
        console.log('isClosed:', isClosed);
        return res.status(200).json(isClosed);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { closedDays };
