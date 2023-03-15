import { client } from '../service/dbClient.js';
import { CoreDataMapper } from './coreDatamapper';
class ProductDatamapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'associated_sale';
        this.columns = `"id", "name", "subtitle", "description", "price", "image"`;
        this.createFunctionName = 'create_associated_sale';
        this.updateFunctionName = 'update_associated_sale';
        //& If need to create specific method for LocationDataMapper
    }
}
const Product = new ProductDatamapper(client);
export { Product };
