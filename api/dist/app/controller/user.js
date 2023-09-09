import { ErrorApi } from '../services/errorHandler.js';
import { User } from '../datamapper/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import debug from 'debug';
const logger = debug('Controller');
import bcrypt from 'bcrypt';
//? ----------------------------------------------------------- GET ALL USERS
const getAllCustomers = async (req, res) => {
    try {
        const userList = await User.findAll();
        if (!userList)
            throw new ErrorApi('No users found', req, res, 400);
        return res.status(200).json(userList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- GET USER PROFILE
const getCustomerProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID non valide`, req, res, 400);
        const user = await User.findOne(userId);
        console.log('user:', user);
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- CREATE USER
const signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExist = await User.findUserIdentity(email);
        console.log('isExist:', isExist);
        if (isExist)
            throw new ErrorApi(`Le mail ${isExist.email} existe déjà !`, req, res, 401);
        req.body.password = await bcrypt.hash(password, 10);
        const response = await User.create(req.body);
        const isCreatedUser = response.create_user;
        if (isCreatedUser)
            return res.status(201).json(`Votre compte a bien été créé !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- LOGIN
const signIn = async (req, res) => {
    // on recupere mot de passe + email 
    const { email, password } = req.body;
    try {
        const userExist = await User.findUserIdentity(email);
        if (!userExist)
            throw new ErrorApi(`Utilisateur non trouvé`, req, res, 401);
        // verify if password is the same with user.password
        const validPassword = await bcrypt.compare(password, userExist.password);
        if (!validPassword)
            throw new ErrorApi(`Mot de passe incorrect`, req, res, 403);
        // delete user password;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [`password`]: remove, ...user } = userExist;
        // Create token JWT
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user, req);
        const userIdentity = { ...user, accessToken, refreshToken };
        return res.status(200).json(userIdentity);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- LOGOUT
const signOut = async (req, res) => {
    try {
        const userId = req.params.userId;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID non valide`, req, res, 400);
        if (req.user?.id !== userId)
            throw new ErrorApi(`Accés non autorisé !`, req, res, 401);
        return res.status(200).json(`L'utilisateur a été déconnecté !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- UPDATE USER
const updateCustomerProfile = async (req, res) => {
    logger('updateCustomerProfile: mis a jour du profile');
    console.log('req.body: ', req.body.email);
    const { email } = req.body;
    console.log('email:', email);
    try {
        const userId = req.params.userId;
        console.log('userId:', userId);
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        // Check if user exist     
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID non valide`, req, res, 400);
        const userExist = await User.findOne(userId);
        console.log('userExist: ', userExist.email);
        if (!userExist)
            throw new ErrorApi(`Utilisateur non trouvé !`, req, res, 401);
        // Check email if not exist
        if (req.body.email) {
            // ? I check  that the user email is different from the new one
            if (userExist.email === req.body.email)
                throw new ErrorApi(`L'email que vous avez saisi est identique à celui déjà enregistré, saisissez-en un nouveau !`, req, res, 401);
            // ? if different, I check the new email doesnt exist in database
            const isExist = await User.findUserIdentity(req.body.email);
            console.log('isExist:', isExist);
            if (isExist)
                throw new ErrorApi(`L'email ${isExist.email} existe déjà, saisissez-en un nouveau !`, req, res, 401);
        }
        // check password and hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        // send the body to update the user after verification
        console.log('req.body:', req.body);
        const userUpdated = await User.update(req.body);
        console.log('userUpdated:', userUpdated);
        if (userUpdated)
            return res.status(200).json("User successfully updated !");
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
//? ----------------------------------------------------------- DELETE USER
const deleteCustomer = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { password, email } = req.body;
        console.log('password:', password);
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID non valide`, req, res, 400);
        // I check different points to authorize the deletion
        if (req.user?.id === userId || req.user?.role === 'admin') {
            // const user = await User.findOne(userId);
            const user = await User.findUserIdentity(email);
            console.log('user:', user);
            if (!user)
                throw new ErrorApi(`L'utilisateur n'existe pas`, req, res, 400);
            const isUser = req.user?.id;
            if (isUser === userId || req.user?.role === 'admin') {
                const validPassword = await bcrypt.compare(password, user.password);
                console.log('validPassword:', validPassword);
                if (!validPassword)
                    throw new ErrorApi(`Mot de passe incorrect`, req, res, 403);
                // todo checker si mot de passe identique
                const userDeleted = await User.delete(userId);
                if (userDeleted)
                    return res.status(200).json(`L'utilisateur a été supprimé !`);
            }
            else
                throw new ErrorApi(`Vous ne pouvez pas avoir accés à cette information !`, req, res, 401);
        }
        else {
            throw new ErrorApi(`Accés non autorisé !`, req, res, 401);
        }
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { getAllCustomers, signUp, signIn, signOut, getCustomerProfile, updateCustomerProfile, deleteCustomer };
