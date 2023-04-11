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
    const validate = ajv.compile(schemaCustom);
    if (validate(req.body)) {
      next();
    } else {
      console.log('req.body: ', req.body);
      throw new ErrorApi('Email ou mot de passe non valide', req, res, 400)
    }
  }
}


export { validate };