import { Request, Response, NextFunction } from 'express';

import { ErrorApi } from '../services/errorHandler.js';

//~ Import Ajv
import Ajv from "ajv"
const ajv = new Ajv();

//~ Import Debug
// import debug from 'debug';
// const logger = debug('Validation');

function validate(schemaCustom: object) {

  return function validateCheck(req: Request, res: Response, next: NextFunction) {

    // ? Compile the schema using the ajv library
    const validate = ajv.compile(schemaCustom);

    // ? If the request body matches the schema, call the next middleware function
    if (validate(req.body)) {
      next();
    } else {
      console.log('req.body: ', req.body);
      throw new ErrorApi('Email ou mot de passe non valide', req, res, 400)
    }
  }
}


export { validate };