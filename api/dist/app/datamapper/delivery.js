import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class DeliveryDatamapper extends CoreDataMapper {
    tableName = 'delivery_area';
    columns = `"id", "name", "postcode", "price"`;
}
const Delivery = new DeliveryDatamapper(client);
export { Delivery };
