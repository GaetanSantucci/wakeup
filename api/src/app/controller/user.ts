import { Request, Response } from 'express'
import { ErrorApi } from '../services/errorHandler.js';

import { User } from '../datamapper/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';

import debug from 'debug';
const logger = debug('Controller');
import bcrypt from 'bcrypt';
import { UUID } from '../type/user.js';

//? ----------------------------------------------------------- GET ALL USERS
const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const userList = await User.findAll();
    if (!userList) throw new ErrorApi('No users found', req, res, 400);
    return res.status(200).json(userList)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}


//? ----------------------------------------------------------- CREATE USER
const signUp = async (req: Request, res: Response) => {
  const { email, password, lastname, firstname } = req.body
  try {
    const isExist = await User.findUserIdentity(email)

    if (isExist) throw new ErrorApi(`User with email ${isExist.email} already exists`, req, res, 401);

    req.body.password = await bcrypt.hash(password, 10);

    if (!lastname) throw new ErrorApi(`Lastname required`, req, res, 400);
    if (!firstname) throw new ErrorApi(`Firstname required`, req, res, 400);

    const createUser = await User.create(req.body)
    if (createUser) return res.status(201).json(`User has signed up !`)

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}


//? ----------------------------------------------------------- LOGIN
const signIn = async (req: Request, res: Response) => {
  // on recupere mot de passe + email 
  const { email, password } = req.body

  try {
    const userExist = await User.findUserIdentity(email);
    if (!userExist) throw new ErrorApi(`User not found`, req, res, 401);

    // verify if password is the same with user.password
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) throw new ErrorApi(`Incorrect password`, req, res, 403);

    // delete user.password;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [`password`]: remove, ...user } = userExist;

    // Create token JWT
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, req);

    const userIdentity = { ...user, accessToken, refreshToken }

    return res.status(200).json(userIdentity)

  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

//? ----------------------------------------------------------- GET USER PROFILE
const getCustomerProfile = async (req: Request, res: Response) => {
  try {
    const userId: UUID = req.params.userId as UUID;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(userId)) throw new ErrorApi(`UUID invalid`, req, res, 400);

    const user = await User.findOne(userId);
    return res.status(200).json(user)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}

//? ----------------------------------------------------------- LOGOUT
const signOut = async (req: Request, res: Response) => {
  try {
    const userId: UUID = req.params.userId as UUID;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(userId)) throw new ErrorApi(`UUID invalid`, req, res, 400);
    if (req.user?.id !== userId) throw new ErrorApi(`Unauthorized access`, req, res, 401)
    return res.status(200).json(`User has been disconnected !`)
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}


//? ----------------------------------------------------------- UPDATE USER
const updateCustomerProfile = async (req: Request, res: Response) => {

  try {
    const userId = req.params.userId;


    // Check if user exist     
    const userExist = await User.findOne(userId);
    if (!userExist) throw new ErrorApi(`User not found`, req, res, 401);

    // CHECK IF EMAIL NOT EXIST
    if (req.body.email) {
      const isExist = await User.findUserIdentity(req.body.email)
      if (isExist && !req.body.email) throw new ErrorApi(`User with email ${isExist.email} already exists, choose another !`, req, res, 401);
      // Validator.checkEmailPattern(req.body.email, req, res);
    }

    // CHECK PASSWORD AND HASH
    if (req.body.password) {
      // Validator.checkPasswordPattern(req.body.password, req, res);
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const userUpdated = await User.update(req.body);
    if (userUpdated) return res.status(200).json("User successfully updated !")
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}


//? ----------------------------------------------------------- DELETE USER
const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const userId: UUID = req.params.userId as UUID;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(userId)) throw new ErrorApi(`UUID invalid`, req, res, 400);
    if (req.user?.id !== userId || req.user?.role === 'admin') throw new ErrorApi(`Unauthorized access`, req, res, 401)


    const user = await User.findOne(userId);
    if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    const isUser = req.user?.id;
    if (isUser === userId || req.user?.role === 'admin') {

      const userDeleted = await User.delete(userId);

      if (userDeleted) return res.status(200).json(`User has been deleted !`)

    } else throw new ErrorApi(`You cannot access this info !`, req, res, 401);
  } catch (err) {
    if (err instanceof Error) logger(err.message)
  }
}


export { getAllCustomers, signUp, signIn, signOut, getCustomerProfile, updateCustomerProfile, deleteCustomer } 