import express from 'express';
import { getInfoShop, getInfoShopById, logIn, logOut, refreshToken, signUp } from '../controllers/access.controller.js';

import { authentication } from '../utils/auth.util.js';
import { checkPermission } from '../utils/auth.util.js';

const routerAccess = express.Router();

// signup
routerAccess.post('/shop/signup', signUp);

// logIn
routerAccess.post('/shop/login', logIn);

// authentication
routerAccess.use(authentication);

// get info
routerAccess.get('/shop', getInfoShop);

// logout
routerAccess.post('/shop/logout', logOut);

// refresh token
routerAccess.post('/shop/refresh-token', refreshToken)

// check permission
routerAccess.use(checkPermission);

// get info by id
routerAccess.get('/shop/:id', getInfoShopById);

export default routerAccess;