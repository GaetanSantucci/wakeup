import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

class ClosingDatamapper extends CoreDataMapper {

  // tableName = 'closed_days';
  // columns = `"id", "closing_date"`;

  tableName = 'special_day';
  columns = '"id", "date", "plate_quantity", "closing_day"';

  async findAllClosedDays() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT id, date AT TIME ZONE 'GMT-4' AS closing_date, plate_quantity, closing_day FROM
    ${this.tableName} 
    ORDER BY 
        id ASC;`
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

  createFunctionName = 'insert_closed_day';

  // async findAllClosedDays() {
  //   if (this.client instanceof pg.Pool) {
  //     const preparedQuery = {
  //       text: `SELECT id, closing_date AT TIME ZONE 'GMT-4' AS closing_date FROM
  //   ${this.tableName} 
  //   ORDER BY 
  //       id ASC;`
  //     };
  //     const result = await this.client.query(preparedQuery);
  //     return result.rows;
  //   }
  // }
}

const Closing = new ClosingDatamapper(client);
export { Closing }