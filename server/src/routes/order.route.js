import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrderByEmail, getOrders } from '../controllers/order.controller.js';
import { authentication } from '../utils/auth.util.js';

const routerOrder = express.Router();

// create order
routerOrder.post('', createOrder);

// get orders
routerOrder.get('', getOrders);

// get order 
routerOrder.get('/:id', getOrder);

// get order by email
routerOrder.get('/email/:email/:otp', getOrderByEmail);

// authentication
routerOrder.use(authentication);

// delete order
routerOrder.delete('/:id', deleteOrder);

export default routerOrder;