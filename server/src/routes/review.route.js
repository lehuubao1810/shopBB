import express from "express";

import { createOneReview, createReview } from "../controllers/review.controller.js";
import { authentication } from "../utils/auth.util.js";
import { checkOrderDelivered } from "../utils/order.util.js";

const routerReview = express.Router();

// authentication
routerReview.use(authentication);

// check order delivered
routerReview.use(checkOrderDelivered);

// create review
routerReview.post("/", createReview);    

// create one review
routerReview.post("/one", createOneReview);

export default routerReview;
