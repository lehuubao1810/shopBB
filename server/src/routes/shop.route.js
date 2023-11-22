import express from 'express';

import { getOrders, updateInfo } from '../controllers/shop.controller.js';
import { authentication } from '../utils/auth.util.js';

const router = express.Router();

// authentication
router.use(authentication);

// get orders
router.get('/orders', getOrders);

// update Info
router.put('/update-info', updateInfo);

export default router;