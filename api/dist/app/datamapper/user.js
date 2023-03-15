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
class UserDataMapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'customer';
        this.columns = `"id","email","lastname","firstname", address, phone, role, newsletter_optin`;
        this.createFunctionName = 'create_customer';
    }
    // updateFunctionName = 'update_user';
    // userIdentity = 'user_identity';
    //& Find user by email
    findUserIdentity(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('findUserIdentity ou pas');
            if (this.client instanceof pg.Pool) {
                const preparedQuery = {
                    text: `SELECT * FROM "${this.tableName}" WHERE email = ($1);`,
                    values: [email]
                };
                const result = yield this.client.query(preparedQuery);
                console.log('result User: ', result.rows[0]);
                if (!result.rows[0])
                    return null;
                return result.rows[0];
            }
        });
    }
}
const User = new UserDataMapper(client);
export { User };
