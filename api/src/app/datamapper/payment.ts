// import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';

// import debug from 'debug';
// const logger = debug('Datamapper');

class PaymentDatamapper extends CoreDataMapper {

  tableName = 'payment_details';
  columns = `"id", "order_id", "amount", "status", "payment_mode", "payment_date"`

  // createFunctionName = 'create_payment ';
  // updateFunctionName = 'update_blog';
  // todo create function to create payment
}

const Payment = new PaymentDatamapper(client);
export { Payment }