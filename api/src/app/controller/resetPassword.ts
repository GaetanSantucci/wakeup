import { Request, Response } from 'express';
import { ErrorApi } from '../services/errorHandler.js';

import { User } from '../datamapper/user.js';

// import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

import { sendEmail } from '../services/nodemailer.js';
import { emailResetPassword } from '../schema/emailOption.js';

import { randomBytes } from 'crypto';

import debug from 'debug';
const logger = debug('Controller');

const sendEmailResetPassword = async (req: Request, res: Response) => {
  // on recupere mot de passe + email 
  const { email } = req.body

  try {
    const userExist = await User.findUserIdentity(email);
    console.log('userExist:', userExist);
    // if (!userExist) throw new ErrorApi(`Utilisateur non trouvé`, req, res, 401);

    // todo envoi email via nodemailer
    const otp = randomBytes(32).toString("hex")
    console.log('otp:', otp);
    const sentEmailResetPassword = sendEmail(emailResetPassword(email, otp))
    console.log('sentEmailResetPassword:', sentEmailResetPassword);
    // console.log('sentEmailResetPassword:', sentEmailResetPassword);
    // // verify if password is the same with user.password
    // const validPassword = await bcrypt.compare(password, userExist.password);
    // if (!validPassword) throw new ErrorApi(`Mot de passe incorrect`, req, res, 403);

    // delete user password;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { [`password`]: remove, ...user } = userExist;

    // // Create token JWT
    // const accessToken = generateAccessToken(user);
    // const refreshToken = generateRefreshToken(user, req);

    // const userIdentity = { ...user, accessToken, refreshToken }

    // return res.status(200).json(userIdentity)

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body
    const { token } = req.query

    if (token) {
      //todo method to check password, find user, crypt password ans save it in database
    }

  } catch (err) {
    if (err instanceof Error) logger(err.message)

  }
}

export { sendEmailResetPassword, resetPassword }