import express from 'express';

import { getOrders, updateInfo, getShop } from '../controllers/shop.controller.js';
import { authentication } from '../utils/auth.util.js';
import { checkPermission } from '../utils/auth.util.js';

const router = express.Router();

// authentication
router.use(authentication);

// get orders
router.get('/orders', getOrders);

// update Info
router.put('/update-info', updateInfo);

// check permission
router.use(checkPermission);

// get shop
router.get('/', getShop);

export default router;