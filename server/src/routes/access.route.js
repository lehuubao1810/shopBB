import express from 'express';
import { logIn, logOut, refreshToken, signUp } from '../controllers/access.controller.js';
import { authentication } from '../utils/auth.util.js';

const routerAccess = express.Router();

// signup
routerAccess.post('/shop/signup', signUp);

// logIn
routerAccess.post('/shop/login', logIn);

// authentication
routerAccess.use(authentication);

// logout
routerAccess.post('/shop/logout', logOut);

// refresh token
routerAccess.post('/shop/refresh-token', refreshToken)


export default routerAccess;