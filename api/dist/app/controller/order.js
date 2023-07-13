// import { ErrorApi } from '../services/errorHandler.js';
import { Order } from '../datamapper/order.js';
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
    logger("on passe dans le createOrder", data.metadata.cart);
    const orderBody = {
        booking_date: data.metadata.bookingDate,
        payment_status: data.payment_status,
        payment_id: data.id,
        amount: data.amount_total,
        payment_date: data.created,
        payment_method: data.payment_method_types,
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
    console.log('orderBody:', orderBody);
    try {
        // ? 1/ verifier si user a deja un compte sinon 
        const isExist = await User.findUserIdentity(data.customer_details.email);
        console.log('isExist:', isExist);
        // ~ si le user existe, recuperer son id : isExiste.id
        if (isExist) {
            console.log("l utilisateur exist");
        }
        else {
            console.log("il existe pas");
            const createUser = await User.create(orderBody.user);
            console.log('createUser:', createUser);
            // create payment_details and get ID in return 
            const createPayment = await Payment.create({});
            console.log('createPayment:', createPayment);
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
    return res.json("Order created successfully");
};
export { getAllOrdersForCalendar, createOrder };
