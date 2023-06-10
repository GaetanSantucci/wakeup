import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
class ClosingDatamapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'closed_days';
        this.columns = `"id", "closing_date"`;
    }
}
const Closing = new ClosingDatamapper(client);
export { Closing };
