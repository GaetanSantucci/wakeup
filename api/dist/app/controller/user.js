var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ErrorApi } from '../services/errorHandler.js';
import { User } from '../datamapper/user.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import debug from 'debug';
const logger = debug('Controller');
import bcrypt from 'bcrypt';
//? ----------------------------------------------------------- GET ALL USERS
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield User.findAll();
        if (!userList)
            throw new ErrorApi('No users found', req, res, 400);
        return res.status(200).json(userList);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- CREATE USER
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, /* lastname, firstname  */ } = req.body;
    logger('password: ', password);
    logger('email: ', email);
    try {
        const isExist = yield User.findUserIdentity(email);
        if (isExist)
            throw new ErrorApi(`User with email ${isExist.email} already exists`, req, res, 401);
        req.body.password = yield bcrypt.hash(password, 10);
        // if (!lastname) throw new ErrorApi(`Lastname required`, req, res, 400);
        // if (!firstname) throw new ErrorApi(`Firstname required`, req, res, 400);
        const createUser = yield User.create(req.body);
        if (createUser)
            return res.status(201).json(`User has signed up !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- LOGIN
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // on recupere mot de passe + email 
    const { email, password } = req.body;
    try {
        const userExist = yield User.findUserIdentity(email);
        if (!userExist)
            throw new ErrorApi(`User not found`, req, res, 401);
        // verify if password is the same with user.password
        const validPassword = yield bcrypt.compare(password, userExist.password);
        if (!validPassword)
            throw new ErrorApi(`Incorrect password`, req, res, 403);
        // delete user.password;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = `password`, remove = userExist[_a], user = __rest(userExist, [typeof _a === "symbol" ? _a : _a + ""]);
        // Create token JWT
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user, req);
        const userIdentity = Object.assign(Object.assign({}, user), { accessToken, refreshToken });
        return res.status(200).json(userIdentity);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- GET USER PROFILE
const getCustomerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID invalid`, req, res, 400);
        const user = yield User.findOne(userId);
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- LOGOUT
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userId = req.params.userId;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID invalid`, req, res, 400);
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) !== userId)
            throw new ErrorApi(`Unauthorized access`, req, res, 401);
        return res.status(200).json(`User has been disconnected !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- UPDATE USER
const updateCustomerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if user exist     
        const userExist = yield User.findOne(userId);
        if (!userExist)
            throw new ErrorApi(`User not found`, req, res, 401);
        // CHECK IF EMAIL NOT EXIST
        if (req.body.email) {
            const isExist = yield User.findUserIdentity(req.body.email);
            if (isExist && !req.body.email)
                throw new ErrorApi(`User with email ${isExist.email} already exists, choose another !`, req, res, 401);
            // Validator.checkEmailPattern(req.body.email, req, res);
        }
        // CHECK PASSWORD AND HASH
        if (req.body.password) {
            // Validator.checkPasswordPattern(req.body.password, req, res);
            req.body.password = yield bcrypt.hash(req.body.password, 10);
        }
        const userUpdated = yield User.update(req.body);
        if (userUpdated)
            return res.status(200).json("User successfully updated !");
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
//? ----------------------------------------------------------- DELETE USER
const deleteCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f;
    try {
        const userId = req.params.userId;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(userId))
            throw new ErrorApi(`UUID invalid`, req, res, 400);
        if (((_c = req.user) === null || _c === void 0 ? void 0 : _c.id) !== userId || ((_d = req.user) === null || _d === void 0 ? void 0 : _d.role) === 'admin')
            throw new ErrorApi(`Unauthorized access`, req, res, 401);
        const user = yield User.findOne(userId);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const isUser = (_e = req.user) === null || _e === void 0 ? void 0 : _e.id;
        if (isUser === userId || ((_f = req.user) === null || _f === void 0 ? void 0 : _f.role) === 'admin') {
            const userDeleted = yield User.delete(userId);
            if (userDeleted)
                return res.status(200).json(`User has been deleted !`);
        }
        else
            throw new ErrorApi(`You cannot access this info !`, req, res, 401);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
});
export { getAllCustomers, signUp, signIn, signOut, getCustomerProfile, updateCustomerProfile, deleteCustomer };
