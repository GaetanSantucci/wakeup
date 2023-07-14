// import { ErrorApi } from '../services/errorHandler.js';
import { Order, OrderItems } from '../datamapper/order.js';
import { User } from '../datamapper/user.js';
import { Payment } from '../datamapper/payment.js';
// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');
const getAllOrdersForCalendar = async (req, res) => {
    try {
        const allOrders = await Order.getAllOrders();
        // if (!allOrders) throw new ErrorApi('Impossible d\'obtenir les commandes', req, res, 400);
        return res.status(200).json(allOrders);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const createOrder = async (data, req, res) => {
    const orderBody = {
        booking_date: data.metadata.bookingDate,
        payment_status: data.payment_status,
        payment_id: data.id,
        amount: data.amount_total / 100,
        payment_date: data.created,
        payment_method: data.payment_method_types[0],
        cart: JSON.parse(data.metadata.cart),
        user: {
            email: data.customer_details.email,
            lastname: data.metadata.lastname,
            firstname: data.metadata.firstname,
            address: {
                name: data.customer_details.address.line1,
                complement: data.customer_details.address.line2,
                city: data.customer_details.address.city,
                postcode: data.customer_details.address.postal_code,
            }
        }
    };
    try {
        // ? 1/ verifier si user a deja un compte sinon 
        const isExist = await User.findUserIdentity(data.customer_details.email);
        // ~ si le user existe, recuperer son id : isExiste.id
        if (isExist) {
            const payment_details = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
            const order_details = await Order.create({ user_id: isExist.id, total: orderBody.amount, booking_date: orderBody.booking_date, payment_id: payment_details.insert_payment_details });
            const order_items = orderBody.cart.forEach(async (item) => {
                await OrderItems.create({ order_id: order_details.insert_order_details, product_id: item.id, quantity: item.quantity });
            });
            await Promise.all([payment_details, order_details, order_items]);
        }
        else {
            console.log("il existe pas");
            const createUser = await User.create(orderBody.user);
            // create payment_details and get ID in return 
            const createPayment = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
    return res.json("Order successfully created");
};
export { getAllOrdersForCalendar, createOrder };
