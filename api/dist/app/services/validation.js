import { ErrorApi } from '../services/errorHandler.js';
//~ Import Ajv
import Ajv from "ajv";
const ajv = new Ajv();
//~ Import Debug
// import debug from 'debug';
// const logger = debug('Validation');
function validate(schemaCustom) {
    return function validateCheck(req, res, next) {
        const validate = ajv.compile(schemaCustom);
        if (validate(req.body)) {
            next();
        }
        else {
            throw new ErrorApi('Email ou mot de passe non valide', req, res, 400);
        }
    };
}
export { validate };
