import express from 'express';
import { cancelOrder, createOrder, deleteOrder, getOrder, getOrderByEmail, getOrders, updateOrder, updateStatusOrder } from '../controllers/order.controller.js';
import { authentication, checkPermission } from '../utils/auth.util.js';

const routerOrder = express.Router();

// create order
routerOrder.post('', createOrder);

// get order by email
routerOrder.get('/email/:email/:otp', getOrderByEmail);

// authentication
routerOrder.use(authentication);

// get orders
routerOrder.get('', getOrders);

// get order 
routerOrder.get('/:id', getOrder);

// cancel order
routerOrder.put('/cancel/:id', cancelOrder);

// check permission
routerOrder.use(checkPermission);

// update order
routerOrder.put('/:id', updateOrder);

// update status order
routerOrder.put('/status/:id', updateStatusOrder);

// delete order
routerOrder.delete('/:id', deleteOrder);

export default routerOrder;