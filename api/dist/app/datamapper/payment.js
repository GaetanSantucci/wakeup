// import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class PaymentDatamapper extends CoreDataMapper {
    tableName = 'payment_details';
    columns = `"id", "order_id", "amount", "status", "payment_mode", "payment_date"`;
}
const Payment = new PaymentDatamapper(client);
export { Payment };
