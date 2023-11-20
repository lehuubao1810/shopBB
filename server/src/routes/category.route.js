import express from "express";

import { createCategory, getCategories, getCategory, deleteCategory, getCategoryBySlug } from "../controllers/category.controller.js";
import { authentication } from "../utils/auth.util.js";
import { checkPermission } from "../utils/auth.util.js";

const routerCategory = express.Router();

// get categories
routerCategory.get("", getCategories);

// get category 
routerCategory.get("/:id", getCategory);

// get category by slug
routerCategory.get("/slug/:slug", getCategoryBySlug); 

routerCategory.use(authentication);
routerCategory.use(checkPermission);

// create category
routerCategory.post("", createCategory);

// delete category
routerCategory.delete("/:id", deleteCategory);

export default routerCategory;