import express from "express";

import { createProduct, getProductsByCategorySlug, getProduct, deleteProduct, createProducts, searchProduct, getProductsByCategoryId } from "../controllers/product.controller.js";
import { authentication } from "../utils/auth.util.js";
import { checkPermission } from "../utils/auth.util.js";

const routerProduct = express.Router();

 
// get products
routerProduct.get("/category/slug/:slug", getProductsByCategorySlug);
routerProduct.get("/category/:id", getProductsByCategoryId);

// get Product
routerProduct.get("/:slug", getProduct);

// search product
routerProduct.get("/search/result", searchProduct);
 
// authentication
routerProduct.use(authentication);

// check permission
routerProduct.use(checkPermission);

// create Product
routerProduct.post("", createProduct);

// create Products
routerProduct.post("/many", createProducts);

// delete Product
routerProduct.delete("/:id", deleteProduct);

export default routerProduct;