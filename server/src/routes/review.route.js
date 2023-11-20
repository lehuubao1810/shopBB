import express from "express";

import { createReview } from "../controllers/review.controller.js";
import { authentication } from "../utils/auth.util.js";
import { checkOrderDelivered } from "../utils/order.util.js";

const routerReview = express.Router();

// authentication
routerReview.use(authentication);

// check order delivered
routerReview.use(checkOrderDelivered);

// create review
routerReview.post("/:id", createReview);    

export default routerReview;
