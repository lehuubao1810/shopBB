import express from 'express';
import { getCart, addTocart, deleteProduct, deleteAll, updateAll } from '../controllers/cart.controller.js';

const routerCart = express.Router();

// get cart
routerCart.get('/:id', getCart);

// add to cart
routerCart.post('/:id', addTocart);

// delete product
routerCart.delete('/:id', deleteProduct);

// delete all
routerCart.delete('/all/:id', deleteAll);

// update all
routerCart.put('/:id', updateAll);


export default routerCart;