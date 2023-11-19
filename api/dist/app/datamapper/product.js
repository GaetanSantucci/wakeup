import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class ProductDatamapper extends CoreDataMapper {
    tableName = 'product';
    columns = `"id", "name", "subtitle", "description", "price", "weight","image", "slug", "is_new", "dimension", "category"`;
    createFunctionName = 'create_plate';
    updateFunctionName = 'update_plate';
}
const Product = new ProductDatamapper(client);
export { Product };
