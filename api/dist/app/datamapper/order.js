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
    view = {
        getAllOrders: 'getAllOrders',
        getAllAvailableDates: 'getAllAvailableDates',
        getAllOrdersByUser: 'GetOrdersByUser'
    };
    async getAllOrdersByDate() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.view.getAllAvailableDates}`
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async getAllOrders() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.view.getAllOrders}`
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async getOrderByUser(userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.view.getAllOrdersByUser} WHERE user_id = $1`,
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
export { Order, OrderItems };
