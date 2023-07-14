import pg from 'pg';
import { client } from '../services/dbClient.js';
import { CoreDataMapper } from './coreDatamapper.js';
// import debug from 'debug';
// const logger = debug('Datamapper');
class OrderDatamapper extends CoreDataMapper {
    tableName = 'order_details';
    columns = `"id", "user_id", "booking_date", "total", "payment_id`;
    createFunctionName = 'insert_order_details';
    // updateFunctionName = 'update_order_details';
    async getAllOrders() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT od.booking_date AT TIME ZONE 'Etc/GMT+2' AS booking_date, 
          SUM(oi.quantity) AS plate_quantity, 
          COUNT(od.id) AS order_count
        FROM 
        ${this.tableName} od 
          INNER JOIN order_items oi ON od.id = oi.order_id 
          INNER JOIN payment_details pd ON od.id = pd.order_id 
        WHERE 
          pd.status = 'paid'
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
class OrderItemsDatamapper extends CoreDataMapper {
    tableName = 'order_items';
    columns = '"id", "order_id", "product_id", "quantity"';
    createFunctionName = 'insert_order_items';
}
const OrderItems = new OrderItemsDatamapper(client);
export { Order, OrderItems };
