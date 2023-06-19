import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
class ClosingDatamapper extends CoreDataMapper {
    tableName = 'closed_days';
    columns = `"id", "closing_date"`;
}
const Closing = new ClosingDatamapper(client);
export { Closing };
