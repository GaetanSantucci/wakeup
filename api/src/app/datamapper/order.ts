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

  async getAllOrders(): Promise<any> {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `SELECT od.booking_date AT TIME ZONE 'Etc/GMT+2' AS booking_date, 
          SUM(oi.quantity) AS plate_quantity, 
          COUNT(od.id) AS order_count
        FROM 
        ${this.tableName} od 
          INNER JOIN order_items oi ON od.id = oi.order_id 
          INNER JOIN payment_details pd ON od.id = pd.order_id 
          INNER JOIN product p ON oi.product_id = p.id
          WHERE 
         p.category = 'plateau'        
        AND pd.status = 'paid'
            AND od.booking_date > CURRENT_DATE
            
          GROUP BY 
            od.booking_date
            ORDER BY 
            od.booking_date ASC;`
      };
      const result = await this.client.query(preparedQuery);
      return result.rows;
    }
  }

  async getOrderByUser(userId: string): Promise<any> {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `WITH ProductSums AS (
          SELECT
            oi.product_id,
            SUM(p.price * oi.quantity) AS total_product_price,
            SUM(oi.quantity) AS total_order_quantity
          FROM order_items oi
          JOIN product p ON oi.product_id = p.id
          GROUP BY oi.product_id
        )
        
        SELECT
          od.booking_date,
          pd.status AS payment_status,
          u.id AS user_id,
          u.email AS user_email,
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'product_id', ps.product_id,
              'product_name', p.name,
              'total_product_price', ps.total_product_price,
              'total_order_quantity', ps.total_order_quantity
            )
          ) AS products
        FROM ${this.tableName}  od
        JOIN payment_details pd ON od.payment_id = pd.payment_id
        JOIN "user" u ON od.user_id = u.id
        JOIN order_items oi ON od.id = oi.order_id
        JOIN ProductSums ps ON oi.product_id = ps.product_id
        JOIN product p ON oi.product_id = p.id
        WHERE pd.status = 'paid' AND u.id = $1
        GROUP BY od.booking_date, pd.status, u.id, u.email
        ORDER BY od.booking_date ASC;`,
        values: [userId]
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

export { Order, OrderItems }