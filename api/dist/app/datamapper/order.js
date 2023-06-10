var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class OrderDatamapper extends CoreDataMapper {
    constructor() {
        super(...arguments);
        this.tableName = 'order_details';
        this.columns = `"id", "customer_id", "booking_date", "total"`;
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client instanceof pg.Pool) {
                const preparedQuery = {
                    text: `SELECT od.booking_date, 
          SUM(oi.quantity) AS plate_quantity, 
          COUNT(od.id) AS order_count
        FROM 
        ${this.tableName} od 
          INNER JOIN order_items oi ON od.id = oi.order_id 
          INNER JOIN payment_details pd ON od.id = pd.order_id 
        WHERE 
          pd.status = 'success'
        GROUP BY 
          od.booking_date
          ORDER BY 
          od.booking_date ASC;`,
                };
                const result = yield this.client.query(preparedQuery);
                return result.rows;
            }
        });
    }
}
const Order = new OrderDatamapper(client);
export { Order };
