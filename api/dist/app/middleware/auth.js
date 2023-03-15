//~ Import module
import { ErrorApi } from '../services/errorHandler.js';
//~ Authentication
function auth(req, res, next) {
    if (!req.user)
        throw new ErrorApi(`User not connected !`, req, res, 401);
    if (req.user.role === 'admin')
        console.log(`Bonjour ${req.user.firstname}, vous etes connecté en tant qu'${req.user.role}`);
    next();
}
export { auth };
