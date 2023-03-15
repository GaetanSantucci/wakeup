import { Request, Response, NextFunction } from 'express';

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
      throw new Error('Data not valid')
    }
  }
}


export { validate };