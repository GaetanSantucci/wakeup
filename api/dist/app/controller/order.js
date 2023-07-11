// import { ErrorApi } from '../services/errorHandler.js';
import { Order } from '../datamapper/order.js';
import { User } from '../datamapper/user.js';
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
const createOrder = (data) => async (req, res) => {
    const isSuccess = data;
    console.log('isSuccess:', isSuccess);
    const { email } = req.body.user;
    //todo apres validation du paiement par stripe ou paypal
    try {
        // ? 1/ verifier si user a deja un compte sinon 
        const isExist = await User.findUserIdentity(email);
        console.log('isExist:', isExist);
        // ~ si le user existe, recuperer son id : isExiste.id
        if (isExist) {
            console.log("l utilisateur exist");
            // 
        }
        else {
            console.log("il existe pas");
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
    // ? 1.1/ Creer un user et recuperer son ID, 
    // ? 2/ Creer un payment_details et recuperer son ID
    // ? 3/ Creer un order en utilisant customer(id) et payment_details(id), et recuperer son ID
    // ? 4/ Creer un order_items en utilsant order(id) + les produits
    return res.json("Order created successfully");
};
export { getAllOrdersForCalendar, createOrder };
