import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

class VoucherDatamapper extends CoreDataMapper {

  tableName = 'voucher';
  columns = `"id", "voucher_id", "expiration_date", "initial_amount", "amount_used", "date_use"`

  async findVoucherByNumber(voucher_id: string) {
    console.log('voucher_id:', voucher_id);
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT * FROM "${this.tableName}" WHERE voucher_id = ($1);`,
        values: [voucher_id]
      };

      const result = await this.client.query(preparedQuery);
      console.log('result:', result);
      if (!result.rows[0]) return null;
      return result.rows[0];
    }
  }
}

const Voucher = new VoucherDatamapper(client);
export { Voucher }
