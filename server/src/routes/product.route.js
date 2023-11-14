import express from "express";

import { createProduct, getProductsByCategory, getProduct, deleteProduct, createProducts } from "../controllers/product.controller.js";
import { authentication } from "../utils/auth.util.js";

const routerProduct = express.Router();

 
// get products
routerProduct.get("/category/:slug", getProductsByCategory);

// get Product
routerProduct.get("/:slug", getProduct);

// authentication
routerProduct.use(authentication);

// create Product
routerProduct.post("", createProduct);

// create Products
routerProduct.post("/many", createProducts);

// delete Product
routerProduct.delete("/:id", deleteProduct);

export default routerProduct;