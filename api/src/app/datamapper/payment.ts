import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

// import debug from 'debug';
// const logger = debug('Datamapper');

class PaymentDatamapper extends CoreDataMapper {

  tableName = 'payment_details';
  columns = `"id", "order_id", "amount", "status", "payment_mode", "payment_id", "payment_date"`

  createFunctionName = 'insert_payment_details';
  updatePaymentStatus = 'update_payment_status_by_payment_id'

  async findPaymentToUpdateStatus(payment_id: string): Promise<any> {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT ${this.updatePaymentStatus}($1, $2);`,
        values: [payment_id, 'paid']
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }
}

const Payment = new PaymentDatamapper(client);
export { Payment }