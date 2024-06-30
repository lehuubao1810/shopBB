import express from "express";
import routerAccess from "./access.route.js";
import routerCategory from "./category.route.js";
import routerProduct from "./product.route.js";
import routerOrder from "./order.route.js";
import routerMail from "./mail.route.js";
import routerCart from "./cart.route.js";
import routerReview from "./review.route.js";
import routerShop from "./shop.route.js";

import elasticClient from "../services/elasticClient.js";

const router = express.Router();

// check apiKey

// check permission

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/access", routerAccess);
router.use("/category", routerCategory);
router.use("/product", routerProduct);
router.use("/order", routerOrder);
router.use("/mail", routerMail);
router.use("/cart", routerCart);
router.use("/review", routerReview);
router.use("/shop", routerShop);

router.get("/search", async (req, res) => {
  try {
    const searchText = req.query.query;
    // const result = await elasticClient.helpers.search({
    const result = await elasticClient.search({
      index: "search-products",
      query: { fuzzy: { name: req.query.query } },
      size: 3,

    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
