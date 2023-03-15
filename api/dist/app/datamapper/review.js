var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class ReviewDatamapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'review';
        this.columns = `"id", "description", "author", "date", "star"`;
    }
    // createFunctionName = 'create_blog';
    // updateFunctionName = 'update_blog';
    //& If need to create specific method for LocationDataMapper
    //& Find user by email
    findRandomReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client instanceof pg.Pool) {
                const preparedQuery = {
                    text: `SELECT * FROM review ORDER BY RANDOM() LIMIT 3;`
                };
                const result = yield this.client.query(preparedQuery);
                if (result.rowCount === 0)
                    return null;
                return result.rows;
            }
        });
    }
}
const Review = new ReviewDatamapper(client);
export { Review };
