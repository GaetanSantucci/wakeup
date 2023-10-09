import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

class ClosingDatamapper extends CoreDataMapper {

  // tableName = 'closed_days';
  // columns = `"id", "closing_date"`;

  tableName = 'special_day';
  columns = '"id", "date", "plate_quantity", "closing_day"';

  createFunctionName = 'create_special_day';
  updateFunctionName = 'update_special_day';

  async findAllClosedDays() {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT date AT TIME ZONE 'GMT-4' AS special_date, plate_quantity, closing_day FROM
    ${this.tableName} 
    ORDER BY 
        id ASC;`
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

  async findSpecialDayByDate(date: Date) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM ${this.tableName} WHERE date = $1;`,
        values: [date]
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

  async updateSpecialDate(inputData: object) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT ${this.updateFunctionName} ($1);`,
        values: [inputData]
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }
}

const Closing = new ClosingDatamapper(client);
export { Closing }