import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class OrderDatamapper extends CoreDataMapper {
    tableName = 'order_details';
    columns = `"id", "customer_id", "booking_date", "total"`;
    async getAllOrders() {
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
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
}
const Order = new OrderDatamapper(client);
export { Order };
