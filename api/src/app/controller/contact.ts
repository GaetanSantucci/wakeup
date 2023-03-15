import { Request, Response } from 'express';

// Nodemailer and schema by interactivity
// import nodemailer from 'nodemailer';
import { emailReceived } from '../schema/emailOption.js';
import { sendEmail } from '../services/nodemailer.js';

// import { ErrorApi } from '../service/errorHandler.js';

// ~ DEBUG CONFIG ~ //
import debug from 'debug';
const logger = debug('Controller');

const getEmail = (req: Request, res: Response) => {
  try {
    const data = req.body;

    // const mailOptions = contactForm(req.body.lastname, req.body.message);
    const emailSent = sendEmail(emailReceived(data));
    console.log('emailSent: ', emailSent);
    res.json('Demande faite');
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

export { getEmail };

