import { Request, Response } from 'express'
import { ErrorApi } from '../services/errorHandler.js'

import { User } from '../datamapper/user.js'

// import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

import { sendEmail } from '../services/nodemailer.js'
import { emailResetPassword } from '../schema/emailOption.js'

import { randomBytes } from 'crypto'
import bcrypt from 'bcrypt'

import debug from 'debug'
const logger = debug('Controller')

const sendEmailResetPassword = async (req: Request, res: Response) => {
  // on recupere mot de passe + email
  const { email } = req.body

  try {
    const userExist = await User.findUserIdentity(email)
    if (!userExist) throw new ErrorApi(`Utilisateur non trouvé`, req, res, 401)

    // todo envoi email via nodemailer
    if (userExist) {
      const token = randomBytes(32).toString('hex')

      const expirationTime = new Date()
      expirationTime.setHours(expirationTime.getHours() + 1)

      const result = await User.createResetToken(token, expirationTime, email)

      if (result) {
        sendEmail(emailResetPassword(email, token))
        return res.json('email envoyé')
      }
    }
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.body

    const isTokenExist = await User.findResetToken(token)
    if (!isTokenExist)
      throw new ErrorApi(`Le token est invalide`, req, res, 400)

    const currentTime = new Date()
    if (currentTime > isTokenExist.expiration_date)
      throw new ErrorApi(`Le token a expiré`, req, res, 400)

    const userExist = await User.findUserIdentity(email)
    if (!userExist) throw new ErrorApi(`Utilisateur non trouvé`, req, res, 401)

    req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10)

    const userUpdated = await User.update({
      id: userExist.id,
      password: req.body.newPassword,
    })
    if (userUpdated)
      return res.status(200).json('Mot de passe mis à jour avec succès !')
  } catch (err) {
    if (err instanceof Error) logger(err.message)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export { sendEmailResetPassword, resetPassword }
