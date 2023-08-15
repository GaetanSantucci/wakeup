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
// const createOrder = async (data: DataStripe, req: Request, res: Response) => {
//   console.log('data:', data);
//   const orderBody = {
//     booking_date: data.metadata.bookingDate,
//     payment_status: data.payment_status,
//     payment_id: data.id,
//     amount: data.amount_total / 100,
//     payment_date: data.created,
//     payment_method: data.payment_method_types[0],
//     cart: JSON.parse(data.metadata.cart),
//     user: {
//       email: data.customer_details.email,
//       lastname: data.metadata.lastname,
//       firstname: data.metadata.firstname,
//       phone: data.metadata.phone,
//       address: {
//         name: data.customer_details.address.line1,
//         complement: data.customer_details.address.line2,
//         city: data.customer_details.address.city,
//         postcode: data.customer_details.address.postal_code,
//       }
//     }
//   }
//   try {
//     // ? 1/ verifier si user a deja un compte sinon 
//     const isExist = await User.findUserIdentity(data.customer_details.email)
//     // ~ si le user existe, recuperer son id : isExiste.id
//     if (isExist) {
//       const payment_details = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
//       const order_details = await Order.create({ user_id: isExist.id, total: orderBody.amount, booking_date: orderBody.booking_date, payment_id: payment_details.insert_payment_details })
//       orderBody.cart.forEach(async (item: { id: number; quantity: number; }) => {
//         await OrderItems.create({ order_id: order_details.insert_order_details, product_id: item.id, quantity: item.quantity });
//       });
//     } else {
//       const { create_user } = await User.create(orderBody.user)
//       const payment_details = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
//       const order_details = await Order.create({ user_id: create_user, total: orderBody.amount, booking_date: orderBody.booking_date, payment_id: payment_details.insert_payment_details })
//       orderBody.cart.forEach(async (item: { id: number; quantity: number; }) => {
//         await OrderItems.create({ order_id: order_details.insert_order_details, product_id: item.id, quantity: item.quantity });
//       });
//     }
//   } catch (err) {
//     if (err instanceof Error) logger(err.message)
//   }
//   return res.json("Order successfully created")
// }
// const createOrderWithPaypal = async (data: DataPaypal, req: Request, res: Response) => {
//   const orderBody = {
//     booking_date: req.body.bookingDate,
//     payment_status: data.payment_status,
//     payment_id: data.id,
//     amount: data.amount_total / 100,
//     payment_date: data.created,
//     payment_method: data.payment_method_types[0],
//     cart: JSON.parse(req.body.cart),
//     user: {
//       email: req.body.user.email,
//       lastname: data.metadata.lastname,
//       firstname: data.metadata.firstname,
//       address: {
//         name: req.body.user.address.line1,
//         complement: req.body.user.address.line2,
//         city: req.body.user.address.city,
//         postcode: req.body.user.address.postal_code,
//       }
//     }
//   }
//   try {
//     // ? 1/ verifier si user a deja un compte sinon 
//     const isExist = await User.findUserIdentity(data.customer_details.email)
//     // ~ si le user existe, recuperer son id : isExiste.id
//     if (isExist) {
//       const payment_details = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
//       const order_details = await Order.create({ user_id: isExist.id, total: orderBody.amount, booking_date: orderBody.booking_date, payment_id: payment_details.insert_payment_details })
//       orderBody.cart.forEach(async (item: { id: number; quantity: number; }) => {
//         await OrderItems.create({ order_id: order_details.insert_order_details, product_id: item.id, quantity: item.quantity });
//       });
//     } else {
//       console.log("il existe pas");
//       const { create_user } = await User.create(orderBody.user)
//       const payment_details = await Payment.create({ amount: orderBody.amount, status: orderBody.payment_status, payment_mode: orderBody.payment_method, payment_date: orderBody.payment_date });
//       const order_details = await Order.create({ user_id: create_user, total: orderBody.amount, booking_date: orderBody.booking_date, payment_id: payment_details.insert_payment_details })
//       orderBody.cart.forEach(async (item: { id: number; quantity: number; }) => {
//         await OrderItems.create({ order_id: order_details.insert_order_details, product_id: item.id, quantity: item.quantity });
//       });
//     }
//   } catch (err) {
//     if (err instanceof Error) logger(err.message)
//   }
//   return res.json("Order successfully created")
// }
const createOrderFromData = async (orderBody) => {
    try {
        const isExist = await User.findUserIdentity(orderBody.user.email);
        const payment_details = await Payment.create({
            amount: orderBody.amount,
            status: orderBody.payment_status,
            payment_mode: orderBody.payment_method,
            payment_date: orderBody.payment_date
        });
        const user_id = isExist ? isExist.id : (await User.create(orderBody.user)).create_user;
        const order_details = await Order.create({
            user_id,
            total: orderBody.amount,
            booking_date: orderBody.booking_date,
            payment_id: payment_details.insert_payment_details
        });
        for (const item of orderBody.cart) {
            await OrderItems.create({
                order_id: order_details.insert_order_details,
                product_id: item.id,
                quantity: item.quantity
            });
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const createOrderWithStripe = async (data, req, res) => {
    console.log('data:', data);
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
            phone: data.metadata.phone,
            address: {
                name: data.customer_details.address.line1,
                complement: data.customer_details.address.line2,
                city: data.customer_details.address.city,
                postcode: data.customer_details.address.postcode,
            }
        }
    };
    await createOrderFromData(orderBody);
    return res.json("Order successfully created");
};
const createOrderWithPaypal = async (data, req, res) => {
    console.log('data dans le createOrderWithPaypal:', data);
    console.log('req.body dans le createOrderWithPaypal:', req.body);
    const { user, cart, bookingDate, deliveryCost } = req.body;
    //  ? Calculate the total amount of the order based on the cart items
    const totalAmount = cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    // const paymentDate = new Date(formattedPaymentDate);
    // console.log('paymentDate:', paymentDate);
    const dateObject = new Date();
    const unixTimestamp = Math.floor(dateObject.getTime() / 1000);
    console.log('unixTimestamp:', unixTimestamp);
    const totalAmountIncludeShippingCost = parseFloat(totalAmount) + parseFloat(deliveryCost);
    const orderBody = {
        booking_date: bookingDate,
        payment_status: 'created',
        payment_id: data.id,
        amount: totalAmountIncludeShippingCost,
        payment_date: unixTimestamp,
        payment_method: 'paypal',
        cart,
        user: {
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            address: {
                name: user.address.line1,
                complement: user.address.line2,
                city: user.address.city,
                postcode: user.address.postcode,
            }
        }
    };
    await createOrderFromData(orderBody);
    console.log("Order successfully created");
};
export { getAllOrdersForCalendar, /* createOrder, */ createOrderWithStripe, createOrderWithPaypal };
