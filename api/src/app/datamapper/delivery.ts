import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

// import debug from 'debug';
// const logger = debug('Datamapper');

class DeliveryDatamapper extends CoreDataMapper {

  tableName = 'delivery_area';
  columns = `"id", "name", "postcode", "price"`

  // createFunctionName = 'create_blog';
  // updateFunctionName = 'update_blog';
  async getAllCityByName() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM 
    ${this.tableName} 
    ORDER BY 
        city ASC;`
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

}

const Delivery = new DeliveryDatamapper(client);
export { Delivery }
