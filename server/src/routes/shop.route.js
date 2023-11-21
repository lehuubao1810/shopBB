import express from 'express';

import { getOrders } from '../controllers/shop.controller.js';
import { authentication } from '../utils/auth.util.js';

const router = express.Router();

// authentication
router.use(authentication);

// get orders
router.get('/orders', getOrders);

export default router;