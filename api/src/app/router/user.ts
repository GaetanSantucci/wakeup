// ~ ROUTER CONFIG ~ //

import { Router } from 'express';
const router = Router();

import { deleteCustomer, getAllCustomers, getCustomerProfile, signIn, signOut, signUp, updateCustomerProfile } from '../controller/user.js';
import { auth } from '../middleware/auth.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

import { userSchema, userSchemaUpdated } from '../schema/user.js';
import { validate } from '../services/validation.js'

router.get('/customers', getAllCustomers)
router.post('/customers/signin', signIn)
router.post('/customers/signup', validate(userSchema), signUp)
router.get('/customers/profile/:userId', [authenticateToken, auth], getCustomerProfile)
router.get('/customers/signout', authenticateToken, signOut)
router.patch('/customers/profile/:userId', [authenticateToken, auth, validate(userSchemaUpdated)], updateCustomerProfile)
router.delete('/customers/profile/:userId', [authenticateToken, auth], deleteCustomer)

export { router };