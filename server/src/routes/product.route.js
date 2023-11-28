import express from "express";

import { createProduct, getProductsByCategorySlug, getProductById, getProductBySlug, deleteProduct, createProducts, searchProduct, getProductsByCategoryId, getProducts, updateProduct } from "../controllers/product.controller.js";
import { authentication } from "../utils/auth.util.js";
import { checkPermission } from "../utils/auth.util.js";

const routerProduct = express.Router();

// get all products
routerProduct.get("", getProducts)
 
// get products by category
routerProduct.get("/category/slug/:slug", getProductsByCategorySlug);
routerProduct.get("/category/:id", getProductsByCategoryId);

// get Product by id
routerProduct.get("/:id", getProductById);

// get Product by slug
routerProduct.get("/slug/:slug", getProductBySlug);

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

// update Product
routerProduct.put("/:id", updateProduct);

// delete Product
routerProduct.delete("/:id", deleteProduct);

export default routerProduct;